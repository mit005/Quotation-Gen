import React from 'react';
import { Box, Grid, Typography, TextField, Paper } from '@mui/material';
import { COLORS } from '../constants';

const TotalsSection = ({ subtotal, tax, taxPercentage, grandTotal, onTaxPercentageChange }) => {
  
  const formatCurrency = (value) => {
    return `₹ ${parseFloat(value || 0).toFixed(2)}`;
  };
  
  return (
    <Box sx={{ marginBottom: '30px' }}>
      <Paper elevation={2} sx={{ padding: '20px', backgroundColor: COLORS.LIGHT_GREEN }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'right' }}>
              SUB TOTAL
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'right' }}>
              {formatCurrency(subtotal)}
            </Typography>
          </Grid>
          
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                TAX
              </Typography>
              <TextField
                size="small"
                type="number"
                value={taxPercentage}
                onChange={(e) => onTaxPercentageChange(parseFloat(e.target.value) || 0)}
                inputProps={{ min: 0, max: 100, step: 0.1 }}
                sx={{
                  width: '80px',
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: COLORS.PRIMARY_GREEN
                    }
                  }
                }}
              />
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                %
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'right' }}>
              {formatCurrency(tax)}
            </Typography>
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ borderTop: `2px solid ${COLORS.PRIMARY_GREEN}`, marginY: '10px' }} />
          </Grid>
          
          <Grid item xs={8}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                textAlign: 'right',
                color: COLORS.PRIMARY_GREEN
              }}
            >
              GRAND TOTAL
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                textAlign: 'right',
                color: COLORS.PRIMARY_GREEN
              }}
            >
              {formatCurrency(grandTotal)}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default TotalsSection;
