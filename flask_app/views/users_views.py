from flask import Blueprint
from controllers.user_controllers import UserController

user_blueprint = Blueprint("users", __name__)

@user_blueprint.route("/users", methods=["GET"])
def get_all_users():
    return UserController.get_all_users()

@user_blueprint.route("/users/<int:user_id>/block", methods=["PUT"])
def block_user(user_id):
    return UserController.block_user(user_id)
