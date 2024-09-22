import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import './AdminPanel.css'; // Add your CSS here
import Footer from './Footer';
import Navbar from './Navbar';

const AdminPanel = () => {
  const [ratingsData, setRatingsData] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get('http://localhost:4001/analytics');
        setRatingsData(response.data);
      } catch (error) {
        console.error("Error fetching analytics: ", error);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <>
    <Navbar/>
    
    <div className="admin-panel">
      <h1>Admin Panel - Book Ratings Analytics</h1>

      {ratingsData.length === 0 ? (
        <p>Loading analytics...</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={ratingsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="bookName" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="avgRating" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}

      <div className="table-container">
        <h2>Detailed Ratings Data</h2>
        <table>
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Author</th>
              <th>Average Rating</th>
              <th>Number of Ratings</th>
            </tr>
          </thead>
          <tbody>
            {ratingsData.map((item) => (
              <tr key={item._id}>
                <td>{item.bookName}</td>
                <td>{item.author}</td>
                <td>{item.avgRating.toFixed(2)}</td>
                <td>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AdminPanel;
