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
import { Avatar, Button } from '@mui/material';
import COLORS from '../../utils/Colors';
import profile from '../../assets/logo.jpg'
import { Outlet, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
        path:'/devIndicate'
    },
    {
      name:'Profile',
      icon:<AccountCircleIcon/>,
      path:'/profile'
  }
]

const drawerWidth = 320;

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
      <div style={{backgroundColor:COLORS.bgBlue, height:'100%'}}>
        <Toolbar sx={{mt:5}}>
            <Box sx={{
                border:`1px solid ${COLORS.white}`,
                borderRadius:'20px',
                width:'100%',
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                gap:3,
                py:3,
                px:2
            }}>
                <Avatar src={profile} sx={{width:{xs:'20px',md:'60px'},height:{xs:'20px',md:'60px'}}}/>
                <Typography sx={{color:COLORS.white,fontSize:{xs:'20px',md:'24px'}}}>Hi {userName}</Typography>
            </Box>
        </Toolbar>
        <Divider />
            <List>
                {filteredMenu.map((text, index) => (
                    <ListItem key={text} >
                        <ListItemButton
                            sx={{
                                bgcolor: selectedTab === text.name? COLORS.hoverBlue:COLORS.lightBlue,
                                mb: 2,
                                borderRadius: '20px',
                                color: selectedTab === text.name ? COLORS.white : COLORS.black,
                                px:5,
                                ":hover":{
                                    bgcolor:COLORS.hoverBlue,
                                    color:COLORS.white
                                }
                            }}
                            onClick={()=>{navigate(text.path); setSelecetedTab(text.name)}}
                        >
                            <ListItemIcon sx={{
                                color:selectedTab === text.name ? COLORS.white : COLORS.black,
                                ":hover":{
                                    color:COLORS.white
                                }
                                }}>
                                {text.icon}
                            </ListItemIcon>
                            <ListItemText primary={text.name} primaryTypographyProps={{
                                sx: {
                                    fontSize: '20px',
                                    fontWeight:400,

                                }
                            }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Button onClick={handleLogOut}>Log Out</Button>
      </div>
    );
  
    // Remove this const when copying and pasting into your project.
    const container = window !== undefined ? () => window().document.body : undefined;
  
    return (
      <Box sx={{ display: 'flex'}}>
        <CssBaseline />
        <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          display: { sm: 'none' }
        }}
      >
        <Toolbar sx={{
            bgcolor:COLORS.white,
            color:COLORS.bgBlue
        }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            History Class
          </Typography>
        </Toolbar>
      </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }}}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 300 },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth-30 },
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
                    width:  `calc(100% - ${drawerWidth}px)` ,
                }}
            >
                <Toolbar />
                {/* Render the routed content here */}
                <Outlet />
            </Box>
      
      </Box>
    );
}

export default DrawerPage;