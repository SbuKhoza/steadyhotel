import React, { useState, useEffect } from 'react';
import { getAccommodationsFromFirestore } from '../services/firestoreService'; // Import your Firestore service function
import './Accommodation.css';

function Accommodation() {
    const [accommodations, setAccommodations] = useState([]);

    useEffect(() => {
        const fetchAccommodations = async () => {
            try {
                const accommodationsData = await getAccommodationsFromFirestore();
                setAccommodations(accommodationsData);
            } catch (error) {
                console.error("Error fetching accommodations: ", error);
            }
        };

        fetchAccommodations();
    }, []);

    return (
        <div className="accommodations">
            <h1>Accommodations</h1>
            <div className="accommodation-list">
                {accommodations.length > 0 ? (
                    accommodations.map(accommodation => (
                        <div className="accommodation-card" key={accommodation.id}>
                            <img src={accommodation.image || '/default-image.jpg'} alt={accommodation.name} />
                            <h2>{accommodation.name}</h2>
                            <p>{accommodation.description}</p>
                            <p><strong>Price:</strong> ZAR {accommodation.price}</p> {/* Updated to ZAR */}
                        </div>
                    ))
                ) : (
                    <p>No accommodations available.</p>
                )}
            </div>
        </div>
    );
}

export default Accommodation;
