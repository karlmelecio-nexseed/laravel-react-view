import React, { ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface IProps {
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  saveProduct: (e: FormEvent<HTMLFormElement>) => void;
  name: string;
  slug: string;
  description: string;
  price: string;
  point: string;
}

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    backgroundColor: '#FFFFFF',
    borderRadius: '10px',
    maxWidth: '600px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  },
  formField: {
    marginBottom: theme.spacing(1),
  },
  formButton: {
    backgroundColor: '#00BFFF',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#009ACD',
    },
  },
}));

const ProductForm: React.FC<IProps> = ({
  handleInput,
  saveProduct,
  name,
  slug,
  description,
  price,
  point,    
}) => {
  const classes = useStyles();

  return (
    <form onSubmit={saveProduct} className={classes.formContainer}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={12}>
          <TextField
            label="Product Name"
            name="name"
            onChange={handleInput}
            value={name}
            fullWidth
            className={classes.formField}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Slug"
            name="slug"
            onChange={handleInput}
            value={slug}
            fullWidth
            className={classes.formField}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            onChange={handleInput}
            value={description}
            fullWidth
            className={classes.formField}
            multiline
            rows={2}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Price"
            name="price"
            type="number"
            onChange={handleInput}
            value={price}
            fullWidth
            className={classes.formField}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Point"
            name="point"
            type="number"
            onChange={handleInput}
            value={point}
            fullWidth
            className={classes.formField}
          />
        </Grid>
        <Grid item container xs={12} spacing={5} justify="center">
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              className={classes.formButton}
            >
              Save Product
            </Button>
          </Grid>
          <Grid item>
            <Button
              type="button"
              variant="contained"
              className={classes.formButton}
              onClick={() => {
                window.history.back();
              }}
            >
              Back
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProductForm;
