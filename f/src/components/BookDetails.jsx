import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./BookDetails.css";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [recommendedByCategory, setRecommendedByCategory] = useState([]);
  const [recommendedByDescription, setRecommendedByDescription] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        // Fetch book details
        const res = await axios.get(`http://localhost:4001/book/${id}`);
        setBook(res.data);

        // Fetch recommendations by category
        const categoryRes = await axios.get(
          `http://localhost:4001/book/recommendations/category/${res.data.category}`
        );
        setRecommendedByCategory(categoryRes.data);

        // Fetch recommendations by description
        const descriptionRes = await axios.get(
          `http://localhost:4001/book/recommendations/description/${res.data.title}`
        );
        setRecommendedByDescription(descriptionRes.data.recommendations);

        // Fetch book details for recommendations
        const recommendedBooksRes = await axios.post(
          "http://localhost:4001/book/titlee",
          { titles: descriptionRes.data.recommendations }
        );
        setRecommendedByDescription(recommendedBooksRes.data);

      } catch (error) {
        console.error("Error fetching book details or recommendations: ", error);
      }
    };

    fetchBook();
  }, [id]);

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
                <p>${item.price}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="recommendation-section">
          <h3>Recommended by Description</h3>
          <div className="recommended-books">
            {recommendedByDescription.map((item) => (
              <div key={item._id} className="recommended-book">
                <img src={item.image} alt={item.name} />
                <h4>{item.name}</h4>
                <p>{item.author}</p>
                <p>${item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
