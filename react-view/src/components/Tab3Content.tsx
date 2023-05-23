import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import {
  Box,
  Typography,
  Divider,
  CircularProgress,
} from '@mui/material';

interface Tab1ContentProps {
  imageUrl: string;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  point: string;
  image_url: string;
}

const Tab3Content: React.FC<Tab1ContentProps> = ({ imageUrl }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(
          'http://localhost:8000/api/products/17'
        );
        console.log('Response:', response.data);
        setProduct(response.data);
      } catch (error) {
        console.log('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    if (imgRef.current && product && product.image_url) {
      imgRef.current.src = `http://localhost:8000${product.image_url}`;
    }
  }, [product]);
  
  
 console.log(product);
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box>
          <Box display="flex" alignItems="center" mb={1}>
            <img
              ref={imgRef}
              src={imageUrl}
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
              alt="Image"
            />
            <Divider orientation="vertical" flexItem sx={{ mx: 2, height: '100%' }} />
            <Box>
              <Typography variant="h6" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Description: {product.description}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Slug: {product.slug}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Price: {product.price}
              </Typography>
              {/* Add more product details here as needed */}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Tab3Content;
