import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import './Review.css';

function Review() {
  const [reviewData, setReviewData] = useState({
    rating: '',
    review: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(db, 'reviews'), reviewData);
      alert('Rating submitted!');
      setReviewData({ rating: '', review: '' });
    } catch (error) {
      console.error('Error submitting review: ', error);
    }
  };

  return (
    <div className='review-section'>
      <h2>Rate Your Experience</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Rating:
          <input type="number" name="rating" value={reviewData.rating} onChange={handleChange} min="1" max="5" required />
        </label>
        <label>
          Review:
          <textarea name="review" value={reviewData.review} onChange={handleChange} required />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Review;