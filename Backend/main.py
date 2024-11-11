import pandas as pd
import numpy as np
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors
from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson import ObjectId  # Import ObjectId
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = MongoClient('mongodb+srv://namanjhanwar953:naman@cluster0.vgwureu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client['test']
books_collection = db['books']

# Helper function to convert MongoDB documents to a DataFrame
def load_books_df():
    cursor = books_collection.find({}, {'title': 1, 'description': 1})
    books_list = list(cursor)
    return pd.DataFrame(books_list)

def preprocess_text(text):
    text = str(text).lower()
    return re.sub(r'[^a-z\s]', '', text)  # Use re.sub for regex replacement

# Load the books DataFrame for recommendation by description
books_df = load_books_df()
books_df['processed_description'] = books_df['description'].apply(preprocess_text)

vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = vectorizer.fit_transform(books_df['processed_description'])

n_neighbors = 6  # Number of neighbors to return, including the input book
model = NearestNeighbors(n_neighbors=n_neighbors, metric='cosine')
model.fit(tfidf_matrix)

# Create a mapping from book titles to their index
title_to_index = pd.Series(books_df.index, index=books_df['title'].apply(lambda x: x.lower()))
@app.route('/book/<book_id>', methods=['GET'])
def get_book(book_id):
    try:
        # Convert book_id to ObjectId
        book = books_collection.find_one({'_id': ObjectId(book_id)})
        if book:
            return jsonify(book_to_json(book))  # Use helper function to convert ObjectId
        else:
            return jsonify({'error': 'Book not found'}), 404
    except Exception as e:
        return jsonify({'error': f'Error fetching book: {str(e)}'}), 500

def recommend_books(title):
    if title.lower() not in title_to_index:
        return None
    idx = title_to_index[title.lower()]
    distances, indices = model.kneighbors(tfidf_matrix[idx])
    indices = indices[0][1:]  # Remove the input book from the recommendations
    return books_df['title'].iloc[indices].values.tolist()

# Helper function to convert MongoDB document to JSON serializable format
def book_to_json(book):
    book['_id'] = str(book['_id'])  # Convert ObjectId to string
    return book

@app.route('/book/recommendations/category/<category>', methods=['GET'])
def recommend_by_category(category):
    books = list(books_collection.find({'category': category}).limit(5))
    return jsonify([book_to_json(book) for book in books])

@app.route('/book/recommendations/description/<title>', methods=['GET'])
def recommend_by_description(title):
    recommendations = recommend_books(title)
    if recommendations is None:
        return jsonify({'error': 'Book not found in the database'}), 404
    return jsonify({'recommendations': recommendations})

if __name__ == '__main__':
    app.run(port=5002)