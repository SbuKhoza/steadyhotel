import React, { useState } from 'react';
import BookingForm from './BookingForm/BookingForm'; // Ensure the path is correct
import './Components.css';

function Main() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] = useState('');

  const handleOpenModal = (accommodation) => {
    setSelectedAccommodation(accommodation);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => setModalIsOpen(false);

  return (
    <div className='maincont'>
      <h3>Choose accommodation</h3>
      <div id='maincont'>
        <div className='tile1'>
          <img src='honeymoon.jpg' alt='honeymoon' />
          <h4 id='room type'>Honeymoon Suite</h4>
          <p>Indulge in luxury and romance in our Honeymoon Suite, featuring breathtaking views, a private balcony, and top-tier amenities. Perfect for newlyweds or couples seeking an unforgettable getaway.</p>
          <button id='booknow' onClick={() => handleOpenModal('Honeymoon Suite')}>Book Now</button>
        </div>

        <div className='tile2'>
          <img src='standard.jpg' alt='rooms' />
          <h4 id='room type'>Standard Rooming</h4>
          <p>Comfort meets affordability in our Standard Rooms, equipped with all the essentials for a relaxing stay. Ideal for business travelers or solo adventurers.</p>
          <button id='booknow' onClick={() => handleOpenModal('Standard Rooming')}>Book Now</button>
        </div>

        <div className='tile3'>
          <img src='spar.jpg' alt='rooms' />
          <h4 id='room type'>Spa</h4>
          <p>Rejuvenate your senses at our on-site spa, offering a range of treatments designed to help you unwind and refresh in style.</p>
          <button id='booknow' onClick={() => handleOpenModal('Spa')}>Book Now</button>
        </div>

        <div className='tile4'>
          <img src='conference.jpg' alt='rooms' />
          <h4 id='room type'>Conference Venues</h4>
          <p>Host your next meeting or event in our state-of-the-art conference venues, equipped with modern technology and flexible seating arrangements.</p>
          <button id='booknow' onClick={() => handleOpenModal('Conference Venues')}>Book Now</button>
        </div>
      </div>

      <BookingForm
        modalIsOpen={modalIsOpen}
        handleCloseModal={handleCloseModal}
        selectedAccommodation={selectedAccommodation}
      />
    </div>
  );
}

export default Main;
