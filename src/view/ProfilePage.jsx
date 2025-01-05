import React, { useState } from 'react';
import { Box, Card, CardContent, Avatar, Typography, Grid, Divider, Paper, Stack, TextField, IconButton, Button } from '@mui/material';
import { Edit } from '@mui/icons-material';
import COLORS from '../utils/Colors';
import profileImg from '../assets/profileImg.png';

const ProfilePage = () => {
    const [passwordFields, setPasswordFields] = useState({
        currentPassword: '',
        newPassword: '',
    });
    const [profileData, setProfileData] = useState({
        profileImage: profileImg,
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

    const [editMode, setEditMode] = useState({
        name: false,
        email: false,
        accountType: false,
        batch: false,
        classType: false,
        whatsAppNo: false,
        additionalNo: false,
        district: false,
        scl: false,
        address: false,
    });

    const handleEditClick = (field) => {
        setEditMode(prevState => ({ ...prevState, [field]: !prevState[field] }));
    };

    const handleChange = (e, field) => {
        setProfileData(prevState => ({ ...prevState, [field]: e.target.value }));
    };

    const {
        name,
        profileImage,
        email,
        accountType,
        accountState,
        batch,
        classType,
        whatsAppNo,
        additionalNo,
        district,
        scl,
        address,
        studentIdINo,
        registrationNo
    } = profileData;
    const handlePasswordChange = (e, field) => {
        setPasswordFields(prevState => ({ ...prevState, [field]: e.target.value }));
    };

    const handleChangePassword = () => {

        console.log('Password changed:', passwordFields);
        alert('Password changed successfully!');
    };

    return (
        <Box sx={{
            display: 'flex',
            width: '100%',
            minHeight: '75vh',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Stack direction={{ xs: 'column', md: 'row' }} sx={{
                boxShadow: 5,
                borderRadius: '20px',
                width: { xs: '80%', md: '70%' }
            }}>

                <Box sx={{
                    width: { xs: '100%', md: '30%' },
                    bgcolor: COLORS.bgBlue,
                    padding: 2
                }}>
                    <Box sx={{
                        width: '100%',
                        justifyContent: 'center',
                        display: 'flex'
                    }}>
                        <Avatar src={profileImage} sx={{
                            width: { xs: '100px', md: '200px' },
                            height: { xs: '100px', md: '200px' }
                        }} />
                    </Box>
                    <Typography variant="h6" sx={{ color: COLORS.white, textAlign: 'center', marginTop: 2 }}>
                        {name}
                    </Typography>
                    <Typography variant="h6" sx={{ color: COLORS.white, textAlign: 'center' }}>
                        {registrationNo}
                    </Typography>


                    <Box sx={{ marginTop: 3 }}>
                        <TextField
                            label="Current Password"
                            fullWidth
                            type="password"
                            value={passwordFields.currentPassword}
                            onChange={(e) => handlePasswordChange(e, 'currentPassword')}
                            sx={{
                                marginBottom: 2,
                                '& .MuiInputBase-root': {
                                    color: 'white',
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'white',
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white',
                                },
                                '& .MuiOutlinedInput-root': {
                                    borderColor: 'white',
                                }
                            }}
                        />
                        <TextField
                            label="New Password"
                            fullWidth
                            type="password"
                            value={passwordFields.newPassword}
                            onChange={(e) => handlePasswordChange(e, 'newPassword')}
                            sx={{
                                marginBottom: 2,
                                '& .MuiInputBase-root': {
                                    color: 'white',
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'white',
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white',
                                },
                                '& .MuiOutlinedInput-root': {
                                    borderColor: 'white',
                                }
                            }}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleChangePassword}
                        >
                            Change Password
                        </Button>
                    </Box>
                </Box>


                <Box sx={{
                    width: { xs: '100%', md: '65%' },
                    padding: 2
                }}>
                    <TextField
                        label="Name"
                        fullWidth
                        value={name}
                        onChange={(e) => handleChange(e, 'name')}
                        disabled={!editMode.name}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={() => handleEditClick('name')}>
                                    <Edit />
                                </IconButton>
                            ),
                        }}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        value={email}
                        onChange={(e) => handleChange(e, 'email')}
                        disabled={!editMode.email}
                        sx={{ marginTop: 2 }}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={() => handleEditClick('email')}>
                                    <Edit />
                                </IconButton>
                            ),
                        }}
                    />
                    <TextField
                        label="Account Type"
                        fullWidth
                        value={accountType}
                        onChange={(e) => handleChange(e, 'accountType')}
                        disabled={!editMode.accountType}
                        sx={{ marginTop: 2 }}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={() => handleEditClick('accountType')}>
                                    <Edit />
                                </IconButton>
                            ),
                        }}
                    />
                    <TextField
                        label="Batch"
                        fullWidth
                        value={batch}
                        onChange={(e) => handleChange(e, 'batch')}
                        disabled={!editMode.batch}
                        sx={{ marginTop: 2 }}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={() => handleEditClick('batch')}>
                                    <Edit />
                                </IconButton>
                            ),
                        }}
                    />
                    <TextField
                        label="Class Type"
                        fullWidth
                        value={classType}
                        onChange={(e) => handleChange(e, 'classType')}
                        disabled={!editMode.classType}
                        sx={{ marginTop: 2 }}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={() => handleEditClick('classType')}>
                                    <Edit />
                                </IconButton>
                            ),
                        }}
                    />
                    <TextField
                        label="WhatsApp No"
                        fullWidth
                        value={whatsAppNo}
                        onChange={(e) => handleChange(e, 'whatsAppNo')}
                        disabled={!editMode.whatsAppNo}
                        sx={{ marginTop: 2 }}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={() => handleEditClick('whatsAppNo')}>
                                    <Edit />
                                </IconButton>
                            ),
                        }}
                    />
                    <TextField
                        label="Additional No"
                        fullWidth
                        value={additionalNo}
                        onChange={(e) => handleChange(e, 'additionalNo')}
                        disabled={!editMode.additionalNo}
                        sx={{ marginTop: 2 }}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={() => handleEditClick('additionalNo')}>
                                    <Edit />
                                </IconButton>
                            ),
                        }}
                    />
                    <TextField
                        label="District"
                        fullWidth
                        value={district}
                        onChange={(e) => handleChange(e, 'district')}
                        disabled={!editMode.district}
                        sx={{ marginTop: 2 }}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={() => handleEditClick('district')}>
                                    <Edit />
                                </IconButton>
                            ),
                        }}
                    />
                    <TextField
                        label="School"
                        fullWidth
                        value={scl}
                        onChange={(e) => handleChange(e, 'scl')}
                        disabled={!editMode.scl}
                        sx={{ marginTop: 2 }}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={() => handleEditClick('scl')}>
                                    <Edit />
                                </IconButton>
                            ),
                        }}
                    />
                    <TextField
                        label="Address"
                        fullWidth
                        value={address}
                        onChange={(e) => handleChange(e, 'address')}
                        disabled={!editMode.address}
                        sx={{ marginTop: 2 }}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={() => handleEditClick('address')}>
                                    <Edit />
                                </IconButton>
                            ),
                        }}
                    />
                </Box>
            </Stack>
        </Box>
    );
};

export default ProfilePage;
