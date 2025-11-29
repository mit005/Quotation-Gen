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
        gap: 2,
        marginTop: '30px',
        marginBottom: '30px'
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
              minWidth: '150px',
              color: COLORS.PRIMARY_GREEN,
              borderColor: COLORS.PRIMARY_GREEN,
              '&:hover': {
                borderColor: COLORS.DARK_GREEN,
                backgroundColor: COLORS.LIGHT_GREEN
              },
              '&:disabled': {
                borderColor: COLORS.BORDER,
                color: COLORS.TEXT_SECONDARY
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
              minWidth: '150px',
              backgroundColor: COLORS.PRIMARY_GREEN,
              '&:hover': {
                backgroundColor: COLORS.DARK_GREEN
              },
              '&:disabled': {
                backgroundColor: COLORS.BORDER,
                color: COLORS.TEXT_SECONDARY
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
              minWidth: '150px',
              color: COLORS.ERROR,
              borderColor: COLORS.ERROR,
              '&:hover': {
                borderColor: '#B71C1C',
                backgroundColor: '#FFEBEE'
              },
              '&:disabled': {
                borderColor: COLORS.BORDER,
                color: COLORS.TEXT_SECONDARY
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
