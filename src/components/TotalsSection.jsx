import React from 'react';
import { Box, Grid, Typography, TextField, Paper } from '@mui/material';
import { COLORS } from '../constants';

const TotalsSection = ({ subtotal, tax, taxPercentage, grandTotal, onTaxPercentageChange }) => {
  
  const formatCurrency = (value) => {
    return `₹ ${parseFloat(value || 0).toFixed(2)}`;
  };
  
  return (
    <Box sx={{ marginBottom: '40px' }}>
      <Paper
        elevation={0}
        sx={{
          padding: '30px',
          background: `linear-gradient(135deg, ${COLORS.LIGHT_GREEN} 0%, white 100%)`,
          border: `2px solid ${COLORS.PRIMARY_GREEN}`,
          borderRadius: '12px'
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="h6" sx={{ fontWeight: '600', textAlign: 'right', fontSize: '1.125rem' }}>
              SUB TOTAL
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" sx={{ fontWeight: '700', textAlign: 'right', fontSize: '1.125rem' }}>
              {formatCurrency(subtotal)}
            </Typography>
          </Grid>
          
          <Grid item xs={8}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: '600', fontSize: '1.125rem' }}>
                TAX
              </Typography>
              <TextField
                size="small"
                type="number"
                value={taxPercentage}
                onChange={(e) => onTaxPercentageChange(parseFloat(e.target.value) || 0)}
                inputProps={{ min: 0, max: 100, step: 0.1 }}
                sx={{
                  width: '90px',
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white',
                    fontWeight: '600',
                    '&.Mui-focused fieldset': {
                      borderColor: COLORS.PRIMARY_GREEN,
                      borderWidth: '2px'
                    }
                  }
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: '600', fontSize: '1.125rem' }}>
                %
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" sx={{ fontWeight: '700', textAlign: 'right', fontSize: '1.125rem' }}>
              {formatCurrency(tax)}
            </Typography>
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ borderTop: `3px solid ${COLORS.PRIMARY_GREEN}`, marginY: '15px' }} />
          </Grid>

          <Grid item xs={8}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: '700',
                textAlign: 'right',
                color: COLORS.PRIMARY_GREEN,
                letterSpacing: '0.5px'
              }}
            >
              GRAND TOTAL
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: '700',
                textAlign: 'right',
                color: COLORS.PRIMARY_GREEN,
                letterSpacing: '0.5px'
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
