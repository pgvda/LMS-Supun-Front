import { Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import COLORS from '../../utils/Colors'
import initAdd from '../../assets/initAdd.jpg';
import logo from '../../assets/logo.jpeg';
import { inputBaseClasses } from '@mui/material/InputBase';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Api from '../../utils/Api';
import axios from 'axios';
import Swal from 'sweetalert2';

const LoginPage = () => {
    const [advaticement, setadvaticement] = useState(initAdd);
    const [showPassword, setShowPassword] = React.useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const loginHandle = async() => {
        try{
            console.log(email)
            const response = await axios.post(Api + 'students/student/login',{
                email:email,
                password:password
            })

            if(response.data.code === 200){

                if(response.data.accountState === 'active'){
                    await Swal.fire({
                        title: "Login Success !",
                        icon: "success",
                        draggable: true,
                        timer:3000
                      });
                      localStorage.setItem('token', response.data.token);
                      localStorage.setItem('accountType', response.data.accountType);
                      localStorage.setItem('id', response.data.studentId);
                    navigate('/home');
                }
                
                if(response.data.accountState === 'de-active'){
                    await Swal.fire({
                        title: "Login Fail !",
                        icon: "warning",
                        draggable: true,
                        text:'you account suspended..! Contact admin'
                      });
                }

            }else{
                Swal.fire({
                    title: "Invalid Credential",
                    icon: "error",
                    draggable: true,
                    timer:3000
                  });
            }
            console.log(response)
        }catch(err){
            console.error(err);
            Swal.fire({
                title: "Somthin Went Wrong",
                icon: "warning",
                draggable: true,
                timer:3000
              });

        }
    }

    
    return (
        <Box sx={{
            width: '100%'
        }}>
            <Stack direction={{ xs: 'column', md: 'row' }} sx={{ width: '100%', height: '100vh' }}>
                <Box sx={{
                    bgcolor: COLORS.bgBlue,
                    width: { xs: '100%', md: '60%' },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Box
                        component="img"
                        src={advaticement}
                        alt="Advertisement"
                        sx={{
                            width: '100%',
                            maxWidth: '500px',
                            height: 'auto',
                            borderRadius: '8px',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                            margin: '16px auto',
                            display: 'block',
                            transition: 'transform 0.3s ease-in-out',
                            ":hover": {
                                transform: 'scale(1.1)',
                            },
                        }}
                    />
                </Box>
                <Box sx={{
                    width: { xs: '100%', md: '40%' },
                    display: 'flex',
                    flexDirection:'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        padding: 4,
                        width: '100%',
                        maxWidth: '400px',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                        borderRadius: '8px',
                        bgcolor: '#fff',
                    }}>
                        <img src={logo}/>
                        <TextField
                            id="standard-suffix-shrink"
                            label="e-mail"
                            variant="standard"

                            onChange={(e)=> setEmail(e.target.value)}
                        />

                        <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={
                                                showPassword ? 'hide the password' : 'display the password'
                                            }
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            onMouseUp={handleMouseUpPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                onChange={(e) =>setPassword(e.target.value)}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{
                        display:'flex',
                        flexDirection:'row',
                        width:'70%',
                        justifyContent:'space-between',
                        mt:5
                    }}>
                    <Typography sx={{
                        fontSize:'12px',
                        color:COLORS.lightBlue,
                        fontWeight:700,
                        cursor:'pointer',
                        ":hover":{
                            color:COLORS.bgBlue
                        }
                    }}
                    onClick={()=>navigate('/forgotPassword')}
                    >
                        Forgot Password
                    </Typography>
                    <Typography sx={{
                        fontSize:'12px',
                        color:COLORS.blue1,
                        fontWeight:700,
                        cursor:'pointer'
                    }}
                    onClick={()=>navigate('/register')}
                    >
                        Sign Up
                    </Typography>
                    </Box>
                    <Button sx={{
                        bgcolor:COLORS.bgBlue,
                        width:'225px',
                        color:COLORS.white,
                        borderRadius:'15px',
                        mt:5,
                        ":hover":{
                            bgcolor:COLORS.blue1
                        }
                    }}
                    onClick={()=>loginHandle()}
                    >
                        Log in
                    </Button>

                </Box>
            </Stack>
        </Box>
    )
}

export default LoginPage;
