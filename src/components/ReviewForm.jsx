import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const ReviewForm = ({ addReview }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = { 
      rating, 
      text: reviewText, 
      date: new Date().toLocaleString()  // Record current date and time
    };
    addReview(newReview);
    setRating(0);
    setReviewText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit a Review</h2>
      
      <div>
        <label>Rating:</label>
        <div className="rating">
          {[1, 2, 3, 4, 5].map((value) => (
            <FontAwesomeIcon
              key={value}
              icon={faStar}
              onClick={() => setRating(value)}
              className={value <= rating ? 'active' : ''}
            />
          ))}
        </div>
      </div>

      <label>
        Review:
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
      </label>
      
      <br />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
