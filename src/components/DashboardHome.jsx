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
      <Typography variant="h4" sx={{ marginBottom: '30px', fontWeight: 'bold', color: COLORS.TEXT_PRIMARY }}>
        Welcome to Quotation Generator
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              elevation={3}
              sx={{
                height: '100%',
                background: `linear-gradient(135deg, ${stat.bgColor} 0%, white 100%)`,
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '10px' }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: stat.color }}>
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: stat.bgColor,
                      borderRadius: '50%',
                      padding: '15px',
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
          <Paper elevation={3} sx={{ padding: '30px', minHeight: '400px' }}>
            <Typography variant="h6" sx={{ marginBottom: '20px', fontWeight: 'bold', color: COLORS.PRIMARY_GREEN }}>
              Recent Quotations
            </Typography>
            <Box sx={{ textAlign: 'center', paddingY: '100px' }}>
              <DescriptionIcon sx={{ fontSize: 80, color: COLORS.BORDER }} />
              <Typography variant="body1" color="textSecondary" sx={{ marginTop: '20px' }}>
                No quotations yet. Create your first quotation to get started!
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              padding: '30px',
              minHeight: '400px',
              background: `linear-gradient(135deg, ${COLORS.LIGHT_GREEN} 0%, white 100%)`
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: '20px', fontWeight: 'bold', color: COLORS.PRIMARY_GREEN }}>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Paper
                elevation={2}
                sx={{
                  padding: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': {
                    backgroundColor: COLORS.PRIMARY_GREEN,
                    color: 'white',
                    transform: 'translateX(5px)'
                  }
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  📝 Create New Quotation
                </Typography>
                <Typography variant="caption">
                  Generate a new quotation for your client
                </Typography>
              </Paper>

              <Paper
                elevation={2}
                sx={{
                  padding: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': {
                    backgroundColor: COLORS.PRIMARY_GREEN,
                    color: 'white',
                    transform: 'translateX(5px)'
                  }
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  📊 View Reports
                </Typography>
                <Typography variant="caption">
                  Check your quotation statistics
                </Typography>
              </Paper>

              <Paper
                elevation={2}
                sx={{
                  padding: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': {
                    backgroundColor: COLORS.PRIMARY_GREEN,
                    color: 'white',
                    transform: 'translateX(5px)'
                  }
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  ⚙️ Settings
                </Typography>
                <Typography variant="caption">
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
