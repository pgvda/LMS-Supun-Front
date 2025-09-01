import { 
  Box, 
  Button, 
  FormControl, 
  IconButton, 
  Input, 
  InputAdornment, 
  InputLabel, 
  Stack, 
  TextField, 
  Typography,
  Paper,
  Avatar,
  Divider,
  Fade,
  Slide,
  Chip,
  alpha
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import COLORS from '../../utils/Colors';
import initAdd from '../../assets/initAdd.jpg';
import logo from '../../assets/logo.jpg';
import { 
  Visibility, 
  VisibilityOff, 
  Email, 
  Lock, 
  Login,
  Google,
  Facebook,
  School,
  Security,
  Speed,
  Support,
  AutoAwesome
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Api from '../../utils/Api';
import axios from 'axios';
import Swal from 'sweetalert2';
import banner1 from '../../assets/banner1.jpg';
import banner2 from '../../assets/banner2.png';
import banner3 from '../../assets/banner3.png';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

// const data = [banner1, banner2, banner3];

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
        slidesToSlide: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
        slidesToSlide: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1,
    }
};

// Floating shapes component
const FloatingShapes = () => {
  return (
    <Box sx={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', zIndex: 0 }}>
      {[...Array(6)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: { xs: 60, md: 100 },
            height: { xs: 60, md: 100 },
            background: alpha('#ffffff', 0.1),
            borderRadius: '50%',
            backdropFilter: 'blur(20px)',
            animation: `float${i} ${6 + i}s ease-in-out infinite`,
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 90}%`,
            '@keyframes float0': {
              '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
              '50%': { transform: 'translateY(-30px) rotate(180deg)' }
            },
            '@keyframes float1': {
              '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
              '50%': { transform: 'translateY(-40px) rotate(-180deg)' }
            },
            '@keyframes float2': {
              '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
              '50%': { transform: 'translateY(-25px) rotate(90deg)' }
            },
            '@keyframes float3': {
              '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
              '50%': { transform: 'translateY(-35px) rotate(-90deg)' }
            },
            '@keyframes float4': {
              '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
              '50%': { transform: 'translateY(-20px) rotate(270deg)' }
            },
            '@keyframes float5': {
              '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
              '50%': { transform: 'translateY(-45px) rotate(-270deg)' }
            }
          }}
        />
      ))}
    </Box>
  );
};

const LoginPage = () => {
    const [advaticement, setadvaticement] = useState(initAdd);
    const [showPassword, setShowPassword] = React.useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [imgData, setImgData] = useState([]);

    const navigate = useNavigate();

    // Auto-rotate carousel


    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const fetchBanner = async () => {
        const response = await axios.get(Api + 'banners/get-url')

        console.log(response);
        if (response.data.code === 200) {
          
            setImgData(response.data.data)


        }
       
    }

    const loginHandle = async () => {
        try {
            console.log(email);
            const response = await axios.post(Api + 'students/student/login', {
                email: email,
                password: password
            });

            if (response.data.code === 200) {
                if (response.data.accountState === 'active') {
                    await Swal.fire({
                        title: "Login Success !",
                        icon: "success",
                        draggable: true,
                        timer: 3000
                    });
                    console.log(response);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('accountType', response.data.accountType);
                    localStorage.setItem('id', response.data.studentId);
                    localStorage.setItem('email', response.data.email);
                    localStorage.setItem('name', response.data.name);
                    localStorage.setItem('classType', response.data.classType);
                    localStorage.setItem('historyType', response.data.historyType);
                    localStorage.setItem('batch', response.data.batch);
                    navigate('/home');
                }

                if (response.data.accountState === 'de-active') {
                    await Swal.fire({
                        title: "Login Fail !",
                        icon: "warning",
                        draggable: true,
                        text: 'Your account is suspended! Contact admin'
                    });
                }
            } else {
                Swal.fire({
                    title: "Invalid Credentials",
                    icon: "error",
                    draggable: true,
                    timer: 3000
                });
            }
        } catch (err) {
            console.error(err);
            Swal.fire({
                title: "Something Went Wrong",
                icon: "warning",
                draggable: true,
                timer: 3000
            });
        }
    };

    const features = [
        { icon: <School />, title: 'Smart Learning', desc: 'AI-powered education' },
        { icon: <Support />, title: '24/7 Support', desc: 'Always here to help' }
    ];

    useEffect(() => {
        fetchBanner();

    }, []);

    useEffect(() => {
  if (imgData.length > 0) {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % imgData.length);
    }, 4000);

    return () => clearInterval(interval); 
  }
}, [imgData]);



    return (
        <Box sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            display: 'flex',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Floating Background Elements */}
            <FloatingShapes />

            <Stack direction={{ xs: 'column', md: 'row' }} sx={{ width: '100%', zIndex: 1 }}>
                {/* Left Panel - Enhanced Hero Section */}
                <Box sx={{
                    flex: { xs: 'none', md: 1.2 },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: { xs: 2, md: 4 },
                    color: 'white',
                    position: 'relative'
                }}>
                    <Fade in timeout={1000}>
                        <Box sx={{ textAlign: 'center', maxWidth: 550 }}>
                            {/* Enhanced Logo */}
                            <Box
                                sx={{
                                    width: 120,
                                    height: 120,
                                    background: alpha('#ffffff', 0.15),
                                    borderRadius: 4,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 3rem',
                                    backdropFilter: 'blur(20px)',
                                    border: `2px solid ${alpha('#ffffff', 0.2)}`,
                                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-10px)',
                                        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.25)'
                                    }
                                }}
                            >
                                <AutoAwesome sx={{ fontSize: '3.5rem', color: 'white' }} />
                            </Box>

                            {/* Hero Title with Gradient */}
                            <Typography
                                variant="h1"
                                sx={{
                                    fontWeight: 800,
                                    mb: 2,
                                    background: 'linear-gradient(45deg, #ffffff 30%, #e0e7ff 70%, #c7d2fe 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                                    lineHeight: 1.1
                                }}
                            >
                                EduPlatform
                            </Typography>

                            <Typography
                                variant="h5"
                                sx={{
                                    opacity: 0.95,
                                    mb: 4,
                                    lineHeight: 1.6,
                                    fontWeight: 400,
                                    fontSize: { xs: '1.1rem', md: '1.4rem' }
                                }}
                            >
                                Transform your learning experience with our cutting-edge educational platform
                            </Typography>

                            {/* Enhanced Carousel */}
                            <Box
                                sx={{
                                    position: 'relative',
                                    width: '100%',
                                    maxWidth: 480,
                                    height: 280,
                                    borderRadius: 4,
                                    overflow: 'hidden',
                                    mb: 4,
                                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
                                    mx: 'auto',
                                    border: `2px solid ${alpha('#ffffff', 0.2)}`,
                                    backdropFilter: 'blur(10px)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.02)',
                                        boxShadow: '0 35px 70px rgba(0, 0, 0, 0.4)'
                                    }
                                }}
                            >
                                <Carousel
                                    swipeable={true}
                                    draggable={true}
                                    showDots={false}
                                    responsive={responsive}
                                    infinite={true}
                                    autoPlay={true}
                                    autoPlaySpeed={3000}
                                    keyBoardControl={true}
                                    customTransition="all 1s"
                                    transitionDuration={1000}
                                    removeArrowOnDeviceType={["tablet", "mobile"]}
                                >
                                    {imgData.map((img, index) => (
                                        <Box key={index} sx={{ position: 'relative' }}>
                                            <img 
                                                src={img} 
                                                alt={`banner-${index + 1}`} 
                                                style={{ 
                                                    width: '100%', 
                                                    height: '280px',
                                                    objectFit: 'cover'
                                                }} 
                                            />
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)'
                                                }}
                                            />
                                        </Box>
                                    ))}
                                </Carousel>
                            </Box>

                            {/* Feature Cards */}
                            <Stack spacing={2} sx={{ display: { xs: 'none', md: 'flex' } }}>
                                {features.map((feature, index) => (
                                    <Fade in timeout={1500 + index * 200} key={index}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2,
                                                p: 2.5,
                                                background: alpha('#ffffff', 0.12),
                                                borderRadius: 3,
                                                backdropFilter: 'blur(20px)',
                                                border: `1px solid ${alpha('#ffffff', 0.15)}`,
                                                transition: 'all 0.4s ease',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    transform: 'translateX(15px)',
                                                    background: alpha('#ffffff', 0.18),
                                                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)'
                                                }
                                            }}
                                        >
                                            <Avatar
                                                sx={{
                                                    bgcolor: alpha('#ffffff', 0.25),
                                                    width: 50,
                                                    height: 50,
                                                    border: `2px solid ${alpha('#ffffff', 0.3)}`
                                                }}
                                            >
                                                {feature.icon}
                                            </Avatar>
                                            <Box sx={{ textAlign: 'left' }}>
                                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                                                    {feature.title}
                                                </Typography>
                                                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                                    {feature.desc}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Fade>
                                ))}
                            </Stack>
                        </Box>
                    </Fade>
                </Box>

                {/* Right Panel - Enhanced Login Form */}
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: { xs: 2, md: 4 }
                }}>
                    <Slide direction="left" in timeout={1000}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: { xs: 3, md: 5 },
                                borderRadius: 5,
                                background: alpha('#ffffff', 0.95),
                                backdropFilter: 'blur(30px)',
                                border: `2px solid ${alpha('#ffffff', 0.3)}`,
                                width: '100%',
                                maxWidth: 480,
                                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.15)',
                                position: 'relative',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: '4px',
                                    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                                    borderRadius: '20px 20px 0 0'
                                }
                            }}
                        >
                            {/* Login Header */}
                            <Box sx={{ textAlign: 'center', mb: 4 }}>
                                <img 
                                    src={logo} 
                                    alt="Logo" 
                                    style={{ 
                                        width: '80px', 
                                        height: '80px', 
                                        borderRadius: '16px',
                                        marginBottom: '1rem',
                                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
                                    }} 
                                />
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontWeight: 800,
                                        color: '#1e293b',
                                        mb: 1,
                                        fontSize: { xs: '2rem', md: '2.5rem' }
                                    }}
                                >
                                    Welcome Back
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#64748b', fontSize: '1.1rem' }}>
                                    Sign in to continue your learning journey
                                </Typography>
                            </Box>

                           

                            {/* Enhanced Login Form */}
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Email sx={{ color: '#667eea' }} />
                                            </InputAdornment>
                                        ),
                                        sx: {
                                            borderRadius: 3,
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderWidth: '2px'
                                            }
                                        }
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '&:hover fieldset': {
                                                borderColor: '#667eea',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#667eea',
                                            },
                                        },
                                        '& .MuiInputLabel-root': {
                                            '&.Mui-focused': {
                                                color: '#667eea',
                                            },
                                        },
                                    }}
                                />

                                <FormControl fullWidth variant="outlined">
                                    <InputLabel sx={{ '&.Mui-focused': { color: '#667eea' } }}>
                                        Password
                                    </InputLabel>
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <Lock sx={{ color: '#667eea' }} />
                                            </InputAdornment>
                                        }
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    onMouseUp={handleMouseUpPassword}
                                                    edge="end"
                                                    sx={{ color: '#667eea' }}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        sx={{
                                            mt: 2,
                                            py: 1,
                                            borderRadius: 3,
                                            '&::before': {
                                                borderBottom: '2px solid rgba(0, 0, 0, 0.1)',
                                            },
                                            '&:hover:not(.Mui-disabled):before': {
                                                borderBottom: '2px solid #667eea',
                                            },
                                            '&::after': {
                                                borderBottom: '2px solid #667eea',
                                            },
                                        }}
                                    />
                                </FormControl>

                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                                    <Button
                                        variant="text"
                                        onClick={() => navigate('/forgotPassword')}
                                        sx={{
                                            textTransform: 'none',
                                            color: '#667eea',
                                            fontSize: '0.9rem',
                                            fontWeight: 600,
                                            '&:hover': { 
                                                backgroundColor: alpha('#667eea', 0.05),
                                                textDecoration: 'underline'
                                            }
                                        }}
                                    >
                                        Forgot Password?
                                    </Button>
                                    <Button
                                        variant="text"
                                        onClick={() => navigate('/register')}
                                        sx={{
                                            textTransform: 'none',
                                            color: '#764ba2',
                                            fontSize: '0.9rem',
                                            fontWeight: 600,
                                            '&:hover': { 
                                                backgroundColor: alpha('#764ba2', 0.05),
                                                textDecoration: 'underline'
                                            }
                                        }}
                                    >
                                        Sign Up
                                    </Button>
                                </Stack>

                                <Button
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    onClick={loginHandle}
                                    startIcon={<Login />}
                                    sx={{
                                        py: 2,
                                        borderRadius: 3,
                                        textTransform: 'none',
                                        fontSize: '1.1rem',
                                        fontWeight: 700,
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                                            boxShadow: '0 15px 45px rgba(102, 126, 234, 0.5)',
                                            transform: 'translateY(-3px)'
                                        },
                                    }}
                                >
                                    Sign In to Account
                                </Button>
                            </Stack>

                            {/* Security Badge */}
                            <Box sx={{ textAlign: 'center', mt: 4 }}>
                                <Chip
                                    icon={<Security />}
                                    label="Protected by enterprise-grade security"
                                    variant="outlined"
                                    sx={{
                                        borderColor: alpha('#10b981', 0.3),
                                        color: '#10b981',
                                        fontSize: '0.8rem'
                                    }}
                                />
                            </Box>
                        </Paper>
                    </Slide>
                </Box>
            </Stack>
        </Box>
    );
};

export default LoginPage;