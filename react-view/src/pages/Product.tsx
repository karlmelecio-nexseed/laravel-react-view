import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  Button,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Modal,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';


interface ProductProps {
  products: Array<{ id: number; name: string; description: string }>;
}

interface ProductState {
  products: any[];
}

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },
  addButton: {
    marginLeft: theme.spacing(2),
  },
  addButtonEdit: {
    backgroundColor: '#00BFFF',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#009ACD',
    },
  },
  addButtonDelete: {
    backgroundColor: '#FF0000',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#f08080',
    },
  },
  tableContainer: {
    maxWidth: 700,
    margin: 'auto',
    marginTop: theme.spacing(2),
  },
  headerRowHead: {
    backgroundColor: '#696969',
  },
  headerRow: {
    backgroundColor: '#f5f5f5',
  },
  evenRow: {
    backgroundColor: '#f9f9f9',
  },
  tableLabel: {
    color: '#fff',
    textAlign: 'center',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: theme.spacing(3),
    outline: 'none',
    borderRadius: theme.spacing(1),
    maxWidth: 400,
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#f08080',
    },
  },
  chartContainer: {
    maxWidth: 1500,
    margin: 'auto',
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
  },
}));

const Product = () => {
  const [products, setProducts] = useState<ProductState['products']>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/api/products/')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  const classes = useStyles();

  const handleDelete = (productId: number) => {
    setModalOpen(true);
    setSelectedProductId(productId);
  };

  const confirmDelete = () => {
    if (selectedProductId) {
      fetch(`http://localhost:8000/api/products/${selectedProductId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(() => {
          // Remove the deleted product from the local state
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== selectedProductId)
          );
          setModalOpen(false);
        })
        .catch((error) => console.error(error));
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProductId(null);
  };

  const generateBarColors = (data) => {
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00bcd4'];
    return data.map((_, index) => colors[index % colors.length]);
  };
  
  // Inside your component
 // Inside your component
const colors = generateBarColors(products);

  
  // Inside your component
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card className={classes.card}>
          <CardHeader
            className={classes.header}
            title="Products Data"
            action={
              <Link to={'add-product'}>
                <Button
                  className={classes.addButton}
                  variant="contained"
                  color="secondary"
                >
                  Add Product
                </Button>
              </Link>
            }
          />
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table>
              <TableHead>
                <TableRow className={classes.headerRowHead}>
                  <TableCell className={classes.tableLabel}>ID</TableCell>
                  <TableCell className={classes.tableLabel}>Name</TableCell>
                  <TableCell className={classes.tableLabel}>Slug</TableCell>
                  <TableCell className={classes.tableLabel}>
                    Description
                  </TableCell>
                  <TableCell className={classes.tableLabel}>Price</TableCell>
                  <TableCell className={classes.tableLabel}>Edit</TableCell>
                  <TableCell className={classes.tableLabel}>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow
                    key={product.id}
                    className={index % 2 === 0 ? classes.evenRow : ''}
                  >
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.slug}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>
                      <Link to={`products/${product.id}/edit`}>
                        <Button
                          className={classes.addButtonEdit}
                          variant="contained"
                        >
                          Edit
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Button
                        className={classes.addButtonDelete}
                        variant="contained"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>

      {modalOpen && (
        <div className={classes.modal}>
          <div className={classes.modalContent}>
            <Typography variant="h6" gutterBottom>
              Confirm Deletion
            </Typography>
            <Typography variant="body1" gutterBottom>
              Are you sure you want to delete this product?
            </Typography>
            <Grid item container xs={12} spacing={1} justify="center">
              <Grid item>
                <Button
                  className={classes.deleteButton}
                  variant="contained"
                  onClick={confirmDelete}
                >
                  Delete
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={closeModal}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      )}

      {/* Line Chart */}
      <Grid className={classes.chartContainer} item xs={12}>
      <BarChart width={1000} height={300} data={products} layout="vertical">
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis type="number" />
  <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={100} />
  <Tooltip />
  <Legend />
  <Bar dataKey="point" fill={colors} />
</BarChart>

      </Grid>
    </Grid>
  );
};

export default Product;
