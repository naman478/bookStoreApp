from flask import Flask, jsonify, request
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient('mongodb+srv://namanjhanwar953:naman@cluster0.vgwureu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client['bookstore']
books_collection = db['books']

@app.route('/book/<book_id>', methods=['GET'])
def get_book(book_id):
    book = books_collection.find_one({'_id': book_id})
    return jsonify(book) if book else ('Not Found', 404)

@app.route('/recommendations/category/<category>', methods=['GET'])
def recommend_by_category(category):
    books = list(books_collection.find({'category': category}).limit(5))
    return jsonify(books)

@app.route('/recommendations/author/<author>', methods=['GET'])
def recommend_by_author(author):
    books = list(books_collection.find({'author': author}).limit(5))
    return jsonify(books)

@app.route('/recommendations/tags/<tags>', methods=['GET'])
def recommend_by_tags(tags):
    tags_list = tags.split(',')
    books = list(books_collection.find({'tags': {'$in': tags_list}}).limit(5))
    return jsonify(books)

if __name__ == '__main__':
    app.run(port=4000)
