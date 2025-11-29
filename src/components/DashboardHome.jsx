import React from 'react';
import { Box, Grid, Paper, Typography, Card, CardContent } from '@mui/material';
import {
  Description as DescriptionIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as MoneyIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';
import { COLORS } from '../constants';

const DashboardHome = () => {
  const stats = [
    {
      title: 'Total Quotations',
      value: '0',
      icon: <DescriptionIcon sx={{ fontSize: 40 }} />,
      color: COLORS.PRIMARY_GREEN,
      bgColor: COLORS.LIGHT_GREEN
    },
    {
      title: 'This Month',
      value: '0',
      icon: <CalendarIcon sx={{ fontSize: 40 }} />,
      color: '#2196F3',
      bgColor: '#E3F2FD'
    },
    {
      title: 'Total Value',
      value: '₹ 0',
      icon: <MoneyIcon sx={{ fontSize: 40 }} />,
      color: '#FF9800',
      bgColor: '#FFF3E0'
    },
    {
      title: 'Growth',
      value: '0%',
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      color: '#4CAF50',
      bgColor: '#E8F5E9'
    }
  ];

  return (
    <Box>
      <Box sx={{
        marginBottom: '40px',
        padding: '24px',
        background: `linear-gradient(135deg, ${COLORS.LIGHT_GREEN} 0%, white 100%)`,
        borderRadius: '16px',
        borderLeft: `6px solid ${COLORS.PRIMARY_GREEN}`,
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
      }}>
        <Typography variant="h4" sx={{
          fontWeight: '700',
          color: COLORS.TEXT_PRIMARY,
          marginBottom: '8px'
        }}>
          Welcome to Quotation Generator
        </Typography>
        <Typography variant="body1" sx={{ color: COLORS.TEXT_SECONDARY }}>
          Manage and create professional quotations for your clients
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                background: 'white',
                border: '1px solid #E0E0E0',
                borderRadius: '16px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
                  borderColor: stat.color
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: stat.color
                }
              }}
            >
              <CardContent sx={{ padding: '24px !important' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: COLORS.TEXT_SECONDARY,
                        marginBottom: '12px',
                        fontWeight: '500',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontSize: '0.75rem'
                      }}
                    >
                      {stat.title}
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: '700', color: stat.color }}>
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: `${stat.color}15`,
                      borderRadius: '16px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: stat.color
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ marginTop: '20px' }}>
        <Grid item xs={12} md={8}>
          <Paper
            elevation={0}
            sx={{
              padding: '30px',
              minHeight: '400px',
              borderRadius: '16px',
              border: '1px solid #E0E0E0',
              backgroundColor: 'white'
            }}
          >
            <Typography
              variant="h6"
              sx={{
                marginBottom: '24px',
                fontWeight: '700',
                color: COLORS.TEXT_PRIMARY,
                fontSize: '1.25rem'
              }}
            >
              Recent Quotations
            </Typography>
            <Box sx={{
              textAlign: 'center',
              paddingY: '100px',
              backgroundColor: '#FAFAFA',
              borderRadius: '12px',
              border: '2px dashed #E0E0E0'
            }}>
              <DescriptionIcon sx={{ fontSize: 80, color: COLORS.PRIMARY_GREEN, opacity: 0.3 }} />
              <Typography
                variant="h6"
                sx={{
                  marginTop: '20px',
                  color: COLORS.TEXT_SECONDARY,
                  fontWeight: '500'
                }}
              >
                No quotations yet
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ marginTop: '8px' }}>
                Create your first quotation to get started!
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              padding: '30px',
              minHeight: '400px',
              borderRadius: '16px',
              border: '1px solid #E0E0E0',
              backgroundColor: 'white'
            }}
          >
            <Typography
              variant="h6"
              sx={{
                marginBottom: '24px',
                fontWeight: '700',
                color: COLORS.TEXT_PRIMARY,
                fontSize: '1.25rem'
              }}
            >
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Paper
                elevation={0}
                sx={{
                  padding: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: `2px solid ${COLORS.LIGHT_GREEN}`,
                  borderRadius: '12px',
                  background: 'white',
                  '&:hover': {
                    backgroundColor: COLORS.PRIMARY_GREEN,
                    color: 'white',
                    transform: 'translateX(8px)',
                    borderColor: COLORS.PRIMARY_GREEN,
                    boxShadow: '0 4px 12px rgba(74, 155, 127, 0.3)',
                    '& .MuiTypography-root': {
                      color: 'white'
                    }
                  }
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: '600', marginBottom: '4px' }}>
                  Create New Quotation
                </Typography>
                <Typography variant="caption" sx={{ color: COLORS.TEXT_SECONDARY }}>
                  Generate a new quotation for your client
                </Typography>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  padding: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: `2px solid ${COLORS.LIGHT_GREEN}`,
                  borderRadius: '12px',
                  background: 'white',
                  '&:hover': {
                    backgroundColor: COLORS.PRIMARY_GREEN,
                    color: 'white',
                    transform: 'translateX(8px)',
                    borderColor: COLORS.PRIMARY_GREEN,
                    boxShadow: '0 4px 12px rgba(74, 155, 127, 0.3)',
                    '& .MuiTypography-root': {
                      color: 'white'
                    }
                  }
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: '600', marginBottom: '4px' }}>
                  View Reports
                </Typography>
                <Typography variant="caption" sx={{ color: COLORS.TEXT_SECONDARY }}>
                  Check your quotation statistics
                </Typography>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  padding: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: `2px solid ${COLORS.LIGHT_GREEN}`,
                  borderRadius: '12px',
                  background: 'white',
                  '&:hover': {
                    backgroundColor: COLORS.PRIMARY_GREEN,
                    color: 'white',
                    transform: 'translateX(8px)',
                    borderColor: COLORS.PRIMARY_GREEN,
                    boxShadow: '0 4px 12px rgba(74, 155, 127, 0.3)',
                    '& .MuiTypography-root': {
                      color: 'white'
                    }
                  }
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: '600', marginBottom: '4px' }}>
                  Settings
                </Typography>
                <Typography variant="caption" sx={{ color: COLORS.TEXT_SECONDARY }}>
                  Manage your preferences
                </Typography>
              </Paper>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardHome;
