import React, { useState, useEffect } from 'react';
import BookingForm from './BookingForm/BookingForm';
import ViewAccommodation from '../components/ViewAccommodation';
import { getAccommodationsFromFirestore } from '../services/firestoreService';
import './Components.css';

function Main() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const accommodationsData = await getAccommodationsFromFirestore();
        setAccommodations(accommodationsData.slice(0, 3));
      } catch (error) {
        console.error('Error fetching accommodations: ', error);
      }
    };
    fetchAccommodations();
  }, []);

  const handleOpenModal = (accommodation) => {
    setSelectedAccommodation(accommodation);
    setModalIsOpen(true);
  };

  const handleOpenViewModal = (accommodation) => {
    setSelectedAccommodation(accommodation);
    setViewModalIsOpen(true);
  };

  const handleCloseModal = () => setModalIsOpen(false);
  const handleCloseViewModal = () => setViewModalIsOpen(false);

  return (
    <div className='maincont'>
      <h3>Choose accommodation</h3>
      <div id='maincont'>
        {accommodations.map((accommodation) => (
          <div key={accommodation.id} className='tile'>
            {/* Use the correct image URL from Firestore */}
            <img src={accommodation.image || '/default-image.jpg'} alt={accommodation.name} />
            <h4>{accommodation.name}</h4>
            <p>{accommodation.description}</p>
            <div id='buttn'>
              <button id='booknow' onClick={() => handleOpenModal(accommodation)}>Book Now</button>
              <button id='view' onClick={() => handleOpenViewModal(accommodation)}>View</button>
            </div>
          </div>
        ))}
      </div>

      <BookingForm
        modalIsOpen={modalIsOpen}
        handleCloseModal={handleCloseModal}
        selectedAccommodation={selectedAccommodation?.name}
      />

      <ViewAccommodation
        modalIsOpen={viewModalIsOpen}
        handleCloseModal={handleCloseViewModal}
        accommodation={selectedAccommodation}
        handleOpenBooking={handleOpenModal}
      />
    </div>
  );
}

export default Main;