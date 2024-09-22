const express = require('express');
const bookRoutes = require('./route/bookRoutes');
const userRoutes = require('./route/userRoutes');
const ratingRoutes = require('./route/ratingRoutes');
const cors = require('cors');
const mongoose = require('mongoose');
const axios=require('axios');

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
// app.get('/book/<book_id>', async (req, res) => {
//   console.log("i am here");
//   try {
//       const response = await axios.get('http://localhost:4001//book/<book_id>'); 
//       res.json(response.data);
//   } catch (err) {
//       console.error(err);
//       res.status(500).send('Error fetching books from Flask API');
//   }
// });
// Routes
app.use('/', ratingRoutes);
app.use('/book', bookRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



