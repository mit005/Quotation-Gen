import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Description as DescriptionIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  AccountCircle
} from '@mui/icons-material';
import { COLORS, DEFAULT_VALUES } from '../constants';
import QuotationForm from './QuotationForm';
import DashboardHome from './DashboardHome';

const drawerWidth = 280;

const Dashboard = ({ user, onLogout }) => {
  const [selectedMenu, setSelectedMenu] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    setMobileOpen(false);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    onLogout();
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'quotations', label: 'Create Quotation', icon: <DescriptionIcon /> }
  ];

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#FAFAFA' }}>
      <Box
        sx={{
          padding: '30px 20px',
          background: `linear-gradient(135deg, ${COLORS.PRIMARY_GREEN} 0%, ${COLORS.DARK_GREEN} 100%)`,
          color: 'white',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '8px', letterSpacing: '0.5px' }}>
          {DEFAULT_VALUES.COMPANY_NAME}
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: 'italic', opacity: 0.95 }}>
          {DEFAULT_VALUES.COMPANY_TAGLINE}
        </Typography>
      </Box>
      <Divider />
      <List sx={{ padding: '16px 12px', flex: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ marginBottom: '8px' }}>
            <ListItemButton
              selected={selectedMenu === item.id}
              onClick={() => handleMenuClick(item.id)}
              sx={{
                borderRadius: '12px',
                padding: '12px 16px',
                transition: 'all 0.3s ease',
                '&.Mui-selected': {
                  backgroundColor: COLORS.PRIMARY_GREEN,
                  color: 'white',
                  boxShadow: '0 4px 12px rgba(74, 155, 127, 0.3)',
                  '&:hover': {
                    backgroundColor: COLORS.DARK_GREEN
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white'
                  }
                },
                '&:hover': {
                  backgroundColor: selectedMenu === item.id ? COLORS.DARK_GREEN : COLORS.LIGHT_GREEN,
                  transform: 'translateX(4px)'
                }
              }}
            >
              <ListItemIcon sx={{
                color: selectedMenu === item.id ? 'white' : COLORS.TEXT_SECONDARY,
                minWidth: '40px'
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{
                  '& .MuiTypography-root': {
                    fontWeight: selectedMenu === item.id ? '600' : '500',
                    fontSize: '0.95rem'
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: 'white',
          borderBottom: '1px solid #E0E0E0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}
      >
        <Toolbar sx={{ padding: '8px 24px !important' }}>
          <IconButton
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: 'none' },
              color: COLORS.TEXT_PRIMARY
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: '700',
              color: COLORS.TEXT_PRIMARY,
              fontSize: '1.5rem'
            }}
          >
            {menuItems.find(item => item.id === selectedMenu)?.label || 'Dashboard'}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              alignItems: 'flex-end'
            }}>
              <Typography variant="body2" sx={{ fontWeight: '600', color: COLORS.TEXT_PRIMARY }}>
                {user?.email?.split('@')[0]}
              </Typography>
              <Typography variant="caption" sx={{ color: COLORS.TEXT_SECONDARY }}>
                Administrator
              </Typography>
            </Box>
            <IconButton
              onClick={handleProfileMenuOpen}
              sx={{
                padding: '4px',
                '&:hover': {
                  backgroundColor: COLORS.LIGHT_GREEN
                }
              }}
            >
              <Avatar sx={{
                width: 42,
                height: 42,
                bgcolor: COLORS.PRIMARY_GREEN,
                boxShadow: '0 2px 8px rgba(74, 155, 127, 0.3)'
              }}>
                <AccountCircle sx={{ fontSize: 28 }} />
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          backgroundColor: '#F8F9FA'
        }}
      >
        <Toolbar />
        <Box sx={{ marginTop: '16px' }}>
          {selectedMenu === 'dashboard' && <DashboardHome />}
          {selectedMenu === 'quotations' && <QuotationForm />}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
