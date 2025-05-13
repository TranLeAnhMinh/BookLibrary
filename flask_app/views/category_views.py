from flask import Blueprint
from controllers.category_controllers import CategoryController

category_blueprint = Blueprint("categories", __name__)

@category_blueprint.route('/categories', methods=['GET'])
def get_all_categories():
    return CategoryController.get_all_categories()

@category_blueprint.route('/categories', methods=['POST'])
def add_category():
    return CategoryController.add_category()

@category_blueprint.route('/categories/<int:category_id>', methods=['PUT'])
def update_category(category_id):
    return CategoryController.update_category(category_id)

@category_blueprint.route('/categories/<int:category_id>', methods=['DELETE'])
def delete_category(category_id):
    return CategoryController.delete_category(category_id)