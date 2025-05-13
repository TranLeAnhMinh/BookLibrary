from flask import Blueprint, request
from controllers.wishlist_controllers import WishlistController

wishlist_blueprint = Blueprint("wishlist", __name__)

@wishlist_blueprint.route("/wishlist/<int:user_id>", methods=["GET"])
def get_wishlist_by_user_id(user_id):
    return WishlistController.get_wishlist_by_user_id(user_id)
@wishlist_blueprint.route("/wishlist/<int:user_id>/<int:book_id>", methods=["DELETE"])
def delete_from_wishlist(user_id, book_id):
    return WishlistController.delete_from_wishlist(user_id, book_id)
@wishlist_blueprint.route("/wishlist", methods=["POST"])
def add_to_wishlist():
    data = request.get_json()
    return WishlistController.add_to_wishlist(data)

