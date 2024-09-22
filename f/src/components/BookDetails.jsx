import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./BookDetails.css";

const BookDetails = () => {
  const { id } = useParams(); // Retrieve book ID from URL
  const [book, setBook] = useState(null); // Book details
  const [recommendedByCategory, setRecommendedByCategory] = useState([]); // Books recommended by category
  const [recommendedByDescription, setRecommendedByDescription] = useState([]); // Books recommended by description
  const navigate = useNavigate(); // useNavigate for redirection

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:4001/book/${id}`);
        setBook(res.data);

        const categoryRes = await axios.get(
          `http://localhost:4001/book/recommendations/category/${res.data.category}`
        );

        setRecommendedByCategory(categoryRes.data.recommendations || []);
        console.log(categoryRes.data);

        const descriptionRes = await axios.get(
          `http://localhost:4001/book/recommendations/description/${res.data.title}`
        );
        const detailedRecommendations = await axios.post(
          "http://localhost:4001/book/titlee",
          { titles: descriptionRes.data.recommendations }
        );
        setRecommendedByDescription(detailedRecommendations.data || []);

        const detailedRecommendations1 = await axios.post(
          "http://localhost:4001/book/titlee",
          { titles: categoryRes.data.recommendations }
        );
        setRecommendedByCategory(detailedRecommendations1.data || []);
      } catch (error) {
        console.error("Error fetching book details or recommendations: ", error);
      }
    };
    fetchBook();
  }, [id]); // Add `id` as dependency

  // Function to handle "Buy Now" click
  const handleBuyNow = () => {
    navigate(`/rate-book/${id}`); // Redirect to the rating page for the book
  };

  if (!book) return <p>Loading...</p>; // Show loading state while book details are being fetched

  return (
    <div className="book-detail-container">
      <div className="book-detail-card">
        <img
          style={{ height: "350px" }}
          className="book-detail-image"
          src={book.image}
          alt={book.name}
        />
        <div className="book-detail-info">
          <h1 className="book-title">{book.name}</h1>
          <p className="book-author">by {book.author}</p>
          <p>{book.title}</p>
          <p className="book-price">${book.price}</p>

          {/* Buy Now Button */}
          <button className="buy-now-button" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>

      <div className="recommendations">
        <div className="recommendation-section">
          <h3>Recommended by Category</h3>
          <div className="recommended-books">
            {recommendedByCategory?.length > 0 ? (
              recommendedByCategory.map((item) => (
                <div key={item._id} className="recommended-book">
                  <img src={item.image} alt={item.name} />
                  <h4>{item.name}</h4>
                  <p>{item.author}</p>
                  <p>${item.price}</p>
                </div>
              ))
            ) : (
              <p>No recommendations available by category.</p>
            )}
          </div>
        </div>

        <div className="recommendation-section">
          <h3>Recommended by Description</h3>
          <div className="recommended-books">
            {recommendedByDescription?.length > 0 ? (
              recommendedByDescription.map((item) => (
                <div key={item._id} className="recommended-book">
                  <img src={item.image} alt={item.name} />
                  <h4>{item.name}</h4>
                  <p>{item.author}</p>
                  <p>${item.price}</p>
                </div>
              ))
            ) : (
              <p>No recommendations available by description.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
