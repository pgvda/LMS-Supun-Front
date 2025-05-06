
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
    FormControlLabel,
    Checkbox,
    Paper,
    Container,
    Divider,
    IconButton,
    InputAdornment,
    useTheme,
    useMediaQuery
  } from '@mui/material';
  import React, { useEffect, useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import axios from 'axios';
  import Api from '../../utils/Api';
  import Swal from 'sweetalert2';
  import { Visibility, VisibilityOff, School, WhatsApp, Phone, Home, Email, Person, LocationOn } from '@mui/icons-material';
  

  const THEME = {
    primary: '#3f51b5',      // Deep blue
    secondary: '#f50057',    // Pink
    accent: '#ff4081',       // Light pink
    success: '#4caf50',      // Green
    background: '#f5f7ff',   // Light blue-gray
    paper: '#ffffff',        // White
    text: '#2d3748',         // Dark slate
    lightText: '#718096',    // Medium gray
    divider: '#e2e8f0',      // Light gray
    gradient: 'linear-gradient(45deg, #3f51b5 30%, #673ab7 90%)'
  };
  
  const batchsData = ['2025', '2026', '2027'];
  const classTypeData = ['Theory', 'Revision', 'Paper', 'Theory&Revision'];
  const districData = [
    "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya", "Galle", 
    "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar", "Vavuniya", 
    "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee", "Kurunegala", "Puttalam", 
    "Anuradhapura", "Polonnaruwa", "Badulla", "Monaragala", "Ratnapura", "Kegalle"
  ];
  
  const AddStudentPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    const [batch, setBatch] = useState('');
    const [classType, setClassType] = useState('');
    const [district, setDistrict] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [classTypes, setClassTypes] = useState([]);
    
    const [registerData, setRegisterData] = useState({
      name: '',
      email: '',
      whatsAppNo: '',
      additionalNo: '',
      district: '',
      scl: '',
      address: '',
      password: '',
      studentIdImg: '',
      indianHistory: false,
      europeHistory: false,
      historyType: '',
      batch: '',
      classType: ''
    });
  
    const navigate = useNavigate();
  
    const handleBatchChange = (event) => {
      const newBatch = event.target.value;
      setBatch(newBatch);
      setRegisterData((prev) => ({
        ...prev,
        batch: newBatch
      }));
    };
  
    const handleClassTypeChange = (event) => {
      const newClassType = event.target.value;
      setClassType(newClassType);
      setRegisterData((prev) => ({
        ...prev,
        classType: newClassType
      }));
    };
  
    const handleDistrictChange = (event) => {
      const district = event.target.value;
      setDistrict(district);
      setRegisterData((prev) => ({
        ...prev,
        district: district
      }));
    };
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setRegisterData({ ...registerData, [name]: value });
    };
  
    const handleCheckboxChange = (event) => {
      const { name, checked } = event.target;
      
      if (name === 'indianHistory' && checked) {
        setRegisterData({
          ...registerData,
          indianHistory: true,
          europeHistory: false,
          historyType: 'Indian'
        });
      } else if (name === 'europeHistory' && checked) {
        setRegisterData({
          ...registerData,
          indianHistory: false,
          europeHistory: true,
          historyType: 'Europe'
        });
      } else {
        setRegisterData({
          ...registerData,
          [name]: checked,
        });
      }
    };
  
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };
  
    const handleSubmit = async () => {
      try {
        const response = await axios.post(Api + 'students/student/register', registerData);
  
        if (response.data.code === 200) {
          await Swal.fire({
            title: "Registration Success",
            icon: "success",
            draggable: true,
            timer: 3000
          });
          setRegisterData({
            name: '',
            email: '',
            whatsAppNo: '',
            additionalNo: '',
            district: '',
            scl: '',
            address: '',
            password: '',
            studentIdImg: '',
            indianHistory: false,
            europeHistory: false,
            historyType: '',
            batch: '',
            classType: ''
          })
        }
      } catch (error) {
        Swal.fire({
          title: "Registration Failed",
          text: error.response?.data?.message || "Something went wrong",
          icon: "error",
          draggable: true,
          timer: 3000
        });
        console.error('Registration error:', error);
      }
    };
  
    const fetchClassType = async () => {
      try {
        const response = await axios.get(Api + 'folders/folder-names');
        if (response.data.code === 200) {
          setClassTypes(response.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
  
    useEffect(() => {
      fetchClassType();
    }, []);
  
    return (
      <Box

      >
        <Container maxWidth="md">
          <Paper
            elevation={10}
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)'
              }
            }}
          >
            <Box
              sx={{
                bgcolor: THEME.primary,
                color: 'white',
                py: 3,
                px: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant="h4" fontWeight="700" sx={{ mb: 1 }}>
                Student Registration
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.8 }}>
                Join our academic community today
              </Typography>
            </Box>
  
            <Box sx={{ p: { xs: 3, md: 5 } }}>
              <Grid container spacing={3}>
                {/* Personal Information Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ color: THEME.primary, fontWeight: 600, mb: 2 }}>
                    Personal Information
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                </Grid>
  
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Full Name"
                    size="small"
                    fullWidth
                    name="name"
                    value={registerData.name}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person fontSize="small" sx={{ color: THEME.primary }} />
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: THEME.primary,
                        },
                      },
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email Address"
                    size="small"
                    fullWidth
                    name="email"
                    value={registerData.email}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email fontSize="small" sx={{ color: THEME.primary }} />
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
  
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="WhatsApp Number"
                    size="small"
                    fullWidth
                    name="whatsAppNo"
                    value={registerData.whatsAppNo}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <WhatsApp fontSize="small" sx={{ color: THEME.primary }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
  
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Telephone Number"
                    size="small"
                    fullWidth
                    name="additionalNo"
                    value={registerData.additionalNo}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone fontSize="small" sx={{ color: THEME.primary }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
  
                {/* Location & Academic Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ color: THEME.primary, fontWeight: 600, mb: 2, mt: 2 }}>
                    Location & Academic Details
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                </Grid>
  
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
                    <InputLabel id="district-select-label">District</InputLabel>
                    <Select
                      labelId="district-select-label"
                      value={district}
                      onChange={handleDistrictChange}
                      label="District"
                      name="district"
                      startAdornment={
                        <InputAdornment position="start">
                          <LocationOn fontSize="small" sx={{ color: THEME.primary, ml: 1 }} />
                        </InputAdornment>
                      }
                    >
                      {districData.map((data, index) => (
                        <MenuItem key={index} value={data}>
                          {data}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
  
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="School/Institution"
                    size="small"
                    fullWidth
                    name="scl"
                    value={registerData.scl}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <School fontSize="small" sx={{ color: THEME.primary }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
  
                <Grid item xs={12}>
                  <TextField
                    label="Address"
                    size="small"
                    fullWidth
                    multiline
                    rows={3}
                    name="address"
                    value={registerData.address}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                          <Home fontSize="small" sx={{ color: THEME.primary }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
  
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Password"
                    size="small"
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={registerData.password}
                    onChange={handleInputChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
  
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
                    <InputLabel id="batch-select-label">Batch</InputLabel>
                    <Select
                      labelId="batch-select-label"
                      value={batch}
                      onChange={handleBatchChange}
                      label="Batch"
                      name="batch"
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
                  <FormControl fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
                    <InputLabel id="class-type-select-label">Class Type</InputLabel>
                    <Select
                      labelId="class-type-select-label"
                      value={classType}
                      onChange={handleClassTypeChange}
                      label="Class Type"
                      name="classType"
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
                  <TextField
                    label="Student ID"
                    size="small"
                    fullWidth
                    name="studentIdImg"
                    value={registerData.studentIdImg}
                    onChange={handleInputChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
  
                <Grid item xs={12}>
                  <Box 
                    sx={{ 
                      p: 2, 
                      bgcolor: 'rgba(63, 81, 181, 0.05)', 
                      borderRadius: 2,
                      border: '1px solid rgba(63, 81, 181, 0.2)'
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500, color: THEME.primary }}>
                      History Specialization
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <FormControlLabel
                          control={
                            <Checkbox 
                              checked={registerData.indianHistory}
                              onChange={handleCheckboxChange}
                              name="indianHistory"
                              sx={{
                                color: THEME.primary,
                                '&.Mui-checked': {
                                  color: THEME.primary,
                                },
                              }}
                            />
                          }
                          label="Indian History"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlLabel
                          control={
                            <Checkbox 
                              checked={registerData.europeHistory}
                              onChange={handleCheckboxChange}
                              name="europeHistory"
                              sx={{
                                color: THEME.primary,
                                '&.Mui-checked': {
                                  color: THEME.primary,
                                },
                              }}
                            />
                          }
                          label="European History"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
  
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    bgcolor: THEME.secondary,
                    color: THEME.paper,
                    py: 1.5,
                    px: 4,
                    fontSize: '1rem',
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    boxShadow: '0 4px 14px 0 rgba(245, 0, 87, 0.39)',
                    '&:hover': {
                      bgcolor: '#d50053',
                      boxShadow: '0 6px 20px rgba(245, 0, 87, 0.4)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Complete Registration
                </Button>

              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    );
  };
  
  export default AddStudentPage;