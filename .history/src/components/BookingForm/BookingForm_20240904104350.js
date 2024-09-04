import React, { useState } from 'react';
import Modal from 'react-modal';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import './BookingForm.css';

Modal.setAppElement('#root');

function BookingForm({ modalIsOpen, handleCloseModal, selectedAccommodation }) {
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBookingData({ ...bookingData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Combine selected accommodation with other booking data
      const fullBookingData = { ...bookingData, roomType: selectedAccommodation };
      await addDoc(collection(db, 'bookings'), fullBookingData);
      alert('Booking successful!');
      handleCloseModal();
    } catch (error) {
      console.error('Error adding booking: ', error);
    }
  };

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal} contentLabel="Booking Form">
      <div className='book'>
        <h2>Booking Form</h2>
        <form id='bookingform' onSubmit={handleSubmit}>
          <div>
            <label>Room Type:</label>
            <span className="room-type-display">{selectedAccommodation}</span>
          </div>
          <label>
            Check-In:
            <input type="date" name="checkIn" value={bookingData.checkIn} onChange={handleChange} required />
          </label>
          <label>
            Check-Out:
            <input type="date" name="checkOut" value={bookingData.checkOut} onChange={handleChange} required />
          </label>
          <label>
            Guests:
            <input type="number" name="guests" value={bookingData.guests} onChange={handleChange} required />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <button onClick={handleCloseModal}>Close</button>
      </div>
    </Modal>
  );
}

export default BookingForm;
