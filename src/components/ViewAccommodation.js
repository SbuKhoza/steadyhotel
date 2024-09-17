import React, { useState } from 'react'; 
import Modal from 'react-modal';
import Slider from 'react-slick';
import './ViewAccommodation.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

Modal.setAppElement('#root');

function ViewAccommodation({ modalIsOpen, handleCloseModal, accommodation, handleOpenBooking }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!accommodation) return null;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true, // Ensure proper height adjustment for each image
  };

  const handleBookNow = () => {
    handleOpenBooking(accommodation);
    handleCloseModal();
  };

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Accommodation Details"
      className={isFullscreen ? 'modal-fullscreen' : 'modal'}
    >
      <div className="view-accommodation">
        <h2>{accommodation.name}</h2>
        <Slider {...settings} className="carousel">
          {accommodation.images && accommodation.images.length > 0 ? (
            accommodation.images.map((image, index) => (
              <div key={index} className="carousel-slide">
                <img src={image} alt={`${accommodation.name} image ${index + 1}`} />
              </div>
            ))
          ) : (
            <div className="carousel-slide">
              <img src={accommodation.image || '/default-image.jpg'} alt={accommodation.name} />
            </div>
          )}
        </Slider>
        <p><strong>Description:</strong> {accommodation.description}</p>
        <p><strong>Price:</strong> ${accommodation.price}</p>
        <p><strong>Location:</strong> {accommodation.location}</p>
        <p><strong>Amenities:</strong> {accommodation.amenities ? accommodation.amenities.join(', ') : 'N/A'}</p>
        <button className="book-now-btn" onClick={handleBookNow}>Book Now</button>
        <button onClick={handleCloseModal}>Close</button>
        <button onClick={handleFullscreenToggle} className="fullscreen-btn">
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
      </div>
    </Modal>
  );
}

export default ViewAccommodation;
