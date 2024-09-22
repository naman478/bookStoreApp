const express = require('express');
const router = express.Router();
const Rating = require('../model/ratingModel');

// Post a rating for a book
router.post('/:bookId/rate', async (req, res) => {
    const { userId, rating, review } = req.body;
    const { bookId } = req.params;

    try {
        const newRating = new Rating({
            userId,
            bookId,
            rating,
            review,
        });
        await newRating.save();
        res.status(201).json(newRating);
    } catch (error) {
        res.status(500).json({ message: 'Error submitting rating', error });
    }
});

const Book = require('../model/bookModel');

// API to get average rating for each book
router.get('/analytics', async (req, res) => {
  try {
    const ratings = await Rating.aggregate([
      {
        $group: {
          _id: "$bookId",
          avgRating: { $avg: "$rating" },
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'bookInfo'
        }
      },
      {
        $unwind: "$bookInfo"
      },
      {
        $project: {
          _id: 1,
          avgRating: 1,
          count: 1,
          bookName: "$bookInfo.name",
          author: "$bookInfo.author"
        }
      }
    ]);
    
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


// Get ratings for a specific book
router.get('/:bookId/ratings', async (req, res) => {
    const { bookId } = req.params;
    try {
        const ratings = await Rating.find({ bookId }).populate('userId', 'fullname');
        res.json(ratings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching ratings', error });
    }
});

module.exports = router;
