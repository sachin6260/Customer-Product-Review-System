import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const ReviewList = ({ reviews }) => {
  return (
    <div>
      <h2>Customer Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="review-item">
            <div>
              <strong>Rating: </strong>
              {[1, 2, 3, 4, 5].map((value) => (
                <FontAwesomeIcon 
                  key={value}
                  icon={faStar} 
                  className={value <= review.rating ? 'active' : ''}
                />
              ))}
            </div>
            <p>{review.text}</p>
            <small>Reviewed on: {review.date}</small>
          </div>
        ))
      ) : (
        <p>No reviews yet. Be the first to review this product!</p>
      )}
    </div>
  );
};

export default ReviewList;
