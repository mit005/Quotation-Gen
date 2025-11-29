import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Divider
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Palette as PaletteIcon
} from '@mui/icons-material';
import { COLORS } from '../constants';

const CompanyNameEditor = ({ companyName, onSave }) => {
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  
  // Parse company name into words with colors
  const parseCompanyName = (name) => {
    if (!name) return [];
    return name.split(' ').map((word, index) => ({
      id: index,
      text: word,
      color1: '#4A9B7F',
      color2: '#2D6B54'
    }));
  };

  const [words, setWords] = useState(parseCompanyName(companyName));
  const [gradientColor1, setGradientColor1] = useState('#4A9B7F');
  const [gradientColor2, setGradientColor2] = useState('#2D6B54');
  const [gradientAngle, setGradientAngle] = useState(135);

  const handleOpen = () => {
    setWords(parseCompanyName(companyName));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const nameText = words.map(w => w.text).join(' ');
    onSave({
      name: nameText,
      words: words,
      globalGradient: {
        color1: gradientColor1,
        color2: gradientColor2,
        angle: gradientAngle
      }
    });
    setOpen(false);
  };

  const updateWord = (id, field, value) => {
    setWords(words.map(w => w.id === id ? { ...w, [field]: value } : w));
  };

  const addWord = () => {
    setWords([...words, {
      id: Date.now(),
      text: '',
      color1: gradientColor1,
      color2: gradientColor2
    }]);
  };

  const removeWord = (id) => {
    setWords(words.filter(w => w.id !== id));
  };

  const applyGlobalGradient = () => {
    setWords(words.map(w => ({
      ...w,
      color1: gradientColor1,
      color2: gradientColor2
    })));
  };

  const previewGradient = (color1, color2, angle = gradientAngle) => {
    return `linear-gradient(${angle}deg, ${color1} 0%, ${color2} 100%)`;
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          color: COLORS.PRIMARY_GREEN,
          '&:hover': {
            backgroundColor: COLORS.LIGHT_GREEN
          }
        }}
        title="Edit Company Name & Colors"
      >
        <EditIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ backgroundColor: COLORS.PRIMARY_GREEN, color: 'white' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PaletteIcon />
              <Typography variant="h6">Customize Company Name</Typography>
            </Box>
            <IconButton onClick={handleClose} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ paddingTop: '20px' }}>
          <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ marginBottom: '20px' }}>
            <Tab label="Global Gradient" />
            <Tab label="Individual Words" />
          </Tabs>

          {/* Preview */}
          <Paper elevation={3} sx={{ padding: '30px', marginBottom: '20px', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
            <Typography variant="caption" color="textSecondary" sx={{ marginBottom: '10px', display: 'block' }}>
              PREVIEW
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 'bold',
                display: 'inline'
              }}
            >
              {words.map((word, index) => (
                <span
                  key={word.id}
                  style={{
                    background: previewGradient(word.color1, word.color2),
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginRight: index < words.length - 1 ? '10px' : '0'
                  }}
                >
                  {word.text}
                </span>
              ))}
            </Typography>
          </Paper>

          {tabValue === 0 && (
            <Box>
              <Typography variant="h6" sx={{ marginBottom: '15px', color: COLORS.PRIMARY_GREEN }}>
                Global Gradient Settings
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '20px' }}>
                Set a gradient that will apply to all words
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" sx={{ marginBottom: '10px', fontWeight: 'bold' }}>
                    Start Color
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <input
                      type="color"
                      value={gradientColor1}
                      onChange={(e) => setGradientColor1(e.target.value)}
                      style={{
                        width: '60px',
                        height: '40px',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    />
                    <TextField
                      size="small"
                      value={gradientColor1}
                      onChange={(e) => setGradientColor1(e.target.value)}
                      placeholder="#4A9B7F"
                      sx={{ flex: 1 }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography variant="body2" sx={{ marginBottom: '10px', fontWeight: 'bold' }}>
                    End Color
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <input
                      type="color"
                      value={gradientColor2}
                      onChange={(e) => setGradientColor2(e.target.value)}
                      style={{
                        width: '60px',
                        height: '40px',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    />
                    <TextField
                      size="small"
                      value={gradientColor2}
                      onChange={(e) => setGradientColor2(e.target.value)}
                      placeholder="#2D6B54"
                      sx={{ flex: 1 }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography variant="body2" sx={{ marginBottom: '10px', fontWeight: 'bold' }}>
                    Angle: {gradientAngle}°
                  </Typography>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={gradientAngle}
                    onChange={(e) => setGradientAngle(parseInt(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box
                    sx={{
                      height: '60px',
                      borderRadius: '8px',
                      background: previewGradient(gradientColor1, gradientColor2),
                      border: '2px solid #ddd'
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={applyGlobalGradient}
                    sx={{
                      backgroundColor: COLORS.PRIMARY_GREEN,
                      '&:hover': {
                        backgroundColor: COLORS.DARK_GREEN
                      }
                    }}
                  >
                    Apply to All Words
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}

          {tabValue === 1 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <Typography variant="h6" sx={{ color: COLORS.PRIMARY_GREEN }}>
                  Individual Word Colors
                </Typography>
                <Button
                  startIcon={<AddIcon />}
                  onClick={addWord}
                  variant="outlined"
                  sx={{
                    borderColor: COLORS.PRIMARY_GREEN,
                    color: COLORS.PRIMARY_GREEN,
                    '&:hover': {
                      borderColor: COLORS.DARK_GREEN,
                      backgroundColor: COLORS.LIGHT_GREEN
                    }
                  }}
                >
                  Add Word
                </Button>
              </Box>

              <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '20px' }}>
                Customize each word separately with different colors
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {words.map((word, index) => (
                  <Paper key={word.id} elevation={2} sx={{ padding: '15px' }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} md={3}>
                        <TextField
                          fullWidth
                          size="small"
                          label={`Word ${index + 1}`}
                          value={word.text}
                          onChange={(e) => updateWord(word.id, 'text', e.target.value)}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '&.Mui-focused fieldset': {
                                borderColor: COLORS.PRIMARY_GREEN
                              }
                            }
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} md={3}>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                          <input
                            type="color"
                            value={word.color1}
                            onChange={(e) => updateWord(word.id, 'color1', e.target.value)}
                            style={{
                              width: '40px',
                              height: '40px',
                              border: '2px solid #ddd',
                              borderRadius: '8px',
                              cursor: 'pointer'
                            }}
                          />
                          <TextField
                            size="small"
                            value={word.color1}
                            onChange={(e) => updateWord(word.id, 'color1', e.target.value)}
                            placeholder="Start"
                            sx={{ flex: 1 }}
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={12} md={3}>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                          <input
                            type="color"
                            value={word.color2}
                            onChange={(e) => updateWord(word.id, 'color2', e.target.value)}
                            style={{
                              width: '40px',
                              height: '40px',
                              border: '2px solid #ddd',
                              borderRadius: '8px',
                              cursor: 'pointer'
                            }}
                          />
                          <TextField
                            size="small"
                            value={word.color2}
                            onChange={(e) => updateWord(word.id, 'color2', e.target.value)}
                            placeholder="End"
                            sx={{ flex: 1 }}
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={12} md={2}>
                        <Box
                          sx={{
                            height: '40px',
                            borderRadius: '8px',
                            background: previewGradient(word.color1, word.color2),
                            border: '2px solid #ddd'
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} md={1}>
                        <IconButton
                          onClick={() => removeWord(word.id)}
                          disabled={words.length === 1}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ padding: '20px' }}>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            startIcon={<SaveIcon />}
            sx={{
              backgroundColor: COLORS.PRIMARY_GREEN,
              '&:hover': {
                backgroundColor: COLORS.DARK_GREEN
              }
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CompanyNameEditor;
