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

const drawerWidth = 260;

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
    <Box>
      <Box
        sx={{
          padding: '20px',
          background: `linear-gradient(135deg, ${COLORS.PRIMARY_GREEN} 0%, ${COLORS.DARK_GREEN} 100%)`,
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {DEFAULT_VALUES.COMPANY_NAME}
        </Typography>
        <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
          {DEFAULT_VALUES.COMPANY_TAGLINE}
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              selected={selectedMenu === item.id}
              onClick={() => handleMenuClick(item.id)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: COLORS.LIGHT_GREEN,
                  borderLeft: `4px solid ${COLORS.PRIMARY_GREEN}`,
                  '&:hover': {
                    backgroundColor: COLORS.LIGHT_GREEN
                  }
                }
              }}
            >
              <ListItemIcon sx={{ color: selectedMenu === item.id ? COLORS.PRIMARY_GREEN : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{
                  '& .MuiTypography-root': {
                    fontWeight: selectedMenu === item.id ? 'bold' : 'normal',
                    color: selectedMenu === item.id ? COLORS.PRIMARY_GREEN : 'inherit'
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
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: `linear-gradient(135deg, ${COLORS.PRIMARY_GREEN} 0%, ${COLORS.DARK_GREEN} 100%)`
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            {menuItems.find(item => item.id === selectedMenu)?.label || 'Dashboard'}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2">{user?.email}</Typography>
            <IconButton onClick={handleProfileMenuOpen} color="inherit">
              <Avatar sx={{ width: 35, height: 35, bgcolor: COLORS.DARK_GREEN }}>
                <AccountCircle />
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
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          backgroundColor: '#f5f5f5'
        }}
      >
        <Toolbar />
        {selectedMenu === 'dashboard' && <DashboardHome />}
        {selectedMenu === 'quotations' && <QuotationForm />}
      </Box>
    </Box>
  );
};

export default Dashboard;
