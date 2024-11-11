const express = require('express');
const bookRoutes = require('./route/bookRoutes.js');
const userRoutes = require('./route/userRoutes.js');
const purchaseRoutes = require('./route/purchaseRoutes.js'); // Import the purchase routes
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://namanjhanwar953:naman@cluster0.vgwureu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/book', bookRoutes);
app.use('/user', userRoutes);
app.use('/purchase', purchaseRoutes); // Add the purchase routes

const PORT = 4001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
