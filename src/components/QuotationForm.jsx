import React, { useState, useEffect } from 'react';
import { Box, Paper, Snackbar, Alert } from '@mui/material';
import { format } from 'date-fns';
import CompanyHeader from './CompanyHeader';
import ClientInfoSection from './ClientInfoSection';
import LineItemsTable from './LineItemsTable';
import TotalsSection from './TotalsSection';
import PaymentInfoSection from './PaymentInfoSection';
import ActionButtons from './ActionButtons';
import PreviewModal from './PreviewModal';
import { quotationService } from '../services/quotationService';
import { DEFAULT_VALUES } from '../constants';

const QuotationForm = () => {
  const [quotationData, setQuotationData] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    clientName: '',
    clientAddress: '',
    email: '',
    phoneNumber: '',
    payableTo: {
      name: DEFAULT_VALUES.DEFAULT_PAYABLE_TO.name,
      address: DEFAULT_VALUES.DEFAULT_PAYABLE_TO.address
    },
    bankDetails: {
      bankName: DEFAULT_VALUES.DEFAULT_BANK_DETAILS.bankName,
      accountInfo: DEFAULT_VALUES.DEFAULT_BANK_DETAILS.accountInfo
    },
    termsAndConditions: DEFAULT_VALUES.DEFAULT_TERMS,
    lineItems: [
      {
        id: Date.now().toString(),
        description: '',
        quantity: 1,
        price: 0,
        total: 0
      }
    ],
    taxPercentage: DEFAULT_VALUES.TAX_PERCENTAGE
  });
  
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [companyNameConfig, setCompanyNameConfig] = useState(() => {
    const saved = localStorage.getItem('companyNameConfig');
    return saved ? JSON.parse(saved) : {
      name: DEFAULT_VALUES.COMPANY_NAME,
      words: DEFAULT_VALUES.COMPANY_NAME.split(' ').map((word, index) => ({
        id: index,
        text: word,
        color1: '#4A9B7F',
        color2: '#2D6B54'
      })),
      globalGradient: {
        color1: '#4A9B7F',
        color2: '#2D6B54',
        angle: 135
      }
    };
  });
  
  // Calculate totals whenever line items or tax percentage changes
  useEffect(() => {
    calculateTotals();
  }, [quotationData.lineItems, quotationData.taxPercentage]);
  
  const calculateTotals = () => {
    const newSubtotal = quotationData.lineItems.reduce((sum, item) => sum + item.total, 0);
    const newTax = (newSubtotal * quotationData.taxPercentage) / 100;
    const newGrandTotal = newSubtotal + newTax;
    
    setSubtotal(newSubtotal);
    setTax(newTax);
    setGrandTotal(newGrandTotal);
  };
  
  const handleFieldChange = (field, value) => {
    setQuotationData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  
  const handlePaymentFieldChange = (section, field, value) => {
    if (section === 'termsAndConditions') {
      setQuotationData(prev => ({
        ...prev,
        termsAndConditions: value
      }));
    } else {
      setQuotationData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    }
  };
  
  const addLineItem = () => {
    const newItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      price: 0,
      total: 0
    };
    
    setQuotationData(prev => ({
      ...prev,
      lineItems: [...prev.lineItems, newItem]
    }));
  };
  
  const removeLineItem = (id) => {
    if (quotationData.lineItems.length === 1) {
      showSnackbar('At least one line item is required', 'warning');
      return;
    }
    
    setQuotationData(prev => ({
      ...prev,
      lineItems: prev.lineItems.filter(item => item.id !== id)
    }));
  };
  
  const updateLineItem = (id, field, value) => {
    setQuotationData(prev => ({
      ...prev,
      lineItems: prev.lineItems.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          
          // Recalculate total if quantity or price changed
          if (field === 'quantity' || field === 'price') {
            updatedItem.total = updatedItem.quantity * updatedItem.price;
          }
          
          return updatedItem;
        }
        return item;
      })
    }));
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!quotationData.clientName.trim()) {
      newErrors.clientName = 'Client name is required';
    }
    
    if (quotationData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(quotationData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    const hasValidLineItems = quotationData.lineItems.some(
      item => item.description.trim() && item.quantity > 0 && item.price > 0
    );
    
    if (!hasValidLineItems) {
      newErrors.lineItems = 'At least one valid line item is required';
      showSnackbar('Please add at least one valid line item with description, quantity, and price', 'error');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handlePreview = () => {
    if (validateForm()) {
      setShowPreview(true);
    }
  };
  
  const handleDownload = async () => {
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Prepare request data
      const requestData = {
        date: quotationData.date,
        clientName: quotationData.clientName,
        clientAddress: quotationData.clientAddress,
        email: quotationData.email,
        phoneNumber: quotationData.phoneNumber,
        payableTo: quotationData.payableTo,
        bankDetails: quotationData.bankDetails,
        termsAndConditions: quotationData.termsAndConditions,
        lineItems: quotationData.lineItems
          .filter(item => item.description.trim() && item.quantity > 0 && item.price > 0)
          .map(item => ({
            description: item.description,
            quantity: item.quantity,
            price: item.price
          })),
        taxPercentage: quotationData.taxPercentage
      };
      
      // Generate and download PDF
      const pdfBlob = await quotationService.generateQuotation(requestData);
      const filename = `Quotation_${quotationData.clientName}_${quotationData.date}.pdf`;
      quotationService.triggerDownload(pdfBlob, filename);
      
      showSnackbar('Quotation generated successfully!', 'success');
    } catch (error) {
      console.error('Error generating quotation:', error);
      showSnackbar(error.message || 'Failed to generate quotation. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the form? All data will be lost.')) {
      setQuotationData({
        date: format(new Date(), 'yyyy-MM-dd'),
        clientName: '',
        clientAddress: '',
        email: '',
        phoneNumber: '',
        payableTo: {
          name: DEFAULT_VALUES.DEFAULT_PAYABLE_TO.name,
          address: DEFAULT_VALUES.DEFAULT_PAYABLE_TO.address
        },
        bankDetails: {
          bankName: DEFAULT_VALUES.DEFAULT_BANK_DETAILS.bankName,
          accountInfo: DEFAULT_VALUES.DEFAULT_BANK_DETAILS.accountInfo
        },
        termsAndConditions: DEFAULT_VALUES.DEFAULT_TERMS,
        lineItems: [
          {
            id: Date.now().toString(),
            description: '',
            quantity: 1,
            price: 0,
            total: 0
          }
        ],
        taxPercentage: DEFAULT_VALUES.TAX_PERCENTAGE
      });
      setErrors({});
      showSnackbar('Form reset successfully', 'info');
    }
  };
  
  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };
  
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  
  const handleCompanyNameChange = (config) => {
    setCompanyNameConfig(config);
    localStorage.setItem('companyNameConfig', JSON.stringify(config));
    showSnackbar('Company name updated successfully!', 'success');
  };
  
  const isFormValid = quotationData.clientName.trim() && 
                      quotationData.lineItems.some(item => item.description.trim() && item.quantity > 0 && item.price > 0);
  
  return (
    <Box>
      <Paper elevation={3} sx={{ padding: '30px', borderRadius: '15px' }}>
        <CompanyHeader 
          companyAddress={DEFAULT_VALUES.COMPANY_ADDRESS}
          companyNameConfig={companyNameConfig}
          onCompanyNameChange={handleCompanyNameChange}
        />
        
        <ClientInfoSection
          date={quotationData.date}
          clientName={quotationData.clientName}
          clientAddress={quotationData.clientAddress}
          email={quotationData.email}
          phoneNumber={quotationData.phoneNumber}
          onFieldChange={handleFieldChange}
          errors={errors}
        />
        
        <LineItemsTable
          lineItems={quotationData.lineItems}
          onAddItem={addLineItem}
          onRemoveItem={removeLineItem}
          onUpdateItem={updateLineItem}
        />
        
        <TotalsSection
          subtotal={subtotal}
          tax={tax}
          taxPercentage={quotationData.taxPercentage}
          grandTotal={grandTotal}
          onTaxPercentageChange={(value) => handleFieldChange('taxPercentage', value)}
        />
        
        <PaymentInfoSection
          payableTo={quotationData.payableTo}
          bankDetails={quotationData.bankDetails}
          termsAndConditions={quotationData.termsAndConditions}
          onFieldChange={handlePaymentFieldChange}
        />
        
        <ActionButtons
          onPreview={handlePreview}
          onDownload={handleDownload}
          onReset={handleReset}
          isFormValid={isFormValid}
          isLoading={isLoading}
        />
      </Paper>
      
      <PreviewModal
        open={showPreview}
        quotationData={quotationData}
        subtotal={subtotal}
        tax={tax}
        grandTotal={grandTotal}
        onClose={() => setShowPreview(false)}
        companyNameConfig={companyNameConfig}
      />
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default QuotationForm;
