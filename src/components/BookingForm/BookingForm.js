import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function BookingForm({ modalIsOpen, handleCloseModal, selectedAccommodation }) {
  const { userInfo } = useSelector((state) => state.user);

  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBookingData({ ...bookingData, [name]: value });
  };

  const validateForm = () => {
    const { checkIn, checkOut, guests } = bookingData;
    if (!checkIn || !checkOut || !guests) {
      setError('All fields are required.');
      return false;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      setError('Check-out date must be after check-in date.');
      return false;
    }
    if (guests <= 0) {
      setError('Number of guests must be at least 1.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    if (!userInfo || !userInfo.uid) {
      setError('User is not logged in.');
      return;
    }

    try {
      const fullBookingData = {
        ...bookingData,
        roomType: selectedAccommodation,
        userId: userInfo.uid,
        email: userInfo.email,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      alert('Booking successful!');
      handleCloseModal();
      navigate('/payment', { state: { bookingData: fullBookingData } });
    } catch (error) {
      console.error('Error adding booking: ', error);
      setError('An error occurred while processing your booking.');
    }
  };

  return (
    <Dialog open={modalIsOpen} onClose={handleCloseModal} fullWidth>
      <DialogTitle>Booking Form for {selectedAccommodation}</DialogTitle>
      <DialogContent>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form id="bookingform" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Check-In"
                type="date"
                name="checkIn"
                value={bookingData.checkIn}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Check-Out"
                type="date"
                name="checkOut"
                value={bookingData.checkOut}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Guests"
                type="number"
                name="guests"
                value={bookingData.guests}
                onChange={handleChange}
                required
                inputProps={{ min: 1 }}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal}>Close</Button>
        <Button type="submit" form="bookingform" variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BookingForm;
