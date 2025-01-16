import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  TextField,
  IconButton,
  Button,
  Stack,
  Container,
  Paper,
  Divider,
  useTheme,
  Badge,
  Grid
} from '@mui/material';
import {
  Edit,
  PhotoCamera,
  Save,
  AccountCircle,
  Email,
  School,
  Phone,
  LocationOn
} from '@mui/icons-material';
import axios from 'axios';
import Api from '../utils/Api';
import Swal from 'sweetalert2';
import { BlueButton } from '../utils/CommonStyle';

const ProfilePage = () => {
  const theme = useTheme();
  
  const [passwordFields, setPasswordFields] = useState({
    currentPassword: '',
    newPassword: '',
  });
  
  const [profileData, setProfileData] = useState({
    profileImage: '',
    name: '',
    email: '',
    accountType: '',
    accountState: '',
    batch: '',
    classType: '',
    whatsAppNo: '',
    additionalNo: '',
    district: '',
    scl: '',
    address: '',
    studentIdINo: '',
    registrationNo: ''
  });

  const [editMode, setEditMode] = useState({});
  const [folderName, setFolderName] = useState('');

  const id = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  const accountType = localStorage.getItem('accountType');

  console.log(id)

  const handleEditClick = async(field) => {
    if(field !== 'batch' && field !== 'classType' && field !== 'email'){
      setEditMode(prev => ({ ...prev, [field]: !prev[field] }));
    }
    if(editMode[field]){
      try{
        const response = await axios.put(Api + 'students/student/update/' + id, {
          name:profileData.name,
          whatsAppNo:profileData.whatsAppNo,
          additionalNo:profileData.additionalNo,
          district:profileData.district,
          scl:profileData.scl,
          address:profileData.address
        },{
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log(response)
        const errorMsg = response.data.message
        console.log(errorMsg)
        if (response.data.code === 200) {
          Swal.fire({
            title: "Updating Success !",
            icon: "success",
            draggable: true,
            timer: 3000
          });
        } else {
          Swal.fire({
            title: "Updating Fail !",
            text:errorMsg.join(','),
            icon: "error",
            draggable: true,
          });
        }
      } catch (err) {
        console.error(err)
      }
    }
    

  };

  const handleChange = (e, field) => {
    setProfileData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handlePasswordChange = (e, field) => {
    setPasswordFields(prev => ({ ...prev, [field]: e.target.value }));
  };



  const handleChangePassword = async() => {
    try{
      const response = await axios.put(Api + 'students/student/updatepassword/' + id, {
        newPassword:passwordFields.newPassword,
        oldPassword:passwordFields.currentPassword
      },{
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log(response)
      const errorMsg = response.data.message
      console.log(errorMsg)
      if (response.data.code === 200) {
        Swal.fire({
          title: "Password Change Success !",
          icon: "success",
          draggable: true,
          timer: 3000
        });
      } else {
        Swal.fire({
          title: "Password Change Fail !",
          text:errorMsg.join(','),
          icon: "error",
          draggable: true,
        });
      }
    } catch (err) {
      console.error(err)
    }
  } 

  const fetchData = async() => {
    try{
      const response = await axios.get(Api + 'students/student/getbyid/' + id ,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log(response);
      if(response.data.code === 200){
        const data = response.data.data;


          setProfileData({
            profileImage: data.profileImg,
            name: data.name,
            email: data.email,
            accountType: data.accountType,
            accountState: data.accountState,
            batch: data.batch,
            classType: data.classType,
            whatsAppNo: data.whatsAppNo,
            additionalNo: data.additionalNo,
            district: data.district,
            scl: data.scl,
            address: data.address,
            studentIdINo: data.studentIdImg,
            registrationNo: data.regNo
          })

      }
    }catch(err){
      console.error(err);
    }
  }

  const handleAddFolder = async() => {
   
    try{
      const response = await axios.post(Api + 'folders/create/folder',{
        folderName:folderName
      },{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })

      console.log(response);
      const errorMsg = response.data.message
      if (response.data.code === 200) {
        setFolderName('');
        Swal.fire({
          title: "Folder Created .!",
          icon: "success",
          draggable: true,
          timer: 3000
        });
      } else {
        Swal.fire({
          title: "Fail with Create Folder !",
          text:errorMsg.join(','),
          icon: "error",
          draggable: true,
        });
      }
    }catch(err){
      console.error(err)
    }
  }

  useEffect(()=>{
    fetchData();
  },[id])

  const renderTextField = (label, field, value, icon) => (
    <Box sx={{ mb: 2 }}>
      <TextField
        label={label}
        fullWidth
        value={value}
        onChange={(e) => handleChange(e, field)}
        disabled={!editMode[field]}
        InputProps={{
          startAdornment: icon,
          endAdornment: (
            <IconButton 
              onClick={() => handleEditClick(field)}
              color={editMode[field] ? "primary" : "default"}
            >
              {editMode[field] ? <Save /> : <Edit />}
            </IconButton>
          ),
        }}
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: theme.palette.primary.main,
            },
          },
        }}
      />
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
  
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <IconButton
                      sx={{
                        bgcolor: 'primary.main',
                        color: 'white',
                        '&:hover': { bgcolor: 'primary.dark' },
                      }}
                      size="small"
                    >
                      <PhotoCamera fontSize="small" />
                    </IconButton>
                  }
                >
                  <Avatar
                    src={profileData.profileImage}
                    sx={{
                      width: 120,
                      height: 120,
                      border: '4px solid white',
                      boxShadow: theme.shadows[3],
                    }}
                  />
                </Badge>
              </Box>
              
              <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
                {profileData.name}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                {profileData.registrationNo}
              </Typography>
              
              <Paper
                sx={{
                  mt: 2,
                  p: 1,
                  bgcolor: 'primary.light',
                  color: 'primary.contrastText',
                }}
              >
                <Typography variant="body2">
                  {profileData.accountType} • {profileData.accountState}
                </Typography>
              </Paper>
            </Paper>


            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Change Password
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="Current Password"
                  type="password"
                  fullWidth
                  value={passwordFields.currentPassword}
                  onChange={(e) => handlePasswordChange(e, 'currentPassword')}
                />
                <TextField
                  label="New Password"
                  type="password"
                  fullWidth
                  value={passwordFields.newPassword}
                  onChange={(e) => handlePasswordChange(e, 'newPassword')}
                />
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleChangePassword}
                  sx={{ mt: 2 }}
                >
                  Update Password
                </Button>
              </Stack>
            </Paper>
            {accountType === 'admin' && (
              <Box>
               
                <TextField id="outlined-basic" label="Folder Name" variant="outlined" sx={{width:'100%', my:1}} 
                onChange={(e) => setFolderName(e.target.value)}
                />
                <BlueButton onClick={handleAddFolder}>Add Folder</BlueButton>
              </Box>
            )}
          </Stack>
        </Grid>

  
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            {renderTextField('Full Name', 'name', profileData.name, 
              <AccountCircle sx={{ color: 'action.active', mr: 1 }} />
            )}
            {renderTextField('Email', 'email', profileData.email,
              <Email sx={{ color: 'action.active', mr: 1 }} />
            )}
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h6" gutterBottom>
              Academic Information
            </Typography>
            {renderTextField('Batch', 'batch', profileData.batch,
              <School sx={{ color: 'action.active', mr: 1 }} />
            )}
            {renderTextField('Class Type', 'classType', profileData.classType,
              <School sx={{ color: 'action.active', mr: 1 }} />
            )}
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            {renderTextField('WhatsApp No', 'whatsAppNo', profileData.whatsAppNo,
              <Phone sx={{ color: 'action.active', mr: 1 }} />
            )}
            {renderTextField('Additional No', 'additionalNo', profileData.additionalNo,
              <Phone sx={{ color: 'action.active', mr: 1 }} />
            )}
            {renderTextField('District', 'district', profileData.district,
              <LocationOn sx={{ color: 'action.active', mr: 1 }} />
            )}
            {renderTextField('School', 'scl', profileData.scl,
              <School sx={{ color: 'action.active', mr: 1 }} />
            )}
            {renderTextField('Address', 'address', profileData.address,
              <LocationOn sx={{ color: 'action.active', mr: 1 }} />
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;