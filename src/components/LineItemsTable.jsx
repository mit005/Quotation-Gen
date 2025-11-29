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
    <Box sx={{ marginBottom: '30px' }}>
      <Typography
        variant="h6"
        sx={{
          color: COLORS.PRIMARY_GREEN,
          fontWeight: 'bold',
          marginBottom: '15px'
        }}
      >
        Line Items
      </Typography>
      
      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: COLORS.PRIMARY_GREEN }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '40%' }}>
                ITEM DESCRIPTION
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '15%' }} align="center">
                QTY
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '20%' }} align="right">
                PRICE
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '20%' }} align="right">
                TOTAL
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '5%' }} align="center">
                
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lineItems.map((item, index) => (
              <TableRow key={item.id || index}>
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
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={onAddItem}
        sx={{
          marginTop: '15px',
          color: COLORS.PRIMARY_GREEN,
          borderColor: COLORS.PRIMARY_GREEN,
          '&:hover': {
            borderColor: COLORS.DARK_GREEN,
            backgroundColor: COLORS.LIGHT_GREEN
          }
        }}
      >
        Add Item
      </Button>
    </Box>
  );
};

export default LineItemsTable;
