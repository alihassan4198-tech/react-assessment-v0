import React from 'react';
import { Card, CardContent, CardMedia, Grid, Typography, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import { ApiProduct } from '~/api-client/types';
import { AppButton } from '~/global/components/app-button';
type ProductsMobileViewProps = {
  data: ApiProduct[];
  onDelete: (item: ApiProduct) => void;
};

export const ProductsMobileView: React.FC<ProductsMobileViewProps> = ({ data, onDelete }) => {
  const { t } = useTranslation(['common', 'products']);
  return (
    <Box
      display="grid"
      gridTemplateColumns={{
        xs: '1fr',
        sm: '1fr 1fr',
      }}
      gap={3}
    >
      {data.map((row) => (
        <Card
          key={row.productId}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
            },
          }}
        >
          <CardMedia
            component="img"
            height="180"
            image={row.image || '/images/placeholder.jpg'}
            alt={row.title.en || row.title.ar}
            sx={{
              objectFit: 'cover',
            }}
          />

          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
              <Box component="span" >
                {t('products:productTitle')}:
              </Box>
              {row.title.en || row.title.ar}
            </Typography>

            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
            >
              <Box component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                {t('products:status')}:
              </Box>
              {row.isActive ? <Typography variant="caption" color="success" sx={{ alignItems: 'center', mt: 0.2 }}>
                {t('common:active')}
              </Typography> : <Typography variant="body2" color="textSecondary" sx={{ alignItems: 'center', mt: 0.2 }}>
                {t('common:inactive')}
              </Typography>}

            </Typography>

            <Typography variant="body1" >
              <Box component="span" sx={{ fontWeight: 'bold' }}>
                {t('products:price')}:
              </Box>{' '}
              ${row.price}
            </Typography>
            {row.priceSale && (
              <Typography variant="body1" color="primary" sx={{ mb: 1 }}>
                <Box component="span" sx={{ fontWeight: 'bold' }}>
                  {t('products:priceSale')}:
                </Box>{' '}
                ${row.priceSale}
              </Typography>
            )}

            <Typography variant="body2" color="textSecondary">
              <Box component="span" sx={{ fontWeight: 'bold' }}>
                {t('common:createdAt')}:
              </Box>{' '}
              {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}

            </Typography>
            <Typography variant="body2" color="textSecondary">
              <Box component="span" sx={{ fontWeight: 'bold' }}>
                {t('common:updatedAt')}:
              </Box>{' '}
              {row.updatedAt ? new Date(row.updatedAt).toLocaleDateString() : new Date().toLocaleDateString()}

            </Typography>
          </CardContent>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2,
              borderTop: '1px solid #f0f0f0',
              backgroundColor: '#f9f9f9',
            }}
          >
            <AppButton to={`/products/${row.productId}`} variant="contained">
              {t('common:edit')}
            </AppButton>

            <IconButton
              onClick={() => onDelete(row)}
              aria-label="delete"
              sx={{
                color: 'error.main',
                transition: 'color 0.3s ease',
                '&:hover': { color: 'error.dark' },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Card>
      ))
      }
    </Box >
  );
};
