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
@review_blueprint.route('/reviews/details', methods=['GET'])
def get_all_reviews_with_details():
    return ReviewController.get_all_reviews_with_details()

@review_blueprint.route('/reviews/search', methods=['GET'])
def search_reviews():
    search_query = request.args.get('query', '')  # Lấy query từ tham số GET
    return ReviewController.search_reviews(search_query)

@review_blueprint.route('/reviews/<int:review_id>', methods=['DELETE'])
def delete_review(review_id):
    return ReviewController.delete_review(review_id)


@review_blueprint.route('/reviews/<int:review_id>', methods=['PUT'])
def update_review_status(review_id):
    data = request.get_json()  # Lấy dữ liệu từ request

    # Kiểm tra xem trạng thái có hợp lệ hay không
    new_status = data.get('status')
    if new_status not in [0, 1, 2]:  # 0: Pending, 1: Approved, 2: Rejected
        return jsonify({"success": False, "message": "Trạng thái không hợp lệ!"}), 400
    
    return ReviewController.update_review_status(review_id, new_status)