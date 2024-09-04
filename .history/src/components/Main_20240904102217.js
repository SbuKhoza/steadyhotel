import React, { useState } from 'react';
import BookingForm from './BookingForm/BookingForm'; // Make sure the path is correct
import './Components.css';

function Main() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => setModalIsOpen(true);
  const handleCloseModal = () => setModalIsOpen(false);

  return (
    <div className='maincont'>
      <h3>Choose accommodation</h3>
      <div id='maincont'>
        <div className='tile1'>
          <img src='honeymoon.jpg' alt='honeymoon' />
          <h4>Honeymoon Suit</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <button onClick={handleOpenModal}>Book Now</button>
        </div>

        <div className='tile2'>
          <img src='standard.jpg' alt='rooms' />
          <h4>Standard Rooming</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <button onClick={handleOpenModal}>Book Now</button>
        </div>

        <div className='tile3'>
          <img src='spar.jpg' alt='rooms' />
          <h4>Spar</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <button onClick={handleOpenModal}>Book Now</button>
        </div>

        <div className='tile4'>
          <img src='conference.jpg' alt='rooms' />
          <h4>Conference Venues</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <button onClick={handleOpenModal}>Book Now</button>
        </div>
      </div>
      
      {/* Include the BookingForm component */}
      <BookingForm modalIsOpen={modalIsOpen} handleCloseModal={handleCloseModal} />
    </div>
  );
}

export default Main;