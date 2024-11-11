import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Purchase.css";

const Purchase = () => {
  const [purchasedBooks, setPurchasedBooks] = useState([]);
  const navigate = useNavigate();

  // Fetch purchased books for the user
  useEffect(() => {
    const fetchPurchasedBooks = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage or context
        const response = await axios.get(`http://localhost:4001/purchase/${userId}`);
        setPurchasedBooks(response.data.purchasedBooks);
      } catch (error) {
        console.error("Error fetching purchased books:", error);
      }
    };
    
    fetchPurchasedBooks();
  }, []);

  return (
    <div className="purchase-container">
      <h1 className="purchase-heading">Your Purchases</h1>
      
      <div className="purchase-options">
        <h2>Additional Purchase Options</h2>
        <div className="purchase-buttons-container">
          <button
            onClick={() => window.location.href = `http://localhost:5175`}
            className="purchase-button"
          >
            Chat with PDF
          </button>
          <button
            onClick={() => {
              const token = localStorage.getItem("token"); // Ensure token is available
              localStorage.setItem("token", token);
              window.location.href = `http://localhost:5174`;
            }}
            className="purchase-button"
          >
            PDF Summarizer
          </button>
        </div>
      </div>

      <div className="purchased-books-section">
        <h2>Purchased Books</h2>
        {purchasedBooks.length > 0 ? (
          <div className="purchased-books-list">
            {purchasedBooks.map((book) => (
              <div key={book._id} className="purchased-book-card">
                <img src={book.image} alt={book.name} className="book-image" />
                <div className="book-details">
                  <h2>{book.name}</h2>
                  <p>by {book.author}</p>
                  <p>Price: ${book.price}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No books purchased yet.</p>
        )}
      </div>
    </div>
  );
};

export default Purchase;
