import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './BookingForm.css';

Modal.setAppElement('#root');

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
      // Simulate a successful booking submission
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
    <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal} contentLabel="Booking Form">
      <div className="book">
        <h2>Booking Form for {selectedAccommodation}</h2>
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
