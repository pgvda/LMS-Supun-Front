import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Button, Grid, Stack,FormControlLabel,Checkbox} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import COLORS from '../../utils/Colors';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Api from '../../utils/Api';
import Swal from 'sweetalert2'

const batchsData = ['2024', '2025'];
const classTypeData = ['Theory', 'Revision', 'Paper'];

const RegisterPage = () => {
  const [batch, setBatch] = useState('');
  const [classType, setClassType] = useState('');
  const [className, setClassName] = useState('');
  const [isPressNext, setIsPressNext] = useState(false);
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
    historyType:'',
    batch:'',
    classType:'',
    className:''
  });
  const [classTypes, setClassTypes] = useState([]);

  const navigate = useNavigate();

  const handleBatchChange = (event) => {
    const newBatch = event.target.value;
    setBatch(newBatch);
    setRegisterData((prev) => ({
      ...prev,
      batch:newBatch
    }))
  };

  const handleClassTypeChange = (event) => {
    const newClassType = event.target.value;
    setClassType(newClassType);
    setRegisterData((prev) => ({
      ...prev,
      classType:newClassType
    }))
  };

  const handleClassNameChange = (event) => {
    const newClassName = event.target.value;
    setClassName(newClassName);
    setRegisterData((prev) => ({
      ...prev,
      className:newClassName
    }))
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
        historyType:'Indian'
      });

    } else if (name === 'europeHistory' && checked) {
      setRegisterData({
        ...registerData,
        indianHistory: false, 
        europeHistory: true,
        historyType:'Europe'
      });
    } else {
    
      setRegisterData({
        ...registerData,
        [name]: checked,
      });
    }
  };
  

  const handleSubmit = async () => {
    try {
      console.log(registerData);
      const response = await axios.post(Api + 'students/student/register', registerData);
    

      if(response.data.code === 200){
        await Swal.fire({
          title: "Registration Success",
          icon: "success",
          draggable: true,
          timer:3000
        });
        navigate('/');
      }
      
    } catch (error) {
      Swal.fire({
        title: "Registration Fail",
        icon: "error",
        draggable: true,
        timer:3000
      });
      console.error('Registration error:', error);
    }
  };

  const fetchClassType = async() =>{
    try{
      const response = await axios.get(Api + 'folders/folder-names')



      if(response.data.code === 200){
        setClassTypes(response.data.data)
      }
    }catch(err){
      console.error(err)
    }
  }

  useEffect(()=>{
    fetchClassType();
  },[])

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
            <Grid item xs={12} sm={6}>
              <TextField 
                label="Name" 
                size="small" 
                fullWidth 
                name="name" 
                value={registerData.name}
                onChange={handleInputChange} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                label="Email" 
                size="small" 
                fullWidth 
                name="email" 
                value={registerData.email}
                onChange={handleInputChange} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                label="WhatsApp No" 
                size="small" 
                fullWidth 
                name="whatsAppNo" 
                value={registerData.whatsAppNo}
                onChange={handleInputChange} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                label="Tel No" 
                size="small" 
                fullWidth 
                name="additionalNo" 
                value={registerData.additionalNo}
                onChange={handleInputChange} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                label="districtt" 
                size="small" 
                fullWidth 
                name="district" 
                value={registerData.district}
                onChange={handleInputChange} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                label="School/Private" 
                size="small" 
                fullWidth 
                name="scl" 
                value={registerData.scl}
                onChange={handleInputChange} 
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Password"
                size="small"
                fullWidth
                type="password"
                name="password"
                value={registerData.password}
                onChange={handleInputChange}
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
              <FormControl fullWidth size="small">
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
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 4 }}>
              <Grid item xs={12} sm={6}>
                <TextField 
                  label="ID No" 
                  size="small" 
                  fullWidth 
                  name="studentIdImg" 
                  value={registerData.studentIdImg}
                  onChange={handleInputChange} 
                />
              </Grid>
              <FormControlLabel 
                control={<Checkbox />} 
                label="Indian History" 
                name="indianHistory"
                checked={registerData.indianHistory}
                onChange={handleCheckboxChange}
              />
              <FormControlLabel 
                control={<Checkbox />} 
                label="Europe History" 
                name="europeHistory"
                checked={registerData.europeHistory}
                onChange={handleCheckboxChange}
              />
            </Box>
            <Button
              variant="contained"
              onClick={handleSubmit}
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
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default RegisterPage;
