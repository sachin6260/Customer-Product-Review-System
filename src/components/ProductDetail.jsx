import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './ProductDetail.css'; // Import your CSS file

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [editReviewIndex, setEditReviewIndex] = useState(null);
  const [editedReviewText, setEditedReviewText] = useState('');
  const [editedRating, setEditedRating] = useState(0);

  useEffect(() => {
    // Fetch product data
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));

    // Fetch reviews from localStorage
    const storedReviews = localStorage.getItem(`reviews_${id}`);
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, [id]);

  const handleAddReview = () => {
    const newReviewObj = {
      text: newReview,
      rating: newRating,
      date: new Date().toLocaleString(),
    };
    const updatedReviews = [...reviews, newReviewObj];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));
    setNewReview('');
    setNewRating(0);
  };

  const handleEditReview = (index) => {
    setEditReviewIndex(index);
    setEditedReviewText(reviews[index].text);
    setEditedRating(reviews[index].rating);
  };

  const handleSaveEditedReview = (index) => {
    const updatedReviews = [...reviews];
    updatedReviews[index] = { 
      text: editedReviewText, 
      rating: editedRating, 
      date: reviews[index].date 
    };
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));
    setEditReviewIndex(null);
  };

  const handleDeleteReview = (index) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  const handleSortByRating = (order) => {
    const sortedReviews = [...reviews].sort((a, b) => {
      return order === 'asc' ? a.rating - b.rating : b.rating - a.rating;
    });
    setReviews(sortedReviews);
  };

  return (
    <div className="product-detail">
      {product && (
        <>
          <h1>{product.title}</h1>
          <img src={product.image} alt={product.title} className="product-image" />
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>

          <div className="average-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className={i < calculateAverageRating() ? 'active' : ''}
                />
              ))}
            </div>
            <div className="rating-text">{calculateAverageRating()} / 5</div>
          </div>
        </>
      )}

      <div className="reviews-section">
        <h2>Customer Reviews</h2>

        <div className="review-form">
          <h3>Add a Review</h3>
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your review"
          />
          <div className="star-rating">
            {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon
                key={i}
                icon={faStar}
                onClick={() => setNewRating(i + 1)}
                className={i < newRating ? 'active' : ''}
              />
            ))}
          </div>
          <button onClick={handleAddReview}>Submit Review</button>
        </div>

        <div className="sort-buttons">
          <h3>Sort Reviews by Rating</h3>
          <button onClick={() => handleSortByRating('asc')}>Lowest to Highest</button>
          <button onClick={() => handleSortByRating('desc')}>Highest to Lowest</button>
        </div>

        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div className="review-item" key={index}>
              <div>
                {editReviewIndex === index ? (
                  <>
                    <textarea
                      value={editedReviewText}
                      onChange={(e) => setEditedReviewText(e.target.value)}
                    />
                    <div className="star-rating">
                      {[...Array(5)].map((_, i) => (
                        <FontAwesomeIcon
                          key={i}
                          icon={faStar}
                          onClick={() => setEditedRating(i + 1)}
                          className={i < editedRating ? 'active' : ''}
                        />
                      ))}
                    </div>
                    <button onClick={() => handleSaveEditedReview(index)}>Save</button>
                  </>
                ) : (
                  <>
                    <strong>Rating: </strong>
                    <div className="star-rating">
                      {[...Array(5)].map((_, i) => (
                        <FontAwesomeIcon
                          key={i}
                          icon={faStar}
                          style={{
                            color: i < review.rating ? '#ffc107' : '#e4e5e9',
                          }}
                        />
                      ))}
                    </div>
                    <p className="review-text">{review.text}</p>
                    <p className="review-date"><small>Posted on: {review.date}</small></p>
                    <button onClick={() => handleEditReview(index)}>Edit</button>
                    <button onClick={() => handleDeleteReview(index)}>Delete</button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to review this product!</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
