from flask import Blueprint, request
from controllers.cart_controllers import CartController

cart_blueprint = Blueprint("cart", __name__)

@cart_blueprint.route("/cart/<int:user_id>", methods=["GET"])
def get_cart_by_user_id(user_id):
    return CartController.get_cart_by_user_id(user_id)
@cart_blueprint.route("/cart/<int:user_id>/<int:book_id>", methods=["DELETE"])
def delete_from_cart(user_id, book_id):
    return CartController.delete_from_cart(user_id, book_id)
@cart_blueprint.route("/cart", methods=["POST"])
def add_to_cart():
    data = request.get_json()
    return CartController.add_to_cart(data)
