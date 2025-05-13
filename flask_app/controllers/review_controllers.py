from flask import jsonify, request
from services.review_services import ReviewService

class ReviewController:
    @staticmethod
    def get_all_reviews(book_id):
        return ReviewService.get_all_review(book_id)
    @staticmethod
    def add_review(data):
        return ReviewService.add_review(data)
    @staticmethod
    def get_all_reviews_with_details():
        return ReviewService.get_all_reviews_with_details()
    @staticmethod
    def update_review_status(review_id, new_status):
        return ReviewService.update_review_status(review_id, new_status)
    @staticmethod
    def delete_review(review_id):
        return ReviewService.delete_review(review_id)
    @staticmethod
    def search_reviews(search_query):
        return ReviewService.search_reviews(search_query)