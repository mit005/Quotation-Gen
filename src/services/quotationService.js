import apiClient from './api';
import { API_ENDPOINTS } from '../constants';

export const quotationService = {
  
  async generateQuotation(quotationData) {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.GENERATE_QUOTATION, 
        quotationData,
        {
          responseType: 'blob'
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error generating quotation:', error);
      throw error;
    }
  },
  
  async getQuotation(id) {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.GET_QUOTATION}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching quotation:', error);
      throw error;
    }
  },
  
  async getAllQuotations() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.GET_ALL_QUOTATIONS);
      return response.data;
    } catch (error) {
      console.error('Error fetching all quotations:', error);
      throw error;
    }
  },
  
  async downloadQuotation(id) {
    try {
      const response = await apiClient.get(
        API_ENDPOINTS.DOWNLOAD_QUOTATION(id),
        {
          responseType: 'blob'
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error downloading quotation:', error);
      throw error;
    }
  },
  
  triggerDownload(blob, filename) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
};
