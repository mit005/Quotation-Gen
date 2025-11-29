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
        background: `linear-gradient(135deg, ${COLORS.PRIMARY_GREEN} 0%, ${COLORS.DARK_GREEN} 100%)`,
        padding: '20px',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }
      }}
    >
      <Paper
        elevation={0}
        sx={{
          padding: { xs: '40px 30px', sm: '60px 50px' },
          maxWidth: '480px',
          width: '100%',
          borderRadius: '24px',
          textAlign: 'center',
          backgroundColor: 'white',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          position: 'relative',
          zIndex: 1
        }}
      >
        <Box sx={{ marginBottom: '40px' }}>
          <Box
            sx={{
              width: '80px',
              height: '80px',
              margin: '0 auto 20px',
              background: `linear-gradient(135deg, ${COLORS.PRIMARY_GREEN} 0%, ${COLORS.DARK_GREEN} 100%)`,
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(74, 155, 127, 0.3)'
            }}
          >
            <LoginIcon sx={{ fontSize: 40, color: 'white' }} />
          </Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: '700',
              background: `linear-gradient(135deg, ${COLORS.PRIMARY_GREEN} 0%, ${COLORS.DARK_GREEN} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '8px',
              fontSize: { xs: '2rem', sm: '2.5rem' }
            }}
          >
            {DEFAULT_VALUES.COMPANY_NAME}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: COLORS.PRIMARY_GREEN,
              fontStyle: 'italic',
              marginBottom: '8px',
              fontWeight: '500'
            }}
          >
            {DEFAULT_VALUES.COMPANY_TAGLINE}
          </Typography>
          <Typography variant="body2" sx={{ color: COLORS.TEXT_SECONDARY }}>
            Quotation Management System
          </Typography>
        </Box>

        <Typography
          variant="h5"
          sx={{
            marginBottom: '30px',
            fontWeight: '700',
            color: COLORS.TEXT_PRIMARY
          }}
        >
          Welcome Back
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
            sx={{
              padding: '14px',
              fontSize: '1.125rem',
              fontWeight: '700',
              borderRadius: '12px',
              background: `linear-gradient(135deg, ${COLORS.PRIMARY_GREEN} 0%, ${COLORS.DARK_GREEN} 100%)`,
              boxShadow: '0 8px 24px rgba(74, 155, 127, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: `linear-gradient(135deg, ${COLORS.DARK_GREEN} 0%, ${COLORS.PRIMARY_GREEN} 100%)`,
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 32px rgba(74, 155, 127, 0.4)'
              },
              '&:disabled': {
                background: COLORS.BORDER,
                transform: 'none'
              }
            }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <Box
          sx={{
            marginTop: '30px',
            padding: '20px',
            background: `linear-gradient(135deg, ${COLORS.LIGHT_GREEN} 0%, white 100%)`,
            borderRadius: '12px',
            border: `2px solid ${COLORS.PRIMARY_GREEN}`,
            boxShadow: '0 4px 12px rgba(74, 155, 127, 0.1)'
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: '600',
              color: COLORS.TEXT_PRIMARY,
              marginBottom: '8px'
            }}
          >
            Demo Credentials
          </Typography>
          <Typography variant="body2" sx={{ color: COLORS.TEXT_SECONDARY, lineHeight: 1.8 }}>
            <strong>Email:</strong> admin@ecovianenergy.com<br />
            <strong>Password:</strong> Admin@123
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
