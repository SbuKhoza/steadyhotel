import React, { useEffect, useState } from 'react';
import { db, getImageUrl } from '../services/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import Slider from 'react-slick';
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  TextField,
  Box,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import { useSelector } from 'react-redux'; // Use to get current user info
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Accommodation() {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Get current user from Redux store
  const user = useSelector((state) => state.user.userInfo);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    const fetchAccommodations = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'accommodations'));
        const accommodationsData = [];

        if (!querySnapshot.empty) {
          for (const doc of querySnapshot.docs) {
            const accommodation = { id: doc.id, ...doc.data() };
            const imageUrl = accommodation.frontPicture
              ? await getImageUrl(accommodation.frontPicture)
              : await getImageUrl(null); // Default image if frontPicture is missing
            accommodationsData.push({ ...accommodation, imageUrl });
          }
          setAccommodations(accommodationsData);
        }
      } catch (error) {
        console.error('Error fetching accommodations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodations();
  }, []);

  const handleClickOpen = (accommodation) => {
    setSelectedAccommodation(accommodation);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAccommodation(null);
  };

  const handleBookingClick = () => {
    if (!isLoggedIn) {
      setBookingError('You must sign in to book an accommodation');
      setSnackbarMessage('You must sign in to book an accommodation');
      setSnackbarOpen(true);
      return;
    }
    setBookingError('');
    setBookingOpen(true);
  };

  const handleBookingClose = () => {
    setBookingOpen(false);
    setBookingError('');
  };

  const handleBookingSubmit = async () => {
    if (!selectedAccommodation || !user) return;

    setBookingLoading(true);
    try {
      const bookingData = {
        userId: user.uid,
        accommodationId: selectedAccommodation.id, // Assuming accommodation has an ID field
        accommodationName: selectedAccommodation.name,
        price: selectedAccommodation.price,
        checkInDate: new Date(), // Example check-in date, replace with actual data from form
        checkOutDate: new Date(), // Example check-out date, replace with actual data from form
        status: 'pending', // Default status of the booking
      };

      await addDoc(collection(db, 'bookings'), bookingData);
      setSnackbarMessage('Booking submitted successfully!');
    } catch (error) {
      console.error('Error booking accommodation:', error);
      setBookingError('Failed to submit booking');
      setSnackbarMessage('Failed to submit booking');
    } finally {
      setBookingLoading(false);
      setBookingOpen(false);
      setSnackbarOpen(true);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <Grid container spacing={2}>
        {accommodations.length > 0 ? (
          accommodations.map((acc, index) => (
            <Grid item xs={12} sm={6} md={4} marginLeft={5} key={index} >
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image={acc.imageUrl}
                  alt={acc.name}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {acc.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ZAR {acc.price}
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleClickOpen(acc)}
                  >
                    View
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <div>No accommodations available</div>
        )}
      </Grid>

      {/* Accommodation Pop-up */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        {selectedAccommodation && (
          <>
            <DialogTitle>{selectedAccommodation.name}</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  {selectedAccommodation.images && (
                    <Slider {...sliderSettings}>
                      {selectedAccommodation.images.map((image, idx) => (
                        <div key={idx}>
                          <img src={image} alt={`Accommodation image ${idx + 1}`} style={{ width: '100%' }} />
                        </div>
                      ))}
                    </Slider>
                  )}
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Description
                    </Typography>
                    <Typography paragraph>{selectedAccommodation.description}</Typography>

                    <Typography variant="h6" gutterBottom>
                      Price
                    </Typography>
                    <Typography paragraph>ZAR {selectedAccommodation.price}</Typography>

                    <Typography variant="h6" gutterBottom>
                      Availability
                    </Typography>
                    <Typography paragraph>{selectedAccommodation.availability}</Typography>

                    <Typography variant="h6" gutterBottom>
                      Amenities
                    </Typography>
                    <Typography paragraph>{selectedAccommodation.amenities.join(', ')}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
              <Button onClick={handleBookingClick} color="primary" variant="contained">
                Book Accommodation
              </Button>
            </DialogActions>
            {bookingError && <Alert severity="error">{bookingError}</Alert>}
          </>
        )}
      </Dialog>

      {/* Booking Pop-up */}
      <Dialog open={bookingOpen} onClose={handleBookingClose} fullWidth maxWidth="sm">
        <DialogTitle>Book Accommodation</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Number of Guests"
                type="number"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                label="Check-in Date"
                type="date"
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                label="Check-out Date"
                type="date"
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBookingClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleBookingSubmit} color="primary" variant="contained" disabled={bookingLoading}>
            {bookingLoading ? <CircularProgress size={24} /> : 'Submit Booking'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </div>
  );
}

export default Accommodation;
