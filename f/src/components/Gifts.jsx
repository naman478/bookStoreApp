import React, { useEffect, useState } from "react";
import Cards from "./CardsGifts.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from './Navbar';
import Footer from './Footer';

function Gift() {
  const [book, setBook] = useState([]);
  const [giftItems, setGiftItems] = useState([]);
  const [topBooks, setTopBooks] = useState([]); // New state for top popular books
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [authorFilter, setAuthorFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const authors = [
    "Harper Lee", 
    "George Orwell", 
    "J.D. Salinger", 
    "Jane Austen", 
    "Herman Melville", 
    "Aldous Huxley"
  ];

  const categories = [
    "Adventure", 
    "Fantasy", 
    "Classic", 
    "Dystopian", 
    "Historical Fiction", 
    "Epic"
  ];

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");
        setBook(res.data);
        setFilteredBooks(res.data); // Initialize with all books
      } catch (error) {
        console.log(error);
      }
    };
    getBooks();
  }, []);

  useEffect(() => {
    const getGiftItems = async () => {
      try {
        const res = await axios.get("http://localhost:4001/gift");
        setGiftItems(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getGiftItems();
  }, []);

  // New useEffect to fetch top popular books
  useEffect(() => {
    const getTopBooks = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book/top-popular-books");
        setTopBooks(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTopBooks();
  }, []);

  const handleFilter = () => {
    const filtered = book.filter((item) => {
      const matchesAuthor = authorFilter ? item.author === authorFilter : true;
      const matchesCategory = categoryFilter ? item.category === categoryFilter : true;
      return matchesAuthor && matchesCategory;
    });
    setFilteredBooks(filtered);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        {/* Header Section */}
        <div className="mt-28 flex flex-col items-center justify-center text-center space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
            Find the Perfect{" "}
            <span className="text-pink-500">Gift for Your Loved Ones! 🎁</span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl">
            Whether it's for a birthday, anniversary, or just a simple gesture of
            appreciation, our collection of handpicked gifts is here to help you
            make someone’s day. Explore a variety of unique and thoughtful gifts
            to express your love and care in the most special way.
          </p>
          <div className="flex space-x-4">
            <Link to="/gifts">
              <button className="bg-pink-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-pink-600 hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
                Back
              </button>
            </Link>
            <Link to="/explore-gifts">
              <button className="bg-pink-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-pink-600 hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
                Explore More Gifts
              </button>
            </Link>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mt-6 flex justify-center space-x-4">
          <select onChange={(e) => setAuthorFilter(e.target.value)} className="border border-gray-300 p-2 rounded-md">
            <option value="">All Authors</option>
            {authors.map((author) => (
              <option key={author} value={author}>{author}</option>
            ))}
          </select>
          <select onChange={(e) => setCategoryFilter(e.target.value)} className="border border-gray-300 p-2 rounded-md">
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <button 
            onClick={handleFilter} 
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Filter
          </button>
        </div>
           {/* Cards Section for Top Popular Books */}
           <div className="mt-12">
          <h2 className="text-2xl font-bold">Top 4 Popular Books</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-4">
            {topBooks.map((item) => (
              <Cards key={item._id} item={item} />
            ))}
          </div>
        </div>
        {/* Cards Section for Filtered Books */}
        <h2 className="text-2xl font-bold">Choose the Gifts</h2>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredBooks.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div> 
       

        {/* Cards Section for Gift Items */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {giftItems.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>

      
      </div>
      <Footer />
    </>
  );
}

export default Gift;
