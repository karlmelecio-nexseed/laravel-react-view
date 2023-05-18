import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Product from './pages/Product';
import AddProduct from './pages/AddProduct/AddProduct';
import EditProduct from './pages/EditProduct/EditProduct';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/products/:id/edit" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
