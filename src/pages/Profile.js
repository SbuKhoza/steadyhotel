import React, { useState, useEffect } from 'react';  
import { TextField, Button, Typography, Avatar, Box, Grid, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../redux/slices/userSlice'; 
import { uploadProfilePicture } from '../services/firebase';

function Profile() {
  const dispatch = useDispatch();
  const { userInfo, loading } = useSelector((state) => state.user);

  const [displayName, setDisplayName] = useState(userInfo?.displayName || '');
  const [address, setAddress] = useState(userInfo?.address || '');
  const [profilePic, setProfilePic] = useState(userInfo?.profilePic || '');
  const [imageFile, setImageFile] = useState(null);

  // Update local state when userInfo changes (e.g., after page refresh or successful login)
  useEffect(() => {
    if (userInfo) {
      setDisplayName(userInfo.displayName || '');
      setAddress(userInfo.address || '');
      setProfilePic(userInfo.profilePic || '');
    }
  }, [userInfo]);

  const handleSave = () => {
    if (!userInfo || !userInfo.uid) {
      console.error('User is not logged in or userInfo is not available.');
      return;
    }

    if (imageFile) {
      uploadProfilePicture(imageFile, userInfo.uid)
        .then((url) => {
          dispatch(updateUserProfile({ displayName, address, profilePic: url, imageFile }));
        })
        .catch((error) => {
          console.error('Error uploading profile picture:', error);
        });
    } else {
      dispatch(updateUserProfile({ displayName, address, profilePic }));
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    setProfilePic(URL.createObjectURL(file));
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={8}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom>My Profile</Typography>

          {/* Display the name in h3 format */}
          <Typography variant="h3" gutterBottom>
            {displayName || 'Your Name'}
          </Typography>

          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar src={profilePic} sx={{ width: 100, height: 100, marginBottom: 2 }} />
            <Button variant="contained" component="label">
              Upload Profile Picture
              <input hidden type="file" accept="image/*" onChange={handleImageUpload} />
            </Button>
          </Box>

          <Box mt={3}>
            <TextField
              fullWidth
              label="Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              margin="normal"
            />
          </Box>

          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={loading}
            >
              Save Profile
            </Button>
          </Box>

          <Typography variant="h5" gutterBottom mt={5}>Booking History</Typography>
          <Box>
            {userInfo?.bookings?.length > 0 ? (
              userInfo.bookings.map((booking, index) => (
                <Box key={index} mb={2} p={2} border={1} borderColor="grey.300" borderRadius={1}>
                  <Typography variant="subtitle1">{booking.hotelName}</Typography>
                  <Typography variant="body2">Check-in: {booking.checkInDate}</Typography>
                  <Typography variant="body2">Check-out: {booking.checkOutDate}</Typography>
                </Box>
              ))
            ) : (
              <Typography>No bookings yet.</Typography>
            )}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Profile;
