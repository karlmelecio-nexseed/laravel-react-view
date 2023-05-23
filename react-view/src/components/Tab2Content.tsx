import React from 'react';
import { Box, Typography, Divider, CircularProgress } from '@mui/material';
import LazyLoad from 'react-lazyload';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useProduct } from './api';

interface Tab1ContentProps {
  imageUrl: string;
  productId: number;
}

const Tab2Content: React.FC<Tab1ContentProps> = ({ productId, imageUrl }) => {
  const { data: product, isLoading } = useProduct(productId);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box display="flex" alignItems="center" mb={1}>
          <LazyLoad height={200} once>
            <img
              src={`http://localhost:8000${product.image_url}`}
              alt="Image"
            />
          </LazyLoad>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ mx: 2, height: '100%' }}
          />
          <Box>
            <Typography variant="h6" gutterBottom>
              {product?.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Description: {product?.description}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Slug: {product?.slug}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Price: {product?.price}
            </Typography>
            {/* Add more product details here as needed */}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Tab2Content;
