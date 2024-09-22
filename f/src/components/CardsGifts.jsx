import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Cards({ item }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleBuyNow = () => {
    setShowModal(true); // Open the modal when "Gift" is clicked
  };

  const handleProceedToPayment = () => {
    // Proceed to the payment page after form submission
    navigate(`/payment/${item._id}`);
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
              Gift
            </div>
          </div>
        </div>
      </div>

      {/* Modal for the form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Gift Form</h2>
            <form className="space-y-4">
              <div>
                <label className="block mb-2 font-bold">Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block mb-2 font-bold">Address</label>
                <input
                  type="text"
                  placeholder="Enter address"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block mb-2 font-bold">Message</label>
                <textarea
                  placeholder="Enter message"
                  className="w-full p-2 border border-gray-300 rounded"
                ></textarea>
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={handleProceedToPayment}
                >
                  Proceed to Payment
                </button>
                <button
                  type="button"
                  className="text-red-500 font-bold"
                  onClick={() => setShowModal(false)} // Close the modal
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cards;
