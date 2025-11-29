// Constants for the quotation application

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const API_ENDPOINTS = {
  GENERATE_QUOTATION: '/quotations/generate',
  GET_QUOTATION: '/quotations',
  GET_ALL_QUOTATIONS: '/quotations',
  DOWNLOAD_QUOTATION: (id) => `/quotations/${id}/download`
};

export const COLORS = {
  PRIMARY_GREEN: '#4A9B7F',
  LIGHT_GREEN: '#E8F5F1',
  DARK_GREEN: '#2D6B54',
  TEXT_PRIMARY: '#333333',
  TEXT_SECONDARY: '#666666',
  BACKGROUND: '#FFFFFF',
  BORDER: '#DDDDDD',
  ERROR: '#D32F2F',
  SUCCESS: '#388E3C'
};

export const DEFAULT_VALUES = {
  TAX_PERCENTAGE: 10,
  COMPANY_NAME: 'Ecovian Energy',
  COMPANY_TAGLINE: 'Sustainable Power Solutions',
  COMPANY_ADDRESS: 'Flor-2, 220 Yogi Arcade,\nYogichok, Varacha, Surat',
  DEFAULT_PAYABLE_TO: {
    name: 'Ecovian Energy',
    address: 'Flor-2, 220 Yogi Arcade, Yogichok, Varacha, Surat'
  },
  DEFAULT_BANK_DETAILS: {
    bankName: 'Bank Name',
    accountInfo: 'Account Number: XXXX-XXXX-XXXX'
  },
  DEFAULT_TERMS: '• Payment terms as agreed\n• Prices are subject to change\n• Valid for 30 days'
};

export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  MIN_LINE_ITEMS: 'At least one line item is required',
  POSITIVE_NUMBER: 'Value must be greater than 0'
};
