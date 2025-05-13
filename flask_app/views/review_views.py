from flask import Blueprint, request, jsonify
from controllers.review_controllers import ReviewController

review_blueprint = Blueprint("reviews", __name__)

@review_blueprint.route('/reviews/<int:book_id>', methods=['GET'])
def get_all_reviews(book_id):
    return ReviewController.get_all_reviews(book_id)
@review_blueprint.route('/reviews', methods=['POST'])
def add_review():
    data = request.get_json()  # Lấy dữ liệu từ request

    # Kiểm tra dữ liệu gửi lên
    if not data or not data.get('book_id') or not data.get('user_id') or not data.get('star') or not data.get('comment'):
        return jsonify({"success": False, "message": "Thiếu thông tin cần thiết"}), 400

    return ReviewController.add_review(data)