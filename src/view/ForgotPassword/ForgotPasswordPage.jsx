import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import COLORS from '../../utils/Colors'
import { BlueButton } from '../../utils/CommonStyle'
import OTPInput from '../../components/forgotPassowrd/OTPInput'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const ForgotPasswordPage = () => {
    const [changeContent, setChangeContent] = useState('first');
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const handleMouseUpPassword = (event) => {
      event.preventDefault();
    };
    return (
        <Box sx={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: COLORS.bgBlue
        }}>
            <Box sx={{
                width: { xs: '80%', md: '20%' },
                bgcolor: COLORS.white,
                borderRadius: '20px',
                boxShadow: 3,
                py: 2,
                px: 4
            }}>
                <Typography sx={{
                    fontSize: { xs: '18px', md: '20px' },
                    fontWeight: 700,
                }}>
                    Forgot Password
                </Typography>
                {changeContent === 'first' && (
                    <Box>
                        <Typography sx={{
                            fontSize: { xs: '12px', md: '15px' },
                            fontWeight: 500,
                            textAlign: 'start',
                            mt: 5
                        }}>
                            Enter your email to send OTP
                        </Typography>
                        <TextField id="outlined-basic" label="Email" variant="outlined" sx={{ width: '100%', mt: 2, mb: 4 }} />
                        <BlueButton onClick={() => setChangeContent('second')}>Send</BlueButton>
                    </Box>
                )}
                {changeContent === 'second' && (
                    <Box>
                        <Typography sx={{
                            fontSize: { xs: '12px', md: '15px' },
                            fontWeight: 500,
                            textAlign: 'start',
                            mt: 5,
                            mb: 2
                        }}>
                            OTP sent to vidush***@gmail.com
                        </Typography>
                        <Box sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            mb: 4
                        }}>
                            <OTPInput />
                        </Box>
                        <BlueButton onClick={() => setChangeContent('third')}>Confirm</BlueButton>
                    </Box>
                )}

                {changeContent === 'third' && (
                    <Box>
                        <Typography sx={{
                            fontSize: { xs: '12px', md: '15px' },
                            fontWeight: 500,
                            textAlign: 'start',
                            mt: 5,
                            mb: 2
                        }}>
                            Enter your new password ..!
                        </Typography>
                        <Box sx={{mb:4}}>
                        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
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
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
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
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
          />
        </FormControl>
                        </Box>
                        <BlueButton>Submit</BlueButton>
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default ForgotPasswordPage