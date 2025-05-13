from flask import jsonify, request
from services.author_services import AuthorService

class AuthorController:
    @staticmethod
    def get_all_authors():
        return AuthorService.get_all_authors()

    @staticmethod
    def add_author():
        data = request.json
        return AuthorService.add_author(data)

    @staticmethod
    def update_author(author_id):
        data = request.json
        return AuthorService.update_author(author_id, data)

    @staticmethod
    def delete_author(author_id):
        return AuthorService.delete_author(author_id)

    @staticmethod
    def search_authors():
        keyword = request.args.get('q', '')
        if not keyword:
            return jsonify({"success": False, "message": "Missing keyword"}), 400
        return AuthorService.search_authors(keyword)