import React from 'react';
import { Box, Button, CircularProgress, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { COLORS } from '../constants';

const ActionButtons = ({ onPreview, onDownload, onReset, isFormValid, isLoading }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 3,
        marginTop: '50px',
        paddingTop: '30px',
        borderTop: '2px solid #E0E0E0',
        flexWrap: 'wrap'
      }}
    >
      <Tooltip title="Preview the quotation before downloading">
        <span>
          <Button
            variant="outlined"
            startIcon={<VisibilityIcon />}
            onClick={onPreview}
            disabled={!isFormValid || isLoading}
            sx={{
              minWidth: '160px',
              padding: '12px 28px',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '10px',
              border: `2px solid ${COLORS.PRIMARY_GREEN}`,
              color: COLORS.PRIMARY_GREEN,
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: COLORS.DARK_GREEN,
                backgroundColor: COLORS.LIGHT_GREEN,
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(74, 155, 127, 0.2)'
              },
              '&:disabled': {
                borderColor: COLORS.BORDER,
                color: COLORS.TEXT_SECONDARY,
                transform: 'none'
              }
            }}
          >
            Preview
          </Button>
        </span>
      </Tooltip>
      
      <Tooltip title="Download quotation as PDF">
        <span>
          <Button
            variant="contained"
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <DownloadIcon />}
            onClick={onDownload}
            disabled={!isFormValid || isLoading}
            sx={{
              minWidth: '160px',
              padding: '12px 28px',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '10px',
              background: `linear-gradient(135deg, ${COLORS.PRIMARY_GREEN} 0%, ${COLORS.DARK_GREEN} 100%)`,
              boxShadow: '0 4px 12px rgba(74, 155, 127, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: `linear-gradient(135deg, ${COLORS.DARK_GREEN} 0%, ${COLORS.PRIMARY_GREEN} 100%)`,
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(74, 155, 127, 0.4)'
              },
              '&:disabled': {
                background: COLORS.BORDER,
                color: COLORS.TEXT_SECONDARY,
                boxShadow: 'none',
                transform: 'none'
              }
            }}
          >
            {isLoading ? 'Generating...' : 'Download PDF'}
          </Button>
        </span>
      </Tooltip>
      
      <Tooltip title="Reset form to start a new quotation">
        <span>
          <Button
            variant="outlined"
            startIcon={<RestartAltIcon />}
            onClick={onReset}
            disabled={isLoading}
            sx={{
              minWidth: '160px',
              padding: '12px 28px',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '10px',
              border: `2px solid ${COLORS.ERROR}`,
              color: COLORS.ERROR,
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: '#B71C1C',
                backgroundColor: '#FFEBEE',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(211, 47, 47, 0.2)'
              },
              '&:disabled': {
                borderColor: COLORS.BORDER,
                color: COLORS.TEXT_SECONDARY,
                transform: 'none'
              }
            }}
          >
            Reset
          </Button>
        </span>
      </Tooltip>
    </Box>
  );
};

export default ActionButtons;
