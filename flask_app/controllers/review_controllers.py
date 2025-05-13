from flask import jsonify, request
from services.review_services import ReviewService

class ReviewController:
    @staticmethod
    def get_all_reviews(book_id):
        return ReviewService.get_all_review(book_id)
    @staticmethod
    def add_review(data):
        return ReviewService.add_review(data)