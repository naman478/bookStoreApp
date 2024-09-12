const express = require('express');
const bookRoutes = require('./route/bookRoutes');
const userRoutes = require('./route/userRoutes');
const cors = require('cors');
const mongoose = require('mongoose');

// dotenv.config();
const app = express();

// Connect to database
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

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



