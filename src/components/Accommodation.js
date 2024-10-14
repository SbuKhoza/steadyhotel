// src/components/Accommodation.js

import React, { useEffect, useState } from 'react';
import { db, getImageUrl } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
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
import { useSelector, useDispatch } from 'react-redux';
import { addBooking, clearCurrentBooking } from '../redux/slices/bookingSlice';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Custom arrow components for the slider
const Arrow = ({ className, style, onClick, direction }) => (
  <div
    className={className}
    style={{
      ...style,
      display: 'block',
      color: 'white',
      background: 'rgba(0, 0, 0, 0.5)',
      borderRadius: '50%',
      width: '30px',
      height: '30px',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1,
    }}
    onClick={onClick}
  >
    {direction === 'left' ? '<' : '>'}
  </div>
);

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

  // Form state variables
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  // Get current user from Redux store
  const user = useSelector((state) => state.user.userInfo);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const bookingStatus = useSelector((state) => state.booking.status);
  const bookingErrorState = useSelector((state) => state.booking.error);

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate

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

  useEffect(() => {
    if (bookingStatus === 'succeeded') {
      setSnackbarMessage('Booking submitted successfully! Redirecting to payment...');
      setSnackbarOpen(true);
      setBookingOpen(false);
      setOpen(false);
      // Navigate to the payment page
      navigate('/payment');
    } else if (bookingStatus === 'failed') {
      setBookingError('Failed to submit booking');
      setSnackbarMessage('Failed to submit booking');
      setSnackbarOpen(true);
      setBookingLoading(false);
    }
  }, [bookingStatus, navigate]);

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

    // Validate form inputs
    if (numberOfGuests < 1) {
      setBookingError('Number of guests must be at least 1');
      return;
    }

    if (!checkInDate || !checkOutDate) {
      setBookingError('Please select check-in and check-out dates');
      return;
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkOut <= checkIn) {
      setBookingError('Check-out date must be after check-in date');
      return;
    }

    const bookingData = {
      userId: user.uid,
      accommodationId: selectedAccommodation.id,
      accommodationName: selectedAccommodation.name,
      price: selectedAccommodation.price,
      numberOfGuests,
      checkInDate: checkIn.toISOString(),
      checkOutDate: checkOut.toISOString(),
      status: 'pending', // Default status of the booking
      createdAt: new Date().toISOString(),
    };

    setBookingLoading(true);
    setBookingError('');
    try {
      await dispatch(addBooking(bookingData)).unwrap();
      // The useEffect will handle navigation upon success
    } catch (error) {
      console.error('Error booking accommodation:', error);
      setBookingError('Failed to submit booking');
      setSnackbarMessage('Failed to submit booking');
      setSnackbarOpen(true);
      setBookingLoading(false);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <Arrow direction="right" />,
    prevArrow: <Arrow direction="left" />,
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
      <Grid container spacing={2} justifyContent="center">
        {accommodations.length > 0 ? (
          accommodations.map((acc, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
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
          <Typography>No accommodations available</Typography>
        )}
      </Grid>

      {/* Accommodation Details Pop-up */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        {selectedAccommodation && (
          <>
            <DialogTitle>{selectedAccommodation.name}</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  {selectedAccommodation.images && selectedAccommodation.images.length > 0 ? (
                    <Slider {...sliderSettings}>
                      {selectedAccommodation.images.map((image, idx) => (
                        <div key={idx}>
                          <img src={image} alt={`Accommodation image ${idx + 1}`} style={{ width: '100%' }} />
                        </div>
                      ))}
                    </Slider>
                  ) : (
                    <img src={selectedAccommodation.imageUrl} alt={selectedAccommodation.name} style={{ width: '100%' }} />
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

      {/* Booking Form Pop-up */}
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
                value={numberOfGuests}
                onChange={(e) => setNumberOfGuests(parseInt(e.target.value, 10))}
                required
                inputProps={{ min: 1 }}
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
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                required
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
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                required
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
        {bookingError && <Alert severity="error" sx={{ m: 2 }}>{bookingError}</Alert>}
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
