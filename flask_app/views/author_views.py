from flask import Blueprint
from controllers.author_controller import AuthorController

author_blueprint = Blueprint("authors", __name__)

@author_blueprint.route('/authors', methods=['GET'])
def get_all_authors():
    return AuthorController.get_all_authors()

@author_blueprint.route('/authors', methods=['POST'])
def add_author():
    return AuthorController.add_author()

@author_blueprint.route('/authors/<int:author_id>', methods=['PUT'])
def update_author(author_id):
    return AuthorController.update_author(author_id)

@author_blueprint.route('/authors/<int:author_id>', methods=['DELETE'])
def delete_author(author_id):
    return AuthorController.delete_author(author_id)

@author_blueprint.route('/authors/search', methods=['GET'])
def search_authors():
    return AuthorController.search_authors()