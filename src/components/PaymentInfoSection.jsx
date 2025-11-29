import React from 'react';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { COLORS } from '../constants';

const PaymentInfoSection = ({
  payableTo,
  bankDetails,
  termsAndConditions,
  onFieldChange
}) => {
  return (
    <Box sx={{ marginBottom: '30px' }}>
      <Typography
        variant="h6"
        sx={{
          color: COLORS.PRIMARY_GREEN,
          fontWeight: 'bold',
          marginBottom: '15px'
        }}
      >
        Payment Information
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 'bold', marginBottom: '10px', color: COLORS.TEXT_PRIMARY }}
          >
            Payable To
          </Typography>
          <TextField
            fullWidth
            label="Name"
            value={payableTo.name}
            onChange={(e) => onFieldChange('payableTo', 'name', e.target.value)}
            sx={{
              marginBottom: '15px',
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: COLORS.PRIMARY_GREEN
                }
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: COLORS.PRIMARY_GREEN
              }
            }}
          />
          <TextField
            fullWidth
            label="Address"
            value={payableTo.address}
            onChange={(e) => onFieldChange('payableTo', 'address', e.target.value)}
            multiline
            rows={3}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: COLORS.PRIMARY_GREEN
                }
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: COLORS.PRIMARY_GREEN
              }
            }}
          />
          
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 'bold', marginTop: '20px', marginBottom: '10px', color: COLORS.TEXT_PRIMARY }}
          >
            Bank Details
          </Typography>
          <TextField
            fullWidth
            label="Bank Name"
            value={bankDetails.bankName}
            onChange={(e) => onFieldChange('bankDetails', 'bankName', e.target.value)}
            sx={{
              marginBottom: '15px',
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: COLORS.PRIMARY_GREEN
                }
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: COLORS.PRIMARY_GREEN
              }
            }}
          />
          <TextField
            fullWidth
            label="Account Information"
            value={bankDetails.accountInfo}
            onChange={(e) => onFieldChange('bankDetails', 'accountInfo', e.target.value)}
            multiline
            rows={2}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: COLORS.PRIMARY_GREEN
                }
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: COLORS.PRIMARY_GREEN
              }
            }}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 'bold', marginBottom: '10px', color: COLORS.TEXT_PRIMARY }}
          >
            Terms and Conditions
          </Typography>
          <TextField
            fullWidth
            value={termsAndConditions}
            onChange={(e) => onFieldChange('termsAndConditions', '', e.target.value)}
            multiline
            rows={15}
            placeholder="Enter terms and conditions..."
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: COLORS.PRIMARY_GREEN
                }
              }
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PaymentInfoSection;
