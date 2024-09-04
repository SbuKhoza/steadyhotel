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
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <button id='booknow' onClick={() => handleOpenModal('Honeymoon Suite')}>Book Now</button>
        </div>

        <div className='tile2'>
          <img src='standard.jpg' alt='rooms' />
          <h4 id='room type'>Standard Rooming</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <button id='booknow' onClick={() => handleOpenModal('Standard Rooming')}>Book Now</button>
        </div>

        <div className='tile3'>
          <img src='spar.jpg' alt='rooms' />
          <h4 >Spa</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <button id='booknow' onClick={() => handleOpenModal('Spa')}>Book Now</button>
        </div>

        <div className='tile4'>
          <img src='conference.jpg' alt='rooms' />
          <h4>Conference Venues</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <button id='booknow' onClick={() => handleOpenModal('Conference Venues')}>Book Now</button>
        </div>
      </div>

      {/* Include the BookingForm component */}
      <BookingForm
        modalIsOpen={modalIsOpen}
        handleCloseModal={handleCloseModal}
        selectedAccommodation={selectedAccommodation}
      />
    </div>
  );
}

export default Main;