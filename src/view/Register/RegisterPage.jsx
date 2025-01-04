import { 
    Box, 
    FormControl, 
    InputLabel, 
    MenuItem, 
    Select, 
    TextField, 
    Typography, 
    Button, 
    Grid, 
    Stack
  } from '@mui/material';
  import React, { useState } from 'react';
  import { useDropzone } from 'react-dropzone';
  import COLORS from '../../utils/Colors';
import { useNavigate } from 'react-router-dom';
  
  const batchsData = ['2024', '2025'];
  const classTypeData = ['Theory', 'Revision', 'Paper'];
  
  const RegisterPage = () => {
    const [batch, setBatch] = useState('');
    const [classType, setClassType] = useState('');
    const [isPressNext, setIsPressNext] = useState(false);
    const [preview, setPreview] = useState(null); 

    const navigate = useNavigate();

    const handleBatchChange = (event) => {
      setBatch(event.target.value);
    };
  
    const handleClassTypeChange = (event) => {
      setClassType(event.target.value);
    };
  
    const onDrop = (acceptedFiles) => {
     
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result); 
      };
      reader.readAsDataURL(file);
    };
  
    const { getRootProps, getInputProps } = useDropzone({
      accept: 'image/*',
      onDrop,
    });
  
    return (
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: COLORS.bgBlue,
        }}
      >
        <Box
          sx={{
            width: { xs: '95%', sm: '80%', md: '50%' },
            bgcolor: COLORS.white,
            borderRadius: '20px',
            boxShadow: 4,
            p: 4,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: COLORS.primary,
              textAlign: 'center',
              mb: 4,
            }}
          >
            Register
          </Typography>
  
          {isPressNext === false ? (
            <Grid container spacing={3}>
              {/* Registration Fields */}
              <Grid item xs={12} sm={6}>
                <TextField label="Name" size="small" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Email" size="small" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="WhatsApp No" size="small" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Tel No" size="small" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="District" size="small" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="School/Private" size="small" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  size="small"
                  fullWidth
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Password"
                  size="small"
                  fullWidth
                  type="password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel id="batch-select-label">Batch</InputLabel>
                  <Select
                    labelId="batch-select-label"
                    value={batch}
                    onChange={handleBatchChange}
                    label="Batch"
                  >
                    {batchsData.map((data, index) => (
                      <MenuItem key={index} value={data}>
                        {data}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel id="class-type-select-label">Class Type</InputLabel>
                  <Select
                    labelId="class-type-select-label"
                    value={classType}
                    onChange={handleClassTypeChange}
                    label="Class Type"
                  >
                    {classTypeData.map((data, index) => (
                      <MenuItem key={index} value={data}>
                        {data}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    py: 1,
                    fontSize: '16px',
                    bgcolor: COLORS.bgBlue,
                    color: COLORS.white,
                    '&:hover': {
                      bgcolor: COLORS.secondary,
                    },
                  }}
                  onClick={() => setIsPressNext(true)}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Box>
              
              <Box
                {...getRootProps()}
                sx={{
                  border: '2px dashed gray',
                  borderRadius: '15px',
                  width: '100%',
                  height: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  mb: 2,
                }}
              >
                <input {...getInputProps()} />
                {preview ? (
                  <img
                    src={preview}
                    alt="Selected"
                    style={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                      objectFit: 'contain',
                    }}
                  />
                ) : (
                  <Typography>Drag and drop an image, or click to select one</Typography>
                )}
              </Box>
              <Stack direction={{xs:'column',md:'row'}} justifyContent={'space-between'}>
              <Button
                variant="contained"
                onClick={() => setPreview(null)}
                sx={{
                  bgcolor: COLORS.secondary,
                  color: COLORS.white,
                  '&:hover': {
                    bgcolor: COLORS.bgBlue,
                  },
                }}
              >
                Choose 
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate('/')}
                sx={{
                  bgcolor: COLORS.secondary,
                  color: COLORS.white,
                  '&:hover': {
                    bgcolor: COLORS.bgBlue,
                  },
                }}
              >
                Register
              </Button>
              </Stack>
            </Box>
          )}
        </Box>
      </Box>
    );
  };
  
  export default RegisterPage;
  