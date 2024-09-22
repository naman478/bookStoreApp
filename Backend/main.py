import pandas as pd
import numpy as np
import re
from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson import ObjectId  
from flask_cors import CORS
from collections import defaultdict

# Initialize Flask app and enable CORS
app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = MongoClient('mongodb+srv://namanjhanwar953:naman@cluster0.vgwureu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client['test']
books_collection = db['books']

# Load books from MongoDB and create a DataFrame
def load_books_df():
    cursor = books_collection.find({}, {'title': 1, 'description': 1, 'category': 1})
    books_list = list(cursor)
    return pd.DataFrame(books_list)

# Preprocess text (lowercase, remove punctuation)
def preprocess_text(text):
    text = str(text).lower()
    return re.sub(r'[^a-z\s]', '', text)  # Remove punctuation and convert to lowercase

# Step 1: Calculate Word Frequency and Uniqueness Scores
def calculate_word_frequencies(books_df):
    word_counts = defaultdict(int)
    total_books = len(books_df)

    for desc in books_df['processed_description']:
        words = desc.split()
        for word in words:
            word_counts[word] += 1

    # Assign a uniqueness score based on how infrequently a word appears
    word_uniqueness = {word: total_books / count for word, count in word_counts.items()}
    return word_uniqueness

# Step 2: Create a Uniqueness-Weighted Sequence for Each Book
def create_weighted_sequences(books_df, word_uniqueness):
    sequences = []
    for desc in books_df['processed_description']:
        words = desc.split()
        sequence = [(word, word_uniqueness.get(word, 0)) for word in words]
        sequences.append(sequence)
    return sequences

# Step 3: Custom Sequence Matching Algorithm (compare word sequences and weight matches)
def sequence_match_score(seq1, seq2):
    score = 0
    seq1_words = [word for word, _ in seq1]
    seq2_words = [word for word, _ in seq2]
   
    min_len = min(len(seq1_words), len(seq2_words))
   
    # Compare word sequences element by element and calculate score based on matches
    for i in range(min_len):
        if seq1_words[i] == seq2_words[i]:  # Word sequence match
            score += (seq1[i][1] + seq2[i][1])  # Add uniqueness scores for matching words
   
    # Normalize score by sequence length to avoid favoring shorter descriptions
    normalized_score = score / max(len(seq1_words), len(seq2_words))
    return normalized_score

# Load books and preprocess descriptions
books_df = load_books_df()
books_df['processed_description'] = books_df['description'].apply(preprocess_text)

# Calculate word uniqueness and weighted sequences
word_uniqueness = calculate_word_frequencies(books_df)
book_sequences = create_weighted_sequences(books_df, word_uniqueness)

# Create a mapping from book titles to their index
title_to_index = pd.Series(books_df.index, index=books_df['title'].apply(lambda x: x.lower()))

# Helper function to convert MongoDB document to JSON serializable format
def book_to_json(book):
    book['_id'] = str(book['_id'])  # Convert ObjectId to string
    return book

@app.route('/book/<book_id>', methods=['GET'])
def get_book(book_id):
    try:
        # Convert book_id to ObjectId
        book = books_collection.find_one({'_id': ObjectId(book_id)})
        if book:
            return jsonify(book_to_json(book))  # Return book details as JSON
        else:
            return jsonify({'error': 'Book not found'}), 404
    except Exception as e:
        return jsonify({'error': f'Error fetching book: {str(e)}'}), 500

# Custom book recommendation function based on new algorithm
def recommend_books(title):
    try:
        if title.lower() not in title_to_index:
            return None
        idx = title_to_index[title.lower()]
        book_seq = book_sequences[idx]
       
        # Compute similarity for all books based on sequence matching
        similarities = [sequence_match_score(book_seq, other_seq) for other_seq in book_sequences]
        similar_indices = np.argsort(similarities)[::-1][1:6]  # Get top 5 similar books (excluding the input book)
       
        return books_df['title'].iloc[similar_indices].values.tolist()
    except Exception as e:
        print(f"Error in recommend_books: {e}")
        return None

# Recommendations by description (full details)
@app.route('/book/recommendations/description/<title>', methods=['GET'])
def recommend_by_description(title):
    try:
        recommendations = recommend_books(title)
        if recommendations is None:
            return jsonify({'error': 'Book not found in the database'}), 404
        return jsonify({'recommendations': recommendations})
    except Exception as e:
        return jsonify({'error': f'Error fetching recommendations by description: {str(e)}'}), 500

# Recommendations by category
@app.route('/book/recommendations/category/<category>', methods=['GET'])
def recommend_by_category(category):
    try:
        recommendations = books_df[books_df['category'] == category]['title'].tolist()
        if not recommendations:
            return jsonify({'error': 'No books found in this category'}), 404
        return jsonify({'recommendations': recommendations})
    except Exception as e:
        return jsonify({'error': f'Error fetching recommendations by category: {str(e)}'}), 500

if __name__ == '__main__':
    try:
        app.run(port=6000)
    except Exception as e:
        print(f"Error starting the server: {e}")
