import React from 'react';
import Modal from 'react-modal';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import './BookingForm.css';

Modal.setAppElement('#root');

function BookingForm({ modalIsOpen, handleCloseModal }) {
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '',
    roomType: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBookingData({ ...bookingData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(db, 'bookings'), bookingData);
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
          <label>
            Room Type:
            <select name="roomType" value={bookingData.roomType} onChange={handleChange} required>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Suite">Suite</option>
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
        <button onClick={handleCloseModal}>Close</button>
      </div>
    </Modal>
  );
}

export default BookingForm;