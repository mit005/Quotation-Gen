import React from 'react';
import { Box, TextField, Grid, Typography } from '@mui/material';
import { COLORS } from '../constants';

const ClientInfoSection = ({
  date,
  clientName,
  clientAddress,
  email,
  phoneNumber,
  onFieldChange,
  errors
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
        Client Information
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Date"
            type="date"
            value={date}
            onChange={(e) => onFieldChange('date', e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
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
          <TextField
            fullWidth
            label="Client Name"
            value={clientName}
            onChange={(e) => onFieldChange('clientName', e.target.value)}
            required
            error={!!errors.clientName}
            helperText={errors.clientName}
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
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Client Address"
            value={clientAddress}
            onChange={(e) => onFieldChange('clientAddress', e.target.value)}
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
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => onFieldChange('email', e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
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
          <TextField
            fullWidth
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => onFieldChange('phoneNumber', e.target.value)}
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
      </Grid>
    </Box>
  );
};

export default ClientInfoSection;
