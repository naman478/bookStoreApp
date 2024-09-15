import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";

function Course() {
  const [book, setBook] = useState([]);
  
  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");
        console.log(res.data);
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        {/* Header Section */}
        <div className="mt-28 flex flex-col items-center justify-center text-center space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
            We're delighted to have you{" "}
            <span className="text-pink-500">Here! :)</span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl">
          We are thrilled to welcome you to our little haven of literature and learning. Here, we're passionate about connecting you with the stories, knowledge, and adventures that fuel your imagination and enrich your life. Whether you're searching for the latest bestsellers, timeless classics, or hidden gems, our curated selection is designed to delight readers of all kinds.
          </p>
          <Link to="/">
            <button className="bg-pink-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-pink-600 hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
              Back
            </button>
          </Link>
        </div>
        
        {/* Cards Section */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {book.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Course;
