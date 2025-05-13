from flask import request, jsonify, abort
from models.book import Book
from services.book_services import BookService

class BookController:
    @staticmethod
    def get_all_books():
        return BookService.get_all_books()
    @staticmethod
    def get_book_by_id(book_id):  
        return BookService.get_book_by_id(book_id)
    @staticmethod
    def search_books():
        from flask import request
        keyword = request.args.get('q', '')
        if not keyword:
            return jsonify({"success": False, "message": "Missing search keyword"}), 400
        return BookService.search_books(keyword)
    @staticmethod
    def create_book():
        from flask import request
        data = request.get_json()
        return BookService.create_book(data)

    @staticmethod
    def update_book(book_id):
        from flask import request
        data = request.get_json()
        return BookService.update_book(book_id, data)

    @staticmethod
    def delete_book(book_id):
        return BookService.delete_book(book_id)