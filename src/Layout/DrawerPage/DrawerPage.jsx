import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GridViewIcon from '@mui/icons-material/GridView';
import GroupsIcon from '@mui/icons-material/Groups';
import RuleIcon from '@mui/icons-material/Rule';
import TimelineIcon from '@mui/icons-material/Timeline';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Avatar, Button, Paper, Badge, alpha, Fade } from '@mui/material';
import COLORS from '../../utils/Colors';
import profile from '../../assets/logo.jpg'
import { Outlet, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Logout as LogoutIcon, Notifications as NotificationsIcon, School as SchoolIcon } from '@mui/icons-material';


const drawerMenu = [
    {
        name:'Home',
        icon:<GridViewIcon/>,
        path:'/home'
    },
    {
        name:'Student',
        icon:<GroupsIcon/>,
        path:'/students'
    },
    {
        name:'Marks',
        icon:<RuleIcon/>,
        path:'/devIndicate'
    },
    {
        name:'Annalise',
        icon:<TimelineIcon/>,
        path:'/devIndicate'
    },
    {
        name:'Add Student',
        icon:<PersonAddAltIcon/>,
        path:'/addStudent'
    },
    {
        name:'Social',
        icon:<PersonAddAltIcon/>,
        path:'/social'
    },
    {
      name:'Profile',
      icon:<AccountCircleIcon/>,
      path:'/profile'
  }
]

const drawerWidth = 320;

// Floating background component for visual enhancement
const FloatingElements = () => {
  return (
    <Box sx={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', zIndex: 0 }}>
      {[...Array(4)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: 60,
            height: 60,
            background: alpha('#ffffff', 0.05),
            borderRadius: '50%',
            backdropFilter: 'blur(10px)',
            animation: `float${i} ${8 + i * 2}s ease-in-out infinite`,
            top: `${20 + Math.random() * 60}%`,
            right: `${10 + Math.random() * 80}%`,
            '@keyframes float0': {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-20px)' }
            },
            '@keyframes float1': {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-30px)' }
            },
            '@keyframes float2': {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-15px)' }
            },
            '@keyframes float3': {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-25px)' }
            }
          }}
        />
      ))}
    </Box>
  );
};

const DrawerPage = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const [selectedTab, setSelecetedTab] = React.useState('Home'); 

  
    const userName = localStorage.getItem('name');
    const accountType = localStorage.getItem('accountType');
    const navigate = useNavigate()
  

    const handleDrawerClose = () => {
      setIsClosing(true);
      setMobileOpen(false);
    };
  
    const handleDrawerTransitionEnd = () => {
      setIsClosing(false);
    };
  
    const handleDrawerToggle = () => {
      if (!isClosing) {
        setMobileOpen(!mobileOpen);
      }
    };

    const handleLogOut = () => {
      localStorage.clear();
      navigate('/')
    }

 
    const filteredMenu = drawerMenu.filter(item => 
      accountType === 'admin' || item.name === 'Home' || item.name === 'Profile'
    );
  
    const drawer = (
      <div style={{
        background: 'linear-gradient(180deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        height:'100%',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Add floating background elements */}
        <FloatingElements />
        
        <Toolbar sx={{mt:5, position: 'relative', zIndex: 1}}>
            {/* Enhanced profile section with glassmorphism */}
            <Paper
                elevation={0}
                sx={{
                    background: alpha('#ffffff', 0.15),
                    backdropFilter: 'blur(20px)',
                    border: `2px solid ${alpha('#ffffff', 0.2)}`,
                    borderRadius: 4,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 3,
                    py: 3,
                    px: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        background: alpha('#ffffff', 0.2),
                        transform: 'translateY(-2px)',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
                    }
                }}
            >
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                        <Box
                            sx={{
                                width: 16,
                                height: 16,
                                borderRadius: '50%',
                                backgroundColor: '#26de81',
                                border: '2px solid white',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                            }}
                        />
                    }
                >
                    <Avatar 
                        src={profile} 
                        sx={{
                            width:{xs:'40px',md:'60px'},
                            height:{xs:'40px',md:'60px'},
                            border: '3px solid rgba(255, 255, 255, 0.3)',
                            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
                        }}
                    />
                </Badge>
                <Box>
                    <Typography sx={{
                        color: 'white',
                        fontSize:{xs:'18px',md:'20px'},
                        fontWeight: 700,
                        textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        mb: 0.5
                    }}>
                        Hi {userName}
                    </Typography>
                    <Typography sx={{
                        color: alpha('#ffffff', 0.8),
                        fontSize: '0.9rem',
                        fontWeight: 500
                    }}>
                        {accountType === 'admin' ? 'Administrator' : 'Student'}
                    </Typography>
                </Box>
            </Paper>
        </Toolbar>
        <Divider sx={{ mt: 2, mx: 2, borderColor: alpha('#ffffff', 0.2) }} />
            
           
            <List sx={{ position: 'relative', zIndex: 1, px: 2, mt: 2 }}>
                {filteredMenu.map((text, index) => (
                    <Fade in timeout={300 + index * 100} key={text.name}>
                        <ListItem sx={{ px: 0, mb: 1.5 }}>
                            <ListItemButton
                                sx={{
                                    background: selectedTab === text.name 
                                        ? alpha('#ffffff', 0.2) 
                                        : alpha('#ffffff', 0.08),
                                    backdropFilter: 'blur(20px)',
                                    borderRadius: 3,
                                    border: selectedTab === text.name 
                                        ? `2px solid ${alpha('#ffffff', 0.3)}`
                                        : `1px solid ${alpha('#ffffff', 0.1)}`,
                                    color: selectedTab === text.name ? COLORS.white : alpha('#ffffff', 0.9),
                                    px: 2.5,
                                    py: 1.5,
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    '&:hover': {
                                        background: alpha('#ffffff', 0.2),
                                        color: COLORS.white,
                                        transform: 'translateX(8px)',
                                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                                        '&::before': {
                                            transform: 'translateX(0)'
                                        }
                                    },
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '4px',
                                        height: '100%',
                                        background: 'linear-gradient(45deg, #ffeaa7 30%, #fdcb6e 90%)',
                                        borderRadius: '0 4px 4px 0',
                                        transform: selectedTab === text.name ? 'translateX(0)' : 'translateX(-4px)',
                                        transition: 'transform 0.3s ease'
                                    }
                                }}
                                onClick={()=>{
                                    navigate(text.path); 
                                    setSelecetedTab(text.name) 
                                }}
                            >
                                <ListItemIcon sx={{
                                    color: selectedTab === text.name ? COLORS.white : alpha('#ffffff', 0.9),
                                    minWidth: 40,
                                    '& .MuiSvgIcon-root': {
                                        fontSize: '1.5rem',
                                        filter: selectedTab === text.name 
                                            ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                                            : 'none'
                                    },
                                    transition: 'color 0.3s ease'
                                }}>
                                    {text.icon}
                                </ListItemIcon>
                                <ListItemText primary={text.name} primaryTypographyProps={{
                                    sx: {
                                        fontSize: '1rem',
                                        fontWeight: selectedTab === text.name ? 700 : 500,
                                        textShadow: selectedTab === text.name 
                                            ? '0 1px 2px rgba(0,0,0,0.1)'
                                            : 'none'
                                    }
                                }} />
                            </ListItemButton>
                        </ListItem>
                    </Fade>
                ))}
            </List>
            
            {/*logout button */}
            <Box sx={{ position: 'absolute', bottom: 20, left: 16, right: 16, zIndex: 1 }}>
                <Button 
                    fullWidth
                    startIcon={<LogoutIcon />}
                    onClick={handleLogOut} 
                    sx={{
                        background: alpha('#ffffff', 0.1),
                        backdropFilter: 'blur(20px)',
                        border: `1px solid ${alpha('#ffffff', 0.2)}`,
                        borderRadius: 3,
                        color: 'white',
                        py: 1.5,
                        fontWeight: 600,
                        fontSize: '1rem',
                        textTransform: 'none',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            background: alpha('#e74c3c', 0.2),
                            borderColor: alpha('#e74c3c', 0.3),
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 25px rgba(231, 76, 60, 0.25)'
                        }
                    }}
                >
                    Log Out
                </Button>
            </Box>
      </div>
    );
  
    
    const container = window !== undefined ? () => window().document.body : undefined;
  
    return (
      <Box sx={{ display: 'flex'}}>
        <CssBaseline />
        
        {/* mobile AppBar */}
        <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          display: { sm: 'none' },
          background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle} 
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
            <SchoolIcon sx={{ fontSize: '2rem' }} />
            <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700 }}>
              History Class
            </Typography>
          </Box>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }}}
          aria-label="mailbox folders"
        >
          
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd} 
            onClose={handleDrawerClose} 
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: 300,
                border: 'none'
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth-30,
                border: 'none',
                boxShadow: '4px 0 20px rgba(102, 126, 234, 0.1)'
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

       
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                p: 3,
                width: `calc(100% - ${drawerWidth}px)`,
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                minHeight: '100vh',
                position: 'relative'
            }}
        >

            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.02,
                    background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23667eea' fill-opacity='1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    zIndex: 0
                }}
            />
            
            <Toolbar />
   
            <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Outlet />
            </Box>
        </Box>
      
      </Box>
    );
}

export default DrawerPage;