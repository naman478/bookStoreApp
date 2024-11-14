import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {useAuth} from '../context/AuthProvider';
import "./BookDetails.css";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [recommendedByCategory, setRecommendedByCategory] = useState([]);
  const [recommendedByDescription, setRecommendedByDescription] = useState([]);
  const [userId]=useAuth();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:5002/book/${id}`);
        setBook(res.data);

        const categoryRes = await axios.get(
          `http://localhost:5002/book/recommendations/category/${res.data.category}`
        );
        setRecommendedByCategory(categoryRes.data);

        const descriptionRes = await axios.get(
          `http://localhost:5002/book/recommendations/description/${res.data.title}`
        );
        setRecommendedByDescription(descriptionRes.data.recommendations);
      } catch (error) {
        console.error("Error fetching book details or recommendations: ", error);
      }
    };

    fetchBook();
  }, [id]);

  const handleBuyNow = async () => {
    try {
      await axios.post("http://localhost:4001/purchase", {
        userId: userId._id,
        bookId: id,
      });
      alert("Book purchased successfully!");
      navigate(`/purchase/${userId}`);
    } catch (error) {
      console.error("Error during purchase:", error);
      alert("Failed to purchase the book. Please try again.");
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div className="book-detail-container">
      <div className="book-detail-card">
        <img className="book-detail-image" src={book.image} alt={book.name} />
        <div className="book-detail-info">
          <h1 className="book-title">{book.name}</h1>
          <p className="book-author">by {book.author}</p>
          <p>{book.title}</p>
          <p className="book-price">${book.price}</p>
          <button
            onClick={handleBuyNow}
            className="mt-4 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300"
          >
            Buy Now
          </button>
        </div>
      </div>
      
      <div className="recommendations">
        <h2>Recommended Books</h2>

        <div className="recommendation-section">
          <h3>Recommended by Category</h3>
          <div className="recommended-books">
            {recommendedByCategory.map((item) => (
              <div key={item._id} className="recommended-book">
                <img src={item.image} alt={item.name} />
                <h4>{item.name}</h4>
                <p>{item.author}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="recommendation-section">
          <h3>Recommended by Description</h3>
          <div className="recommended-books">
            {recommendedByDescription.map((item, index) => (
              <div key={index} className="recommended-book">
                <h4>{item}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
