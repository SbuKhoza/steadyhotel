// src/components/Main.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from './BookingForm/BookingForm';
import ViewAccommodation from '../components/ViewAccommodation';
import './Components.css';
import { db, getImageUrl } from '../services/firebase'; // Import Firebase services
import { collection, getDocs } from 'firebase/firestore';

function Main() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [accommodation, setAccommodation] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccommodation = async () => {
      const querySnapshot = await getDocs(collection(db, "accommodations"));
      const data = await Promise.all(querySnapshot.docs.map(async doc => {
        const docData = { id: doc.id, ...doc.data() };
        if (docData.image) {
          docData.imageUrl = await getImageUrl(docData.image);
        }
        return docData;
      }));
      setAccommodation(data.slice(0, 3)); // Display only the first 3 accommodations
    };
    
    fetchAccommodation();
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

  const handleViewAll = () => {
    navigate('/accommodation'); // Navigate to the accommodation page
  };

  return (
    <div className='maincont'>
      <h3>Choose accommodation</h3>
      <div id='maincont'>
        {accommodation.length > 0 ? (
          accommodation.map((accommodationItem) => (
            <div key={accommodationItem.id} className='tile'>
              <img src={accommodationItem.imageUrl || '/default-image.jpg'} alt={accommodationItem.name} />
              <h4>{accommodationItem.name}</h4>
              <p>{accommodationItem.description}</p>
              <div id='buttn'>
                <button id='booknow' onClick={() => handleOpenModal(accommodationItem)}>Book Now</button>
                <button id='view' onClick={() => handleOpenViewModal(accommodationItem)}>View</button>
              </div>
            </div>
          ))
        ) : (
          <p>No accommodations available.</p>
        )}
      </div>

      <button id='view-all' onClick={handleViewAll}>View All</button>

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
