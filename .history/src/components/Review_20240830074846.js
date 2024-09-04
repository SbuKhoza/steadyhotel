import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReview, fetchReviews } from '../redux/slices/reviewSlice';
import './Components.css';

function Review() {
  const [userName, setUserName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);
  
  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      userName,
      comment,
      rating,
      date: new Date().toISOString(),
    };
    dispatch(addReview(newReview));
    setUserName('');
    setComment('');
    setRating(0);
  };

  return (
    <div className='rev'>
      <h1>Testimonials</h1>

      <form onSubmit={handleSubmit} className='review-form'>
        <div>
          <label>Name:</label>
          <input type='text' value={userName} onChange={(e) => setUserName(e.target.value)} required />
        </div>
        <div>
          <label>Comment:</label>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} required />
        </div>
        <div>
          <label>Rating:</label>
          <input
            type='number'
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min='1'
            max='5'
            required
          />
        </div>
        <button type='submit'>Submit Review</button>
      </form>

      <div className='reviewz'>
        {reviews.map((review) => (
          <div className='review' key={review.id}>
            <p>{review.comment}</p>
            <h3>{review.userName} - Rating: {review.rating}/5</h3>
            <small>{new Date(review.date).toLocaleDateString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Review;