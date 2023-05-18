import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  TextField,
  Grid,
  InputLabel,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
}

type RouteParams = {
  id: string;
};

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
  },
  formField: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  labelPadding: {
    paddingBottom: theme.spacing(1),
  }
}));

const EditProduct = () => {
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: '',
    slug: '',
    description: '',
    price: 0,
  });
  const { id } = useParams<RouteParams>();
  const classes = useStyles();
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate('/');
  };

  useEffect(() => {
    fetch(`http://localhost:8000/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error(error));
  }, [id]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(`http://localhost:8000/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...product, // include all the properties of the `product` state object
        id: Number(id), // ensure the `id` is a number, not a string
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        navigate('/');
      })
      .catch((error) => console.error(error));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card className={classes.card}>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <InputLabel htmlFor="name-label" className={classes.labelPadding}>Name</InputLabel>
              <TextField
                fullWidth
                id="name-label"
                name="name"
                className={classes.formField}
                variant="outlined"
                value={product.name}
                onChange={handleInputChange}
              />
              <InputLabel htmlFor="slug-label" className={classes.labelPadding}>Slug</InputLabel>
              <TextField
                fullWidth
                id="slug-label"
                name="slug"
                className={classes.formField}
                variant="outlined"
                value={product.slug}
                onChange={handleInputChange}
              />
              <InputLabel htmlFor="description-label" className={classes.labelPadding}>Description</InputLabel>
              <TextField
                fullWidth
                id="description-label"
                name="description"
                className={classes.formField}
                variant="outlined"
                multiline
                rows={4}
                value={product.description}
                onChange={handleInputChange}
              />
             
                <InputLabel htmlFor="price-label" className={classes.labelPadding}>Price</InputLabel>
             
              <TextField
                fullWidth
                id="price-label"
                name="price"
                className={classes.formField}
                variant="outlined"
                type="number"
                value={product.price}
                onChange={handleInputChange}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="default"
                onClick={handleClickBack}
                className={classes.button}
              >
                Cancel
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default EditProduct;
