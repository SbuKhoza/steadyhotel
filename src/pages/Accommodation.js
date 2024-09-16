import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import './Accommodation.css';

function Accommodation() {
    const [accommodations, setAccommodations] = useState([]);

    useEffect(() => {
        const fetchAccommodations = async () => {
            const querySnapshot = await getDocs(collection(db, "accommodations"));
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAccommodations(data);
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
                            <p><strong>Price:</strong> ZAR {accommodation.price}</p>
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