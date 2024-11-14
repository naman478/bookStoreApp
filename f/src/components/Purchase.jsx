import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Purchase.css";
import { useAuth } from '../context/AuthProvider';
import Navbar from "./Navbar";
import { FaDownload } from 'react-icons/fa'; // Importing download icon

const Purchase = () => {
  const [purchasedBooks, setPurchasedBooks] = useState([]);
  const navigate = useNavigate();
  const [userId] = useAuth();
  console.log(userId);

  // Fetch purchased books for the user
  useEffect(() => {
    const fetchPurchasedBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/purchase/${userId._id}`);
        setPurchasedBooks(response.data.purchasedBooks);
      } catch (error) {
        console.error("Error fetching purchased books:", error);
      }
    };
    
    fetchPurchasedBooks();
  }, []);

  // Function to get the appropriate file name for download
  const getDownloadLink = (bookName) => {
    const books = {
      'The Catcher in the Rye': 'biodiversity.pdf',
      'The Hobbit': 'nuclear_energy.pdf',
      'Brave New World': 'quantum_computing.pdf',
      'Moby-Dick': 'global_warming.pdf',
      'The Catcher in the Rye': 'ozone_layer_depletion.pdf',
      'Climate': 'climate.pdf',
    };
    return `/public/${books[bookName]}` || '#';
  };

  return (
    <>
      <Navbar />
      
      <div className="purchase-container">
        <div className="upper_purchase_container">
          <h1 className="purchase-heading">Use our AI tools to make your read easy</h1>
          
          <div className="purchase-options">
            <div className="purchase-buttons-container">
              <button
                onClick={() => window.location.href = `http://localhost:8501/`}
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
                    <a
                      href={getDownloadLink(book.name)} 
                      download 
                      className="download-button"
                    >
                      <FaDownload size={19} /><div style={{marginLeft:"12px"}}></div> Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No books purchased yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Purchase;
