import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Button,
  Typography,
  Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { COLORS } from '../constants';

const LineItemsTable = ({ lineItems, onAddItem, onRemoveItem, onUpdateItem }) => {
  
  const formatCurrency = (value) => {
    return `₹ ${parseFloat(value || 0).toFixed(2)}`;
  };
  
  return (
    <Box sx={{ marginBottom: '40px' }}>
      <Typography
        variant="h6"
        sx={{
          color: COLORS.TEXT_PRIMARY,
          fontWeight: '700',
          marginBottom: '20px',
          fontSize: '1.25rem',
          paddingBottom: '12px',
          borderBottom: `3px solid ${COLORS.PRIMARY_GREEN}`
        }}
      >
        Line Items
      </Typography>

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          border: '1px solid #E0E0E0',
          borderRadius: '12px',
          overflow: 'hidden'
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{
              background: `linear-gradient(135deg, ${COLORS.PRIMARY_GREEN} 0%, ${COLORS.DARK_GREEN} 100%)`
            }}>
              <TableCell sx={{
                color: 'white',
                fontWeight: '700',
                width: '40%',
                fontSize: '0.875rem',
                letterSpacing: '0.5px'
              }}>
                ITEM DESCRIPTION
              </TableCell>
              <TableCell sx={{
                color: 'white',
                fontWeight: '700',
                width: '15%',
                fontSize: '0.875rem',
                letterSpacing: '0.5px'
              }} align="center">
                QTY
              </TableCell>
              <TableCell sx={{
                color: 'white',
                fontWeight: '700',
                width: '20%',
                fontSize: '0.875rem',
                letterSpacing: '0.5px'
              }} align="right">
                PRICE
              </TableCell>
              <TableCell sx={{
                color: 'white',
                fontWeight: '700',
                width: '20%',
                fontSize: '0.875rem',
                letterSpacing: '0.5px'
              }} align="right">
                TOTAL
              </TableCell>
              <TableCell sx={{
                color: 'white',
                fontWeight: '700',
                width: '5%'
              }} align="center">

              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lineItems.map((item, index) => (
              <TableRow
                key={item.id || index}
                sx={{
                  '&:hover': {
                    backgroundColor: '#F8F9FA'
                  },
                  '&:last-child td': {
                    borderBottom: 0
                  }
                }}
              >
                <TableCell>
                  <TextField
                    fullWidth
                    size="small"
                    value={item.description}
                    onChange={(e) => onUpdateItem(item.id, 'description', e.target.value)}
                    placeholder="Item description"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: COLORS.PRIMARY_GREEN
                        }
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    value={item.quantity}
                    onChange={(e) => onUpdateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                    inputProps={{ min: 1 }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: COLORS.PRIMARY_GREEN
                        }
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    value={item.price}
                    onChange={(e) => onUpdateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                    inputProps={{ min: 0, step: 0.01 }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: COLORS.PRIMARY_GREEN
                        }
                      }
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {formatCurrency(item.total)}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => onRemoveItem(item.id)}
                    disabled={lineItems.length === 1}
                    color="error"
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAddItem}
        sx={{
          marginTop: '20px',
          backgroundColor: 'white',
          color: COLORS.PRIMARY_GREEN,
          border: `2px solid ${COLORS.PRIMARY_GREEN}`,
          padding: '10px 24px',
          fontWeight: '600',
          borderRadius: '8px',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: COLORS.PRIMARY_GREEN,
            color: 'white',
            boxShadow: '0 4px 12px rgba(74, 155, 127, 0.3)'
          }
        }}
      >
        Add Item
      </Button>
    </Box>
  );
};

export default LineItemsTable;
