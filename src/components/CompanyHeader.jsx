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
        padding: { xs: '20px', md: '30px' },
        marginBottom: '40px',
        background: `linear-gradient(135deg, ${COLORS.LIGHT_GREEN} 0%, white 100%)`,
        borderRadius: '12px',
        borderLeft: `6px solid ${COLORS.PRIMARY_GREEN}`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flex: 1, flexWrap: 'wrap' }}>
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
        <Box sx={{ flex: 1, minWidth: '250px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: '8px' }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: '700',
                fontSize: { xs: '1.75rem', md: '2.125rem' }
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
              fontStyle: 'italic',
              fontWeight: '500',
              marginBottom: '12px'
            }}
          >
            {DEFAULT_VALUES.COMPANY_TAGLINE}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: COLORS.TEXT_SECONDARY,
              whiteSpace: 'pre-line',
              lineHeight: 1.6
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
