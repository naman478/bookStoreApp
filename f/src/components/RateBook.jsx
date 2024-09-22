import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import './RateBook.css'
// Import useAuth to get the authUser

const RateBook = () => {
  const { id } = useParams(); // Book ID from URL
  const [book, setBook] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [hasRated, setHasRated] = useState(false); // Check if user already rated
  const [authUser] = useAuth(); // Get authUser from the context
  const navigate = useNavigate();

  // Fetch book details and user info
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const bookRes = await axios.get(`http://localhost:4001/book/${id}`);
        setBook(bookRes.data);

        if (authUser?._id) {
          // Check if the user has already rated this book
          const ratingRes = await axios.get(`http://localhost:4001/book/${id}/check-rating/${authUser.id}`);
          setHasRated(ratingRes.data.hasRated); // Set to true if user has rated
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchBookDetails();
  }, [id, authUser]);

  const handleRatingSubmit = async () => {
    console.log(authUser._id)
    if (!authUser?._id) {
      alert("User ID is not available");
      return;
    }

    if (rating < 1 || rating > 5) {
      alert("Please give a rating between 1 and 5");
      return;
    }

    try {
      await axios.post(`http://localhost:4001/${id}/rate`, {
        userId: authUser._id, // Use user ID from authUser
        rating,
        review,
      });

      alert('Thank you for your rating!');
      setHasRated(true); // Set hasRated to true after submitting rating
    } catch (error) {
      console.error("Error submitting rating", error);
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="rate-book-container">
        <h2>Rate and Review: {book.name}</h2>
        <img style={{height:"350px",width:"300px"}} className="book-image" src={book.image} alt={book.name} />

        {hasRated ? (
          <p>You have already rated this book. Thank you!</p>
        ) : (
          <>
            <div className="rating-section">
              <label>Rating (out of 5):</label>
              <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>

            <div className="review-section">
              <label>Review:</label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write your review here..."
              />
            </div>

            <button onClick={handleRatingSubmit} className="submit-rating-btn">
              Submit Rating
            </button>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default RateBook;
