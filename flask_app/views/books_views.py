from flask import Blueprint
from controllers.books_controllers import BookController

book_blueprint = Blueprint('books', __name__)

@book_blueprint.route('/books', methods=['GET'])
def get_all_books():
    return BookController.get_all_books()
@book_blueprint.route('/books/<int:book_id>', methods=['GET'])
def get_book_by_id(book_id):
    return BookController.get_book_by_id(book_id)
@book_blueprint.route('/books/search', methods=['GET'])
def search_books():
    return BookController.search_books()
@book_blueprint.route('/books', methods=['POST'])
def create_book():
    return BookController.create_book()

@book_blueprint.route('/books/<int:book_id>', methods=['PUT'])
def update_book(book_id):
    return BookController.update_book(book_id)

@book_blueprint.route('/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    return BookController.delete_book(book_id)
