import axios from 'axios';
import { useQuery } from 'react-query';

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  point: string;
  image_url: string;
}

export const fetchProduct = async (productId: number): Promise<Product> => {
  const response = await axios.get<Product>(`http://localhost:8000/api/products/${productId}`);
  return response.data;
};

export const useProduct = (productId: number) => {
  return useQuery<Product, Error>(['product', productId], () => fetchProduct(productId));
};
