import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { COLORS, DEFAULT_VALUES } from '../constants';

const PreviewModal = ({ open, quotationData, subtotal, tax, grandTotal, onClose, companyNameConfig }) => {
  
  const formatCurrency = (value) => {
    return `₹ ${parseFloat(value || 0).toFixed(2)}`;
  };
  
  if (!quotationData) return null;
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          minHeight: '80vh'
        }
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: COLORS.PRIMARY_GREEN,
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant="h6">Quotation Preview</Typography>
      </DialogTitle>
      
      <DialogContent sx={{ padding: '30px' }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {companyNameConfig && companyNameConfig.words ? (
              <>
                {companyNameConfig.words.map((word, index) => (
                  <span
                    key={index}
                    style={{
                      background: `linear-gradient(${companyNameConfig.globalGradient?.angle || 135}deg, ${word.color1} 0%, ${word.color2} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      marginRight: index < companyNameConfig.words.length - 1 ? '10px' : '0'
                    }}
                  >
                    {word.text}
                  </span>
                ))}
              </>
            ) : (
              DEFAULT_VALUES.COMPANY_NAME
            )}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: COLORS.PRIMARY_GREEN, fontStyle: 'italic' }}>
            {DEFAULT_VALUES.COMPANY_TAGLINE}
          </Typography>
          <Typography variant="body2" sx={{ color: COLORS.TEXT_SECONDARY, whiteSpace: 'pre-line' }}>
            {DEFAULT_VALUES.COMPANY_ADDRESS}
          </Typography>
        </Box>
        
        <Box sx={{ borderTop: `3px solid ${COLORS.PRIMARY_GREEN}`, marginY: '20px' }} />
        
        {/* Date and Client */}
        <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
          <Grid item xs={6}>
            <Typography variant="body2"><strong>Date:</strong> {quotationData.date}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2"><strong>Client:</strong> {quotationData.clientName}</Typography>
          </Grid>
        </Grid>
        
        {/* Client Info */}
        <Box sx={{ backgroundColor: COLORS.LIGHT_GREEN, padding: '15px', marginBottom: '20px', borderRadius: '4px' }}>
          <Typography variant="body2"><strong>Address:</strong> {quotationData.clientAddress}</Typography>
          <Typography variant="body2"><strong>Email:</strong> {quotationData.email}</Typography>
          <Typography variant="body2"><strong>Phone:</strong> {quotationData.phoneNumber}</Typography>
        </Box>
        
        {/* Line Items */}
        <TableContainer component={Paper} elevation={0} sx={{ marginBottom: '20px' }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: COLORS.PRIMARY_GREEN }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ITEM DESCRIPTION</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">QTY</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">PRICE</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">TOTAL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quotationData.lineItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.description}</TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="right">{formatCurrency(item.price)}</TableCell>
                  <TableCell align="right">{formatCurrency(item.total)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        {/* Totals */}
        <Box sx={{ backgroundColor: COLORS.LIGHT_GREEN, padding: '15px', marginBottom: '20px', borderRadius: '4px' }}>
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <Typography variant="body1" align="right"><strong>SUB TOTAL</strong></Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1" align="right">{formatCurrency(subtotal)}</Typography>
            </Grid>
            
            <Grid item xs={8}>
              <Typography variant="body1" align="right"><strong>TAX ({quotationData.taxPercentage}%)</strong></Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1" align="right">{formatCurrency(tax)}</Typography>
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ borderTop: `2px solid ${COLORS.PRIMARY_GREEN}`, marginY: '10px' }} />
            </Grid>
            
            <Grid item xs={8}>
              <Typography variant="h6" align="right" sx={{ color: COLORS.PRIMARY_GREEN }}><strong>GRAND TOTAL</strong></Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6" align="right" sx={{ color: COLORS.PRIMARY_GREEN }}><strong>{formatCurrency(grandTotal)}</strong></Typography>
            </Grid>
          </Grid>
        </Box>
        
        {/* Payment Info */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box sx={{ backgroundColor: COLORS.LIGHT_GREEN, padding: '15px', borderRadius: '4px' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>Payable To</Typography>
              <Typography variant="body2">{quotationData.payableTo.name}</Typography>
              <Typography variant="body2">{quotationData.payableTo.address}</Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', marginTop: '15px', marginBottom: '10px' }}>Bank Details</Typography>
              <Typography variant="body2">{quotationData.bankDetails.bankName}</Typography>
              <Typography variant="body2">{quotationData.bankDetails.accountInfo}</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ backgroundColor: COLORS.LIGHT_GREEN, padding: '15px', borderRadius: '4px' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>Terms and Conditions</Typography>
              <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                {quotationData.termsAndConditions || DEFAULT_VALUES.DEFAULT_TERMS}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions sx={{ padding: '20px' }}>
        <Button
          onClick={onClose}
          variant="contained"
          startIcon={<CloseIcon />}
          sx={{
            backgroundColor: COLORS.PRIMARY_GREEN,
            '&:hover': {
              backgroundColor: COLORS.DARK_GREEN
            }
          }}
        >
          Close Preview
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PreviewModal;
