const Book = require('../model/bookModel');

// Get all books
// const sampleBooks = [
//     {
//       "name": "To Kill a Mockingbird",
//       "price": 12,
//       "category": "Fiction",
//       "image": "https://m.media-amazon.com/images/I/81gepf1eMqL.AC_UL640_QL65.jpg",
//       "title": "A novel by Harper Lee about racism and justice",
//       "author": "Harper Lee"
//     },
//     {
//       "name": "1984",
//       "price": 15,
//       "category": "Dystopian",
//       "image": "https://m.media-amazon.com/images/I/71kxa1-0mfL.AC_UL640_QL65.jpg",
//       "title": "A dystopian novel by George Orwell",
//       "author": "George Orwell"
//     },
//     {
//       "name": "The Catcher in the Rye",
//       "price": 10,
//       "category": "Classic",
//       "image": "https://m.media-amazon.com/images/I/81OthjkJBuL.AC_UL640_QL65.jpg",
//       "title": "A classic novel by J.D. Salinger",
//       "author": "J.D. Salinger"
//     },
//     {
//       "name": "Pride and Prejudice",
//       "price": 8,
//       "category": "Romance",
//       "image": "https://c7.alamy.com/comp/C9129G/crime-and-punishment-by-feodor-dostoyevsky-C9129G.jpg",
//       "title": "A romantic novel by Jane Austen",
//       "author": "Jane Austen"
//     },
//     {
//       "name": "Moby-Dick",
//       "price": 18,
//       "category": "Adventure",
//       "image": " https://image.tmdb.org/t/p/original/wGnBI8o5Wbd7ZsXJb1emZtqeNtW.jpg ",
//       "title": "An adventure novel by Herman Melville",
//       "author": "Herman Melville"
//     },

//     {
//       "name": "Brave New World",
//       "price": 14,
//       "category": "Dystopian",
//       "image": " https://upload.wikimedia.org/wikipedia/en/6/62/BraveNewWorld_FirstEdition.jpg ",
//       "title": "A dystopian novel by Aldous Huxley",
//       "author": "Aldous Huxley"
//     },
//     {
//       "name": "The Hobbit",
//       "price": 20,
//       "category": "Fantasy",
//       "image": "https://m.media-amazon.com/images/I/91b0C2YNSrL.AC_UL640_QL65.jpg",
//       "title": "A fantasy novel by J.R.R. Tolkien",
//       "author": "J.R.R. Tolkien"
//     },
//     {
//       "name": "War and Peace",
//       "price": 25,
//       "category": "Historical Fiction",
//       "image": " https://cdn.kobo.com/book-images/0c45fac3-d38e-4ae9-a5c8-a657839db23d/353/569/90/False/war-and-peace-105.jpg ",
//       "title": "A historical novel by Leo Tolstoy",
//       "author": "Leo Tolstoy"
//     },
//     {
//       "name": "The Odyssey",
//       "price": 13,
//       "category": "Epic",
//       "image": " https://monsieurdidot.com/wp-content/uploads/2020/02/The-Odyssey.jpg ",
//       "title": "An epic poem by Homer",
//       "author": "Homer"
//     }
//   ];

// // Inserting books into the database
// Book.insertMany(sampleBooks)
//   .then(() => {
//     console.log("Books inserted successfully!");
//   })
//   .catch((error) => {
//     console.error("Error inserting books: ", error);
//   });

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new book
exports.createBook = async (req, res) => {
    const { title, author, category, description, price } = req.body;

    try {
        const book = new Book({
            title,
            author,
            category,
            description,
            price,
        });

        const savedBook = await book.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
