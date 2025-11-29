// Type definitions for the quotation application

export const LineItemType = {
  id: '',
  description: '',
  quantity: 0,
  price: 0,
  total: 0
};

export const PayableToType = {
  name: '',
  address: ''
};

export const BankDetailsType = {
  bankName: '',
  accountInfo: ''
};

export const QuotationFormStateType = {
  date: '',
  clientName: '',
  clientAddress: '',
  email: '',
  phoneNumber: '',
  payableTo: PayableToType,
  bankDetails: BankDetailsType,
  termsAndConditions: '',
  lineItems: [LineItemType],
  taxPercentage: 10
};

export const ValidationErrorsType = {
  clientName: '',
  email: '',
  lineItems: ''
};
