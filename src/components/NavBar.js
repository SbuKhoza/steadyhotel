import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress for loader
import '@fontsource/righteous';
import { styled } from '@mui/material/styles';

const FullscreenMenu = styled(Menu)(({ theme }) => ({
  width: '100%',
  height: '100%',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  position: 'fixed',
  backgroundColor: theme.palette.background.default,
  zIndex: theme.zIndex.drawer + 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
}));

function NavBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate(); 

  const handleMenuClick = () => {
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleLogin = () => {
    navigate('/LoginSignup'); 
  };

  const handleProfileClick = () => {
    setLoading(true); // Set loading to true
    setTimeout(() => {
      setLoading(false); // Simulate loading time
      navigate('/profile'); // Navigate to profile page
    }, 2000); // Adjust timeout as necessary
  };

  const handleHomeClick = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <>
      <AppBar 
        position="absolute" 
        sx={{ 
          backgroundColor: 'transparent', 
          boxShadow: 'none',  
          zIndex: 10,
          height: '7rem',  // Increased height for AppBar
          transition: 'all 0.3s ease-in-out',
          '&:hover': { 
            backgroundColor: 'white',  // Change background color on hover
            '.MuiTypography-root, .MuiButton-root, .MuiIconButton-root': {
              color: 'black',  // Change text and icon color to black
            },
          },
        }}
      >
        <Toolbar sx={{ height: '100%' }}>  {/* Ensure toolbar matches the app bar's height */}
          <Typography
            variant="h4"
            sx={{ flexGrow: 1, fontFamily: 'Righteous', fontWeight: 'normal', color: 'white', marginLeft: 4 }}  // Default white color
          >
            Steady Hotel
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button sx={{ color: 'white' }} onClick={handleLogin}>Login</Button>  {/* Default white */}
            <Button sx={{ color: 'white' }}>Logout</Button>  {/* Default white */}
          </Box>

          <IconButton
            edge="start"
            sx={{ color: 'white', marginLeft: 4 }}  // Default white color for icons
            aria-label="menu"
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>

        {/* Fullscreen Menu */}
        <FullscreenMenu
          open={menuOpen}
          onClose={handleMenuClose}
          anchorEl={anchorEl}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          PaperProps={{
            sx: {
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
          }}
        >
          <IconButton
            onClick={handleMenuClose}
            sx={{ 
              position: 'absolute', 
              top: '10px', 
              right: '10px',
              padding: '12px',  // Added padding for more space
              zIndex: 10, // Ensure the button is above other elements
            }}
          >
            <CloseIcon />
          </IconButton>

          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              width: '80%', // Increased width of the menu box
              height: '50%', // Increased height of the menu box
              justifyContent: 'center',
              bgcolor: 'background.paper', // Optional: Add background color for better visibility
              borderRadius: 2, // Optional: Add rounded corners
              boxShadow: 2, // Optional: Add shadow for depth
            }}
          >
            <MenuItem onClick={handleHomeClick} sx={{ fontSize: '2rem' }}> {/* Home menu item */}
              Home
            </MenuItem>
            <MenuItem onClick={handleMenuClose} sx={{ fontSize: '2rem' }}>
              About Us
            </MenuItem>
            <MenuItem onClick={handleMenuClose} sx={{ fontSize: '2rem' }}>
              Contact Us
            </MenuItem>
            <MenuItem onClick={handleProfileClick} sx={{ fontSize: '2rem' }}>
              Profile
            </MenuItem>
          </Box>
          {loading && <CircularProgress sx={{ marginTop: 2 }} />} {/* Loader display */}
        </FullscreenMenu>
      </AppBar>
    </>
  );
}

export default NavBar;
