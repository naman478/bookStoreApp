import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./BookDetails.css";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [recommendedByCategory, setRecommendedByCategory] = useState([]);
  const [recommendedByAuthor, setRecommendedByAuthor] = useState([]);
  const [recommendedByTags, setRecommendedByTags] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:4001/book/${id}`);
        setBook(res.data);

        // Fetch recommendations
        const categoryRes = await axios.get(`http://localhost:4001/recommendations/category/${res.data.category}`);
        setRecommendedByCategory(categoryRes.data);

        const authorRes = await axios.get(`http://localhost:4001/recommendations/author/${res.data.author}`);
        setRecommendedByAuthor(authorRes.data);

        const tagsRes = await axios.get(`http://localhost:4001/recommendations/tags/${res.data.tags.join(',')}`);
        setRecommendedByTags(tagsRes.data);
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
              </div>
            ))}
          </div>
        </div>

        <div className="recommendation-section">
          <h3>Recommended by Author</h3>
          <div className="recommended-books">
            {recommendedByAuthor.map((item) => (
              <div key={item._id} className="recommended-book">
                <img src={item.image} alt={item.name} />
                <h4>{item.name}</h4>
                <p>{item.author}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="recommendation-section">
          <h3>Recommended by Tags</h3>
          <div className="recommended-books">
            {recommendedByTags.map((item) => (
              <div key={item._id} className="recommended-book">
                <img src={item.image} alt={item.name} />
                <h4>{item.name}</h4>
                <p>{item.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
