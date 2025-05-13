from flask import Blueprint, request
from controllers.order_controllers import OrderController

order_blueprint = Blueprint("order", __name__)

@order_blueprint.route("/orders/save-cart", methods=["POST"])
def create_order():
    data = request.get_json()
    return OrderController.create_order(data)

@order_blueprint.route("/orders/update-cart/<int:order_id>", methods=["PUT"])
def update_order(order_id):
    data = request.get_json()
    return OrderController.update_order(order_id, data)

@order_blueprint.route("/orders/<int:order_id>", methods=["GET"])
def get_order_details(order_id):
    return OrderController.get_order_details(order_id)

@order_blueprint.route("/orders/search", methods=["GET"])
def search_orders():
    keyword = request.args.get("keyword", "")
    return OrderController.search_orders(keyword)

@order_blueprint.route("/orders", methods=["GET"])
def get_all_orders():
    return OrderController.get_all_orders()