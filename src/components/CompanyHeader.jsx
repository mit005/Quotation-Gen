import React from 'react';
import { Box, Typography } from '@mui/material';
import { COLORS, DEFAULT_VALUES } from '../constants';
import CompanyNameEditor from './CompanyNameEditor';

const CompanyHeader = ({ logoUrl, companyAddress, companyNameConfig, onCompanyNameChange }) => {
  const renderCompanyName = () => {
    if (companyNameConfig && companyNameConfig.words) {
      return (
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
      );
    }
    
    return DEFAULT_VALUES.COMPANY_NAME;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: `3px solid ${COLORS.PRIMARY_GREEN}`,
        marginBottom: '30px',
        backgroundColor: COLORS.LIGHT_GREEN
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
        {logoUrl && (
          <img
            src={logoUrl}
            alt="Company Logo"
            style={{
              height: '80px',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
        )}
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                marginBottom: '5px'
              }}
            >
              {renderCompanyName()}
            </Typography>
            {onCompanyNameChange && (
              <CompanyNameEditor
                companyName={companyNameConfig?.name || DEFAULT_VALUES.COMPANY_NAME}
                onSave={onCompanyNameChange}
              />
            )}
          </Box>
          <Typography
            variant="subtitle1"
            sx={{
              color: COLORS.PRIMARY_GREEN,
              fontStyle: 'italic'
            }}
          >
            {DEFAULT_VALUES.COMPANY_TAGLINE}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: COLORS.TEXT_SECONDARY,
              marginTop: '10px',
              whiteSpace: 'pre-line'
            }}
          >
            {companyAddress || DEFAULT_VALUES.COMPANY_ADDRESS}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CompanyHeader;
