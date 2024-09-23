import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography, Box } from '@mui/material';

function ProtectedProfile({ children }) {
  const { isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h5">Please log in to view your profile</Typography>
      </Box>
    );
  }

  return children; // Render the Profile component when the user is logged in
}

export default ProtectedProfile;
