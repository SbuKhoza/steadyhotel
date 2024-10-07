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
} from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Accommodation() {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'accommodations'));
        const accommodationsData = [];

        if (!querySnapshot.empty) {
          for (const doc of querySnapshot.docs) {
            const accommodation = doc.data();
            const imageUrl = accommodation.frontPicture
              ? await getImageUrl(accommodation.frontPicture)
              : accommodation.frontPicture;
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
    setBookingOpen(true);
  };

  const handleBookingClose = () => {
    setBookingOpen(false);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (loading) {
    return <div>Loading accommodations...</div>;
  }

  return (
    <div>
      <Grid container spacing={2}>
        {accommodations.length > 0 ? (
          accommodations.map((acc, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
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
                {/* Image Slider */}
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

                {/* Accommodation Details */}
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
          <Button onClick={handleBookingClose} color="primary" variant="contained">
            Submit Booking
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Accommodation;