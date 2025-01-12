import React, { useState } from 'react';
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

const ProfilePage = () => {
  const theme = useTheme();
  
  const [passwordFields, setPasswordFields] = useState({
    currentPassword: '',
    newPassword: '',
  });
  
  const [profileData, setProfileData] = useState({
    profileImage: '/api/placeholder/150/150',
    name: 'John Doe',
    email: 'john.doe@example.com',
    accountType: 'Premium',
    accountState: 'Active',
    batch: '2023',
    classType: 'Full-Time',
    whatsAppNo: '123-456-7890',
    additionalNo: '',
    district: 'Colombo',
    scl: 'ABC High School',
    address: '123 Main St, City',
    studentIdINo: 'ST123456',
    registrationNo: 'REG789123'
  });

  const [editMode, setEditMode] = useState({});

  const handleEditClick = (field) => {
    setEditMode(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e, field) => {
    setProfileData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handlePasswordChange = (e, field) => {
    setPasswordFields(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleChangePassword = () => {
    console.log('Password changed:', passwordFields);
    alert('Password changed successfully!');
  };

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
        {/* Left Side - Profile Info */}
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            {/* Profile Card */}
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

            {/* Password Change Card */}
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
          </Stack>
        </Grid>

        {/* Right Side - Details */}
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