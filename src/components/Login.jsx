import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, Login as LoginIcon } from '@mui/icons-material';
import { COLORS, DEFAULT_VALUES } from '../constants';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password
      });

      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        onLoginSuccess(response.data.user);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${COLORS.LIGHT_GREEN} 0%, ${COLORS.PRIMARY_GREEN} 100%)`,
        padding: '20px'
      }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: '50px 40px',
          maxWidth: '450px',
          width: '100%',
          borderRadius: '20px',
          textAlign: 'center'
        }}
      >
        {/* Logo and Company Name */}
        <Box sx={{ marginBottom: '30px' }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              background: `linear-gradient(135deg, #4A9B7F 0%, #2D6B54 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '10px'
            }}
          >
            {DEFAULT_VALUES.COMPANY_NAME}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: COLORS.PRIMARY_GREEN,
              fontStyle: 'italic',
              marginBottom: '10px'
            }}
          >
            {DEFAULT_VALUES.COMPANY_TAGLINE}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Quotation Management System
          </Typography>
        </Box>

        <Typography variant="h5" sx={{ marginBottom: '30px', fontWeight: 'bold', color: COLORS.TEXT_PRIMARY }}>
          Sign In
        </Typography>

        {error && (
          <Alert severity="error" sx={{ marginBottom: '20px' }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              marginBottom: '20px',
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: COLORS.PRIMARY_GREEN
                }
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: COLORS.PRIMARY_GREEN
              }
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{
              marginBottom: '30px',
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: COLORS.PRIMARY_GREEN
                }
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: COLORS.PRIMARY_GREEN
              }
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            startIcon={<LoginIcon />}
            sx={{
              padding: '12px',
              fontSize: '16px',
              fontWeight: 'bold',
              background: `linear-gradient(135deg, ${COLORS.PRIMARY_GREEN} 0%, ${COLORS.DARK_GREEN} 100%)`,
              '&:hover': {
                background: `linear-gradient(135deg, ${COLORS.DARK_GREEN} 0%, ${COLORS.PRIMARY_GREEN} 100%)`
              }
            }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <Box sx={{ marginTop: '30px', padding: '15px', backgroundColor: COLORS.LIGHT_GREEN, borderRadius: '10px' }}>
          <Typography variant="caption" color="textSecondary">
            <strong>Demo Credentials:</strong><br />
            Email: admin@ecovianenergy.com<br />
            Password: Admin@123
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
