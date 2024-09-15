import React from "react";
import { useNavigate } from "react-router-dom";

function Cards({ item }) {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate(`/book/${item._id}`); // Redirect to book details page with book ID
  };

  return (
    <div className="mt-4 my-3 p-3 flex justify-center">
      <div className="card w-80 h-[400px] bg-white shadow-lg border border-gray-300 flex flex-col rounded-lg overflow-hidden hover:scale-105 transform duration-200">
        <figure className="flex-shrink-0">
          <img className="w-full h-48 object-cover" src={item.image} alt={item.name} />
        </figure>
        <div className="card-body flex flex-col justify-between p-4 flex-grow">
          <h2 className="card-title text-xl font-bold mb-2 flex justify-between items-center text-gray-900">
            {item.name}
            <div className="badge badge-secondary text-gray-800">{item.category}</div>
          </h2>
          <p className="mb-4 text-gray-700">{item.title}</p>
          <div className="card-actions flex justify-between items-center">
            <div className="badge badge-outline text-lg text-gray-900">${item.price}</div>
            <div
              onClick={handleBuyNow}
              className="cursor-pointer px-3 py-1 rounded-full border-2 border-gray-300 bg-pink-500 text-white hover:bg-pink-600 transition duration-200"
            >
              Buy Now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
