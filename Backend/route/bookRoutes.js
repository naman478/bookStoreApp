const express = require('express');
const { getAllBooks, createBook } = require('../controller/bookController');
const router = express.Router();
const Book = require('../model/bookModel');

router.get('/', getAllBooks);
router.post('/', createBook);
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
