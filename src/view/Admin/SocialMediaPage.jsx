import React, { useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  TextField,
  Button,
  MenuItem,
  Typography,
  Card,
  CardContent,
  IconButton,
  Grid,
  Paper,
  Chip,
  Fade,
  Grow,
} from "@mui/material";
import { Delete, Edit, Send, Image, Message, PhotoCamera } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Api from "../../utils/Api";

export default function SocialMediaUI() {
  const [tab, setTab] = useState(0);
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({
    message: "",
    link: "",
    batch: "",
    region: "Indian",
    classType: "Theory",
  });
  const [bannerImages, setBannerImages] = useState([]);

  const token = localStorage.getItem('token');

  const handleTabChange = (event, newValue) => setTab(newValue);

  // Handle message form submit
  const handleSendMessage = async() => {
    console.log(formData)
    if (formData.message.trim()) {
      setMessages([...messages, { ...formData, id: Date.now() }]);

    }

    const response = await axios.post(Api + 'messages/message/send', formData,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    });

    console.log(response);

    if(response.data.code === 200){
      setFormData({
        message: "",
        link: "",
        batch: "",
        region: "Indian",
        classType: "Theory",
      });
    }

  };

  const fetchMsg = async() => {
    const response = await axios.get(Api + 'messages/message/get-all',{
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })

    console.log('all msg', response);

    if(response.data.code === 200){
      setMessages(response.data.data);
    }
  }

  const handleDeleteMsg = async(id) => {
    console.log(id)
    const response = await axios.delete(Api + 'messages/message/delete/'+ id,{
      headers:{
        'Authorization': `Bearer ${token}`,
      }
    })
    console.log(response);

    if(response.data.code === 200){
      setMessages(messages.filter((m)=> m._id !== id))
    }
  }

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (bannerImages.length + files.length <= 3) {
      setBannerImages([...bannerImages, ...files]);
    }
  };

  // Handle image delete
  const handleImageDelete = (index) => {
    const updated = bannerImages.filter((_, i) => i !== index);
    setBannerImages(updated);
  };

  const glassCardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  };

  useEffect(()=> {
    fetchMsg();
  },[])

  const inputStyle = {
    '& .MuiOutlinedInput-root': {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: 2,
      '& fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.3)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.5)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
        borderWidth: 2,
      },
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(255, 255, 255, 0.8)',
      fontWeight: 500,
      '&.Mui-focused': {
        color: 'white',
      }, 
    },
    '& .MuiInputBase-input': {
      color: 'white',
      fontSize: '1rem',
    },
    '& .MuiSvgIcon-root': {
      color: 'rgba(255, 255, 255, 0.8)',
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: 'linear-gradient(180deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        p: { xs: 2, sm: 3 },
      }}
    >
      {/* Header */}
      <Fade in timeout={800}>
        <Paper
          elevation={0}
          sx={{
            ...glassCardStyle,
            p: { xs: 3, sm: 4 },
            mb: 3,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(45deg, #ffffff 30%, #f0f0f0 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              mb: 1,
              fontSize: { xs: '2rem', sm: '3rem' },
            }}
          >
            Social Media Manager
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: 400,
              letterSpacing: 1,
            }}
          >
            Create and manage your social content ✨
          </Typography>
        </Paper>
      </Fade>

      {/* Tabs */}
      <Grow in timeout={1000}>
        <Paper
          elevation={0}
          sx={{
            ...glassCardStyle,
            mb: 3,
            overflow: 'hidden',
          }}
        >
          <Tabs
            value={tab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1.1rem',
                py: 2,
                '&.Mui-selected': {
                  color: 'white',
                  background: 'rgba(255, 255, 255, 0.1)',
                },
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.05)',
                },
                transition: 'all 0.3s ease',
              },
              '& .MuiTabs-indicator': {
                background: 'linear-gradient(45deg, #ffffff 30%, #f0f0f0 90%)',
                height: 4,
                borderRadius: 2,
              },
            }}
          >
            <Tab 
              icon={<Message sx={{ mr: 1 }} />} 
              iconPosition="start" 
              label="Messages" 
            />
            <Tab 
              icon={<PhotoCamera sx={{ mr: 1 }} />} 
              iconPosition="start" 
              label="Banners" 
            />
          </Tabs>
        </Paper>
      </Grow>

      {/* MESSAGE TAB */}
      {tab === 0 && (
        <Box>
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Paper
              elevation={0}
              sx={{
                ...glassCardStyle,
                p: 4,
                mb: 4,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: 'white',
                  mb: 3,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Message />
                Create New Message
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message Content"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="What's on your mind? Share your thoughts..."
                    sx={inputStyle}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Link URL"
                    value={formData.link}
                    onChange={(e) =>
                      setFormData({ ...formData, link: e.target.value })
                    }
                    placeholder="https://example.com"
                    sx={inputStyle}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Batch Name"
                    value={formData.batch}
                    onChange={(e) =>
                      setFormData({ ...formData, batch: e.target.value })
                    }
                    placeholder="Enter batch identifier"
                    sx={inputStyle}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="Target Region"
                    value={formData.region}
                    onChange={(e) =>
                      setFormData({ ...formData, region: e.target.value })
                    }
                    sx={inputStyle}
                  >
                    <MenuItem value="Indian">🇮🇳 Indian</MenuItem>
                    <MenuItem value="Europe">🇪🇺 Europe</MenuItem>
                  </TextField>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="Class Type"
                    value={formData.classType}
                    onChange={(e) =>
                      setFormData({ ...formData, classType: e.target.value })
                    }
                    sx={inputStyle}
                  >
                    <MenuItem value="Theory">📚 Theory</MenuItem>
                    <MenuItem value="Revision">🔄 Revision</MenuItem>
                  </TextField>
                </Grid>
              </Grid>

              <Box mt={4} display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Send />}
                  onClick={handleSendMessage}
                  disabled={!formData.message.trim()}
                  sx={{
                    background: formData.message.trim() 
                      ? 'linear-gradient(45deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)'
                      : 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: formData.message.trim() ? 'white' : 'rgba(255, 255, 255, 0.5)',
                    fontWeight: 700,
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                    '&:hover': {
                      background: formData.message.trim() 
                        ? 'linear-gradient(45deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.25) 100%)'
                        : 'rgba(255, 255, 255, 0.05)',
                      transform: formData.message.trim() ? 'translateY(-3px)' : 'none',
                      boxShadow: formData.message.trim() ? '0 12px 40px rgba(0, 0, 0, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.15)',
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  Send Message
                </Button>
              </Box>
            </Paper>
          </motion.div>

          {/* Sent messages */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Typography
              variant="h5"
              sx={{
                color: 'white',
                mb: 3,
                fontWeight: 700,
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              Sent Messages
              <Chip
                label={messages.length}
                size="small"
                sx={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontWeight: 600,
                }}
              />
            </Typography>
            
            <AnimatePresence>
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: -50, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 50, scale: 0.9 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100 
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <Card
                    sx={{
                      mb: 3,
                      ...glassCardStyle,
                      background: 'rgba(255, 255, 255, 0.12)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
                        background: 'rgba(255, 255, 255, 0.18)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                        <Box flex={1}>
                          <Typography
                            variant="h6"
                            sx={{
                              color: 'white',
                              mb: 2,
                              lineHeight: 1.6,
                              fontWeight: 500,
                            }}
                          >
                            {msg.message}
                          </Typography>
                          
                          {msg.link && (
                            <Box
                              sx={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: 2,
                                p: 2,
                                mb: 2,
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  color: 'rgba(255, 255, 255, 0.9)',
                                  wordBreak: 'break-all',
                                  fontFamily: 'monospace',
                                }}
                              >
                                🔗 {msg.link}
                              </Typography>
                            </Box>
                          )}
                          
                          <Box display="flex" gap={1} flexWrap="wrap">
                            {msg.batch && (
                              <Chip
                                label={`📚 ${msg.batch}`}
                                size="small"
                                sx={{
                                  background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
                                  color: 'white',
                                  fontWeight: 600,
                                  border: '1px solid rgba(255, 255, 255, 0.2)',
                                  '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.25)',
                                  },
                                }}
                              />
                            )}
                            <Chip
                              label={`🌍 ${msg.region}`}
                              size="small"
                              sx={{
                                background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
                                color: 'white',
                                fontWeight: 600,
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                '&:hover': {
                                  background: 'rgba(255, 255, 255, 0.25)',
                                },
                              }}
                            />
                            <Chip
                              label={`📖 ${msg.classType}`}
                              size="small"
                              sx={{
                                background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
                                color: 'white',
                                fontWeight: 600,
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                '&:hover': {
                                  background: 'rgba(255, 255, 255, 0.25)',
                                },
                              }}
                            />
                          </Box>
                        </Box>
                        
                        <Box display="flex" gap={1} ml={2} flexDirection="column">
                          <IconButton
                            size="small"
                            sx={{
                              color: 'rgba(255, 255, 255, 0.8)',
                              background: 'rgba(255, 255, 255, 0.1)',
                              backdropFilter: 'blur(10px)',
                              border: '1px solid rgba(255, 255, 255, 0.2)',
                              '&:hover': {
                                background: 'rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                transform: 'scale(1.1)',
                              },
                              transition: 'all 0.2s ease',
                            }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleDeleteMsg(msg._id)
                              
                            }
                            sx={{
                              color: 'rgba(255, 120, 120, 0.8)',
                              background: 'rgba(255, 120, 120, 0.1)',
                              backdropFilter: 'blur(10px)',
                              border: '1px solid rgba(255, 120, 120, 0.2)',
                              '&:hover': {
                                background: 'rgba(255, 120, 120, 0.2)',
                                color: '#ff7878',
                                transform: 'scale(1.1)',
                              },
                              transition: 'all 0.2s ease',
                            }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {messages.length === 0 && (
              <Fade in timeout={1200}>
                <Paper
                  sx={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 3,
                    p: 6,
                    textAlign: 'center',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontStyle: 'italic',
                      mb: 1,
                    }}
                  >
                    No messages yet
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.5)',
                    }}
                  >
                    Create your first message above to get started! ✨
                  </Typography>
                </Paper>
              </Fade>
            )}
          </motion.div>
        </Box>
      )}

      {/* BANNER TAB */}
      {tab === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={0}
            sx={{
              ...glassCardStyle,
              p: 4,
              mb: 3,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: 'white',
                mb: 3,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <PhotoCamera />
              Banner Management
            </Typography>
            
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Button
                variant="contained"
                component="label"
                startIcon={<Image />}
                size="large"
                sx={{
                  background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  fontWeight: 700,
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: 'none',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.25) 100%)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                Upload Images
                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
              
              <Chip
                label={`${bannerImages.length}/3 images`}
                sx={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                }}
              />
            </Box>

            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                display: 'block',
              }}
            >
              💡 Upload up to 3 high-quality images for your banner carousel
            </Typography>
          </Paper>

          {/* Preview Gallery */}
          {bannerImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Paper
                elevation={0}
                sx={{
                  ...glassCardStyle,
                  p: 4,
                  mb: 3,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: 'white',
                    mb: 3,
                    fontWeight: 700,
                  }}
                >
                  🎨 Preview Gallery
                </Typography>
                
                <Box
                  sx={{
                    display: 'flex',
                    gap: 3,
                    overflowX: 'auto',
                    pb: 2,
                    '&::-webkit-scrollbar': {
                      height: 8,
                    },
                    '&::-webkit-scrollbar-track': {
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: 4,
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: 'rgba(255, 255, 255, 0.3)',
                      borderRadius: 4,
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.5)',
                      },
                    },
                  }}
                >
                  <AnimatePresence>
                    {bannerImages.map((img, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        exit={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                        whileHover={{ scale: 1.05, rotateY: 5 }}
                        transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
                      >
                        <Box
                          sx={{
                            position: 'relative',
                            minWidth: 280,
                            height: 200,
                            borderRadius: 4,
                            overflow: 'hidden',
                            boxShadow: '0 15px 50px rgba(0, 0, 0, 0.3)',
                            border: '2px solid rgba(255, 255, 255, 0.2)',
                            background: 'rgba(255, 255, 255, 0.05)',
                          }}
                        >
                          <img
                            src={URL.createObjectURL(img)}
                            alt="preview"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                          
                          {/* Gradient Overlay */}
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.4) 100%)',
                            }}
                          />
                          
                          {/* Delete Button */}
                          <IconButton
                            size="small"
                            sx={{
                              position: "absolute",
                              top: 16,
                              right: 16,
                              background: 'rgba(255, 60, 60, 0.9)',
                              backdropFilter: 'blur(10px)',
                              color: 'white',
                              width: 40,
                              height: 40,
                              border: '2px solid rgba(255, 255, 255, 0.3)',
                              '&:hover': {
                                background: 'rgba(255, 60, 60, 1)',
                                transform: 'scale(1.15) rotate(5deg)',
                                boxShadow: '0 8px 25px rgba(255, 60, 60, 0.4)',
                              },
                              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            }}
                            onClick={() => handleImageDelete(idx)}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                          
                          {/* Image Counter */}
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: 16,
                              left: 16,
                              background: 'rgba(0, 0, 0, 0.7)',
                              backdropFilter: 'blur(15px)',
                              px: 3,
                              py: 1.5,
                              borderRadius: 3,
                              border: '1px solid rgba(255, 255, 255, 0.2)',
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{
                                color: 'white',
                                fontWeight: 700,
                                fontSize: '0.9rem',
                              }}
                            >
                              Image {idx + 1}
                            </Typography>
                          </Box>
                        </Box>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </Box>
              </Paper>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Box display="flex" justifyContent="center">
              <Button
                variant="contained"
                size="large"
                startIcon={<Send />}
                disabled={bannerImages.length === 0}
                sx={{
                  background: bannerImages.length > 0 
                    ? 'linear-gradient(45deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)'
                    : 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: bannerImages.length > 0 ? 'white' : 'rgba(255, 255, 255, 0.5)',
                  fontWeight: 700,
                  px: 6,
                  py: 2,
                  borderRadius: 4,
                  textTransform: 'none',
                  fontSize: '1.2rem',
                  boxShadow: bannerImages.length > 0 ? '0 8px 32px rgba(0, 0, 0, 0.15)' : 'none',
                  '&:hover': {
                    background: bannerImages.length > 0 
                      ? 'linear-gradient(45deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.25) 100%)'
                      : 'rgba(255, 255, 255, 0.05)',
                    transform: bannerImages.length > 0 ? 'translateY(-4px)' : 'none',
                    boxShadow: bannerImages.length > 0 ? '0 12px 40px rgba(0, 0, 0, 0.2)' : 'none',
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                Post Banner Campaign
              </Button>
            </Box>
          </motion.div>

          {bannerImages.length === 0 && (
            <Fade in timeout={1000}>
              <Paper
                sx={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 3,
                  p: 6,
                  textAlign: 'center',
                  mt: 2,
                }}
              >
                <PhotoCamera 
                  sx={{ 
                    fontSize: 48, 
                    color: 'rgba(255, 255, 255, 0.4)', 
                    mb: 2 
                  }} 
                />
                <Typography
                  variant="h6"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontStyle: 'italic',
                    mb: 1,
                  }}
                >
                  No banner images uploaded
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.5)',
                  }}
                >
                  Upload some beautiful images to create your banner carousel! 🎨
                </Typography>
              </Paper>
            </Fade>
          )}
        </motion.div>
      )}
    </Box>
  );
}