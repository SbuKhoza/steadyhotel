// src/components/Accommodation.js

import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { getImageUrl } from '../services/firebase'; // Import the getImageUrl function
import ViewAccommodation from '../components/ViewAccommodation'; // Import the ViewAccommodation component
import './Accommodation.css';

function Accommodation() {
    const [accommodations, setAccommodations] = useState([]);
    const [selectedAccommodation, setSelectedAccommodation] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        const fetchAccommodations = async () => {
            const querySnapshot = await getDocs(collection(db, "accommodations"));
            const data = await Promise.all(querySnapshot.docs.map(async doc => {
              const docData = { id: doc.id, ...doc.data() };
              if (docData.image) {
                docData.imageUrl = await getImageUrl(docData.image);
              }
              return docData;
            }));
            setAccommodations(data);
        };

        fetchAccommodations();
    }, []);

    const handleOpenModal = (accommodation) => {
        setSelectedAccommodation(accommodation);
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false);
        setSelectedAccommodation(null);
    };

    const handleOpenBooking = (accommodation) => {
        // Implement booking logic here
    };

    return (
        <div className="accommodations">
            <h1>Accommodations</h1>
            <div className="accommodation-list">
                {accommodations.length > 0 ? (
                    accommodations.map(accommodation => (
                        <div 
                            className="accommodation-card" 
                            key={accommodation.id}
                            onClick={() => handleOpenModal(accommodation)}
                        >
                            <img src={accommodation.imageUrl || '/default-image.jpg'} alt={accommodation.name} />
                            <h2>{accommodation.name}</h2>
                            <p>{accommodation.description}</p>
                            <p><strong>Price:</strong> ZAR {accommodation.price}</p>
                        </div>
                    ))
                ) : (
                    <p>No accommodations available.</p>
                )}
            </div>
            {selectedAccommodation && (
                <ViewAccommodation
                    modalIsOpen={modalIsOpen}
                    handleCloseModal={handleCloseModal}
                    accommodation={selectedAccommodation}
                    handleOpenBooking={handleOpenBooking}
                />
            )}
        </div>
    );
}

export default Accommodation;