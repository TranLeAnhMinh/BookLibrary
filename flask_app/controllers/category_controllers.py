from flask import jsonify, request
from services.category_services import CategoryService

class CategoryController:
    @staticmethod
    def get_all_categories():
        return CategoryService.get_all_categories()

    @staticmethod
    def add_category():
        return CategoryService.add_category()

    @staticmethod
    def update_category(category_id):
        return CategoryService.update_category(category_id)

    @staticmethod
    def delete_category(category_id):
        return CategoryService.delete_category(category_id)