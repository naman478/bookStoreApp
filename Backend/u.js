const Book = require('./model/bookModel'); // Your book model

const sampleBooks = [
    {
      "name": "The Great Gatsby",
      "price": 10,
      "category": "Fiction",
      "image": "https://example.com/gatsby.jpg",
      "title": "A classic novel by F. Scott Fitzgerald",
      "author": "F. Scott Fitzgerald"
    },
    {
      "name": "1984",
      "price": 12,
      "category": "Dystopian",
      "image": "https://example.com/1984.jpg",
      "title": "A novel about a dystopian future",
      "author": "George Orwell"
    },
    {
      "name": "To Kill a Mockingbird",
      "price": 15,
      "category": "Fiction",
      "image": "https://example.com/mockingbird.jpg",
      "title": "A novel of racial injustice",
      "author": "Harper Lee"
    },
    {
      "name": "The Catcher in the Rye",
      "price": 10,
      "category": "Fiction",
      "image": "https://example.com/catcher.jpg",
      "title": "A story of teenage rebellion",
      "author": "J.D. Salinger"
    },
    {
      "name": "Pride and Prejudice",
      "price": 8,
      "category": "Romance",
      "image": "https://example.com/pride.jpg",
      "title": "A classic romance novel",
      "author": "Jane Austen"
    }
  ];

// Inserting books into the database
Book.insertMany(sampleBooks)
  .then(() => {
    console.log("Books inserted successfully!");
  })
  .catch((error) => {
    console.error("Error inserting books: ", error);
  });
