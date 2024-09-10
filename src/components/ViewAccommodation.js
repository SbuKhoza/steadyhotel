import React from 'react';
import Modal from 'react-modal';
import './ViewAccommodation.css';

Modal.setAppElement('#root');

function ViewAccommodation({ modalIsOpen, handleCloseModal, accommodation, handleOpenBooking }) {
  if (!accommodation) return null;

  const handleBookNow = () => {
    handleOpenBooking(accommodation);
    handleCloseModal();  
  };

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal} contentLabel="Accommodation Details">
      <div className="view-accommodation">
        <h2>{accommodation.name}</h2>
        <img src={accommodation.image || '/default-image.jpg'} alt={accommodation.name} />
        <p><strong>Description:</strong> {accommodation.description}</p>
        <p><strong>Price:</strong> ${accommodation.price}</p>
        <p><strong>Location:</strong> {accommodation.location}</p>
        <p><strong>Amenities:</strong> {accommodation.amenities ? accommodation.amenities.join(', ') : 'N/A'}</p>
        <button className="book-now-btn" onClick={handleBookNow}>Book Now</button>
        <button onClick={handleCloseModal}>Close</button>
      </div>
    </Modal>
  );
}

export default ViewAccommodation;