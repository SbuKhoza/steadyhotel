import React, { useState } from 'react';
import Modal from 'react-modal';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Access logged-in user info
import { db } from '../../firebase';
import './BookingForm.css';

Modal.setAppElement('#root');

function BookingForm({ modalIsOpen, handleCloseModal, selectedAccommodation }) {
  // Access the current logged-in user from Redux
  const { userInfo } = useSelector((state) => state.user);

  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '',
  });

  const [error, setError] = useState(null); // Manage error state
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
        userId: userInfo.uid, // Store the user ID from Redux
        email: userInfo.email, // Store the user email from Redux
        status: 'pending', // Add initial booking status
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, 'bookings'), fullBookingData);

      alert('Booking successful!');
      handleCloseModal();
      navigate('/payment', { state: { bookingData: fullBookingData } });
    } catch (error) {
      console.error('Error adding booking: ', error);
      setError('An error occurred while processing your booking.');
    }
  };

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal} contentLabel="Booking Form">
      <div className="book">
        <h2>Booking Form</h2>
        {error && <p className="error-message">{error}</p>} 
        <form id="bookingform" onSubmit={handleSubmit}>
          <div>
            <label>Room Type:</label>
            <span className="room-type-display">{selectedAccommodation}</span>
          </div>
          <label>
            Check-In:
            <input
              type="date"
              name="checkIn"
              value={bookingData.checkIn}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Check-Out:
            <input
              type="date"
              name="checkOut"
              value={bookingData.checkOut}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Guests:
            <input
              type="number"
              name="guests"
              value={bookingData.guests}
              onChange={handleChange}
              required
              min="1" 
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <button onClick={handleCloseModal}>Close</button>
      </div>
    </Modal>
  );
}

export default BookingForm;
