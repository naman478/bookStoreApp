// const express = require('express');
// const { getAllBooks, createBook } = require('../controller/bookController');
// const router = express.Router();
// const axios = require('axios');

// router.get('/', getAllBooks);
// router.post('/', createBook);

// // Get book by ID
// router.get('/:id', async (req, res) => {
//     const id = req.params.id;
//     try {
//         const response = await axios.get(`http://localhost:6000/book/${id}`);
//         console.log(response.data);
//         res.json(response.data);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error fetching book from Flask API');
//     }
// });

// // Recommendations routes
// router.get('/recommendations/category/:category', async (req, res) => {
//     const category = req.params.category;
//     console.log("category");
//     console.log(category);
//     console.log("category");
//     try {
//         const response = await axios.get(`http://localhost:6000/book/recommendations/category/${category}`);
//         res.json(response.data);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error fetching recommendations by category from Flask API');
//     }
// });

// router.get('/recommendations/author/:author', async (req, res) => {
//     const author = req.params.author;
//     try {
//         const response = await axios.get(`http://localhost:6000/book/recommendations/author/${author}`);
//         res.json(response.data);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error fetching recommendations by author from Flask API');
//     }
// });

// router.get('/recommendations/tags/:tags', async (req, res) => {
//     const tags = req.params.tags;
//     try {
//         const response = await axios.get(`http://localhost:6000/book/recommendations/tags/${tags}`);
//         res.json(response.data);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error fetching recommendations by tags from Flask API');
//     }
// });

// module.exports = router;

const express = require('express');
const { getAllBooks, createBook } = require('../controller/bookController');
const router = express.Router();
const axios = require('axios');
const Book = require('../model/bookModel');
router.get('/', getAllBooks);
router.post('/', createBook);

router.post('/titlee', async (req, res) => {
    try {
        console.log(req.body);
        const { titles } = req.body;
        console.log(!Array.isArray(titles));
        if (!Array.isArray(titles)) {
            return res.status(400).json({ message: 'Titles must be an array and cannot be empty.' });
        }

        // Find books by the array of titles
        const books = await Book.find({ title: { $in: titles } });
        
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get book by ID
router.get('/:id', async (req, res) => {
    console.log("ooo");
    const id = req.params.id;
    try {
        const response = await axios.get(`http://localhost:6000/book/${id}`);
        console.log(response);
        res.json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching book from Flask API');
    }
});

// Recommendations by category
router.get('/recommendations/category/:category', async (req, res) => {
    const category = req.params.category;
    console.log(category);
    try {
        const response = await axios.get(`http://localhost:6000/book/recommendations/category/${category}`);
        res.json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching recommendations by category from Flask API');
    }
});

// // Recommendations by author
// router.get('/recommendations/author/:author', async (req, res) => {
//     const author = req.params.author;
//     try {
//         const response = await axios.get(`http://localhost:6000/book/recommendations/author/${author}`);
//         res.json(response.data);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error fetching recommendations by author from Flask API');
//     }
// });


// Recommendations by description (full details)
router.get('/recommendations/description/:title', async (req, res) => {
    const title = req.params.title;
    try {
        const response = await axios.get(`http://localhost:6000/book/recommendations/description/${title}`);
        console.log(response.data);
        res.json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching recommendations by description from Flask API');
    }
});


module.exports = router;
