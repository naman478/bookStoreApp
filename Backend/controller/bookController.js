const Book = require('../model/bookModel');

// const sampleBooks = [
//         {
//           "name": "To Kill a Mockingbird",
//           "price": 12,
//           "category": "Fiction",
//           "image": "https://m.media-amazon.com/images/I/81gepf1eMqL.AC_UL640_QL65.jpg",
//           "title": "A novel by Harper Lee exploring moral themes",
//           "author": "Harper Lee",
//           "description": "A classic novel that explores moral issues and human experiences through compelling storytelling."
//         },
//         {
//           "name": "1984",
//           "price": 15,
//           "category": "Dystopian",
//           "image": "https://m.media-amazon.com/images/I/71kxa1-0mfL.AC_UL640_QL65.jpg",
//           "title": "A dystopian novel by George Orwell",
//           "author": "George Orwell",
//           "description": "A thought-provoking dystopian novel that examines the impact of totalitarian regimes on society."
//         },
//         {
//           "name": "The Catcher in the Rye",
//           "price": 10,
//           "category": "Classic",
//           "image": "https://m.media-amazon.com/images/I/81OthjkJBuL.AC_UL640_QL65.jpg",
//           "title": "A novel by J.D. Salinger about personal growth",
//           "author": "J.D. Salinger",
//           "description": "A classic novel that delves into the complexities of adolescence and the search for identity."
//         },
//         {
//           "name": "Pride and Prejudice",
//           "price": 8,
//           "category": "Romance",
//           "image": "https://c7.alamy.com/comp/C9129G/crime-and-punishment-by-feodor-dostoyevsky-C9129G.jpg",
//           "title": "A romantic novel by Jane Austen",
//           "author": "Jane Austen",
//           "description": "A beloved romance novel that explores themes of love and social norms in a historical context."
//         },
//         {
//           "name": "Moby-Dick",
//           "price": 18,
//           "category": "Adventure",
//           "image": "https://image.tmdb.org/t/p/original/wGnBI8o5Wbd7ZsXJb1emZtqeNtW.jpg",
//           "title": "An adventure novel by Herman Melville",
//           "author": "Herman Melville",
//           "description": "An epic adventure that follows a quest for vengeance and explores the human condition."
//         },
//         {
//           "name": "Brave New World",
//           "price": 14,
//           "category": "Dystopian",
//           "image": "https://upload.wikimedia.org/wikipedia/en/6/62/BraveNewWorld_FirstEdition.jpg",
//           "title": "A dystopian novel by Aldous Huxley",
//           "author": "Aldous Huxley",
//           "description": "A novel depicting a future society shaped by technology and social control, exploring its effects on humanity."
//         },
//         {
//           "name": "The Hobbit",
//           "price": 20,
//           "category": "Fantasy",
//           "image": "https://m.media-amazon.com/images/I/91b0C2YNSrL.AC_UL640_QL65.jpg",
//           "title": "A fantasy novel by J.R.R. Tolkien",
//           "author": "J.R.R. Tolkien",
//           "description": "A fantasy adventure that takes readers on a magical journey filled with mythical creatures and epic quests."
//         },
//         {
//           "name": "War and Peace",
//           "price": 25,
//           "category": "Historical Fiction",
//           "image": "https://cdn.kobo.com/book-images/0c45fac3-d38e-4ae9-a5c8-a657839db23d/353/569/90/False/war-and-peace-105.jpg",
//           "title": "A historical novel by Leo Tolstoy",
//           "author": "Leo Tolstoy",
//           "description": "A sweeping historical novel that portrays the impact of war on individuals and society in a richly detailed narrative."
//         },
//         {
//           "name": "The Odyssey",
//           "price": 13,
//           "category": "Epic",
//           "image": "https://monsieurdidot.com/wp-content/uploads/2020/02/The-Odyssey.jpg",
//           "title": "An epic poem by Homer",
//           "author": "Homer",
//           "description": "An epic tale of heroism and adventure, following the journey of a hero striving to return home."
//         }
         
// ];
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
