import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useNavigate } from 'react-router-dom';

interface IState {
  name: string;
  slug: string;
  description: string;
  price: string;
  point: string;
  image: File | null;
}

interface IProps {
  classes: {
    cardContainer: string;
  };
  handleImageInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

const styles = theme => ({
  cardContainer: {
    // any styles you want to apply to the container
  },
});

const AddProduct: React.FC<IProps> = ({ classes, handleImageInput: handleInputChange }) => { // Include handleImageInput in the props
  const [state, setState] = useState<IState>({
    name: '',
    slug: '',
    description: '',
    price: '',
    point: '',
    image: null,
  });

  const navigate = useNavigate();

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
 
  const handleImageInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setState(prevState => ({
        ...prevState,
        image: e.target.files[0],
      }));
    }
  };
  
  const saveProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append('name', state.name);
      formData.append('slug', state.slug);
      formData.append('description', state.description);
      formData.append('price', state.price);
      formData.append('point', state.point);
      formData.append('image', state.image); // Ensure the image file is appended
  
      // Make the API request
      const res = await axios.post<{ status: number; message: string }>(
        'http://localhost:8000/api/add-products/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      // Handle the response
      if (res.data.status === 200) {
        console.log(res.data.message);
        setState({
          name: '',
          slug: '',
          description: '',
          price: '',
          point: '',
          image: null,
        });
  
        // Redirect to the homepage
        navigate('/');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  

  return (
<Grid container justify="center" alignItems="center">
  <Grid item xs={12} sm={8} md={6} lg={4} className={classes.cardContainer}>
    <ProductForm
     handleInput={handleInput}
     handleImageInput={handleImageInput}
     saveProduct={saveProduct}
     name={state.name}
     slug={state.slug}
     description={state.description}
     price={state.price}
     point={state.point}
    />
  </Grid>
</Grid>

  );
};

export default withStyles(styles)(AddProduct);
