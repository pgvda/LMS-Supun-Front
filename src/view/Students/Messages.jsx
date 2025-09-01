import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Avatar,
  IconButton,
  Fade,
  Skeleton,
  Link,
  Divider,
  Container,
} from '@mui/material';
import {
  LocationOn,
  School,
  Link as LinkIcon,
  AccessTime,
  Visibility,
  Language,
  MenuBook,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Api from '../../utils/Api'



const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messageData, setMessagedata] = useState([]);

  const classType = localStorage.getItem('classType');
  const historyType = localStorage.getItem('historyType');
  const batch = localStorage.getItem('batch');
  const accountType = localStorage.getItem('accountType');
  const token = localStorage.getItem('token');

  const fetchMessage = async() => {
    try {
      if (accountType === 'admin') {
        const response = await axios.get(Api + 'messages/message/get-all', {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        console.log(response);
        if (response.data.code === 200) {
          setMessages(response.data.data);
          setLoading(false);
        }
      }

      if (accountType === 'user') {
        const response = await axios.get(Api + 'messages/message/get-by-batch/' + batch + '/' + historyType + '/' + classType, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        console.log(response);
        if (response.data.code === 200) {
          setMessages(response.data.data);
          setLoading(false);
        }
      }


    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchMessage();
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return `${Math.floor(diffInHours / 24)}d ago`;
    }
  };

  const getRegionIcon = (region) => {
    return region === 'India' ? '🇮🇳' : region === 'Europe' ? '🇪🇺' : '🌍';
  };

  const getClassTypeIcon = (classType) => {
    return classType === 'Theory' ? '📚' : classType === 'Revision' ? '🔄' : '📖';
  };

  const glassCardStyle = {
    background: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(180deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          py: 4,
        }}
      >
        <Container maxWidth="md">
          <Box mb={4}>
            <Skeleton 
              variant="rectangular" 
              height={80} 
              sx={{ 
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.1)',
              }} 
            />
          </Box>
          {[1, 2, 3].map((item) => (
            <Box key={item} mb={3}>
              <Skeleton 
                variant="rectangular" 
                height={200} 
                sx={{ 
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.1)',
                }} 
              />
            </Box>
          ))}
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card
            sx={{
              ...glassCardStyle,
              mb: 4,
              p: 4,
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
                fontSize: { xs: '2rem', sm: '2.5rem' },
              }}
            >
              📬 Messages
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 400,
              }}
            >
              Stay updated with the latest announcements
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                mt: 2,
                flexWrap: 'wrap',
              }}
            >
              <Chip
                label={`${messages.length} Messages`}
                sx={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontWeight: 600,
                }}
              />
              <Chip
                label="Live Updates"
                sx={{
                  background: 'rgba(76, 175, 80, 0.3)',
                  color: 'white',
                  fontWeight: 600,
                  '&::before': {
                    content: '"●"',
                    color: '#4CAF50',
                    marginRight: '4px',
                    animation: 'blink 2s infinite',
                  },
                }}
              />
            </Box>
          </Card>
        </motion.div>

        {/* Messages List */}
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Card
                sx={{
                  ...glassCardStyle,
                  mb: 3,
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
                    background: 'rgba(255, 255, 255, 0.18)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                  },
                }}
              >
                {/* Gradient Line */}
                <Box
                  sx={{
                    height: 4,
                    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                  }}
                />

                <CardContent sx={{ p: 4 }}>
                  {/* Header Section */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      mb: 3,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        sx={{
                          background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
                          color: 'white',
                          fontWeight: 600,
                          border: '2px solid rgba(255, 255, 255, 0.2)',
                        }}
                      >
                        {'Class Admin'.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: 'white',
                            fontWeight: 600,
                          }}
                        >
                          Class Admin
                        </Typography>
                        {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <AccessTime sx={{ fontSize: 16, color: 'rgba(255, 255, 255, 0.7)' }} />
                          <Typography
                            variant="caption"
                            sx={{
                              color: 'rgba(255, 255, 255, 0.7)',
                              fontWeight: 500,
                            }}
                          >
                            {formatTimestamp(msg.timestamp)}
                          </Typography>
                        </Box> */}
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Visibility sx={{ fontSize: 16, color: 'rgba(255, 255, 255, 0.6)' }} />
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.6)',
                          fontWeight: 500,
                        }}
                      >
                        {msg.views}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Message Content */}
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'white',
                      lineHeight: 1.7,
                      fontSize: '1.1rem',
                      mb: 3,
                      fontWeight: 400,
                    }}
                  >
                    {msg.message}
                  </Typography>

                  {/* Link Section */}
                  {msg.link && (
                    <Box
                      sx={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: 2,
                        p: 3,
                        mb: 3,
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.15)',
                          transform: 'translateX(4px)',
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <LinkIcon sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 20 }} />
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontWeight: 600,
                          }}
                        >
                          Resource Link
                        </Typography>
                      </Box>
                      <Link
                        href={msg.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.9)',
                          textDecoration: 'none',
                          wordBreak: 'break-all',
                          fontFamily: 'monospace',
                          fontSize: '0.9rem',
                          '&:hover': {
                            color: 'white',
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        {msg.link}
                      </Link>
                    </Box>
                  )}

                  <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', mb: 3 }} />

                  {/* Tags Section */}
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Chip
                      icon={<LocationOn sx={{ fontSize: 18 }} />}
                      label={`${getRegionIcon(msg.region)} ${msg.region}`}
                      sx={{
                        background: 'linear-gradient(45deg, rgba(33, 150, 243, 0.3) 0%, rgba(33, 150, 243, 0.2) 100%)',
                        color: 'white',
                        fontWeight: 600,
                        border: '1px solid rgba(33, 150, 243, 0.3)',
                        '& .MuiChip-icon': {
                          color: 'rgba(255, 255, 255, 0.9)',
                        },
                        '&:hover': {
                          background: 'rgba(33, 150, 243, 0.4)',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    />

                    <Chip
                      icon={<MenuBook sx={{ fontSize: 18 }} />}
                      label={`${getClassTypeIcon(msg.classType)} ${msg.classType}`}
                      sx={{
                        background: 'linear-gradient(45deg, rgba(156, 39, 176, 0.3) 0%, rgba(156, 39, 176, 0.2) 100%)',
                        color: 'white',
                        fontWeight: 600,
                        border: '1px solid rgba(156, 39, 176, 0.3)',
                        '& .MuiChip-icon': {
                          color: 'rgba(255, 255, 255, 0.9)',
                        },
                        '&:hover': {
                          background: 'rgba(156, 39, 176, 0.4)',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    />

                    <Box sx={{ flexGrow: 1 }} />

                    <IconButton
                      size="small"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.6)',
                        '&:hover': {
                          color: 'white',
                          background: 'rgba(255, 255, 255, 0.1)',
                        },
                      }}
                    >
                      <Language fontSize="small" />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State */}
        {messages.length === 0 && !loading && (
          <Fade in timeout={1000}>
            <Card
              sx={{
                ...glassCardStyle,
                p: 6,
                textAlign: 'center',
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  mb: 2,
                  fontSize: '3rem',
                }}
              >
                📭
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  mb: 1,
                  fontWeight: 600,
                }}
              >
                No messages yet
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.6)',
                }}
              >
                Check back later for new announcements and updates!
              </Typography>
            </Card>
          </Fade>
        )}
      </Container>

      {/* Add CSS keyframes for blinking animation */}
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.3; }
        }
      `}</style>
    </Box>
  );
};

export default Messages;