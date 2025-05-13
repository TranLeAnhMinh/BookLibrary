from flask import Blueprint
from controllers.auth_controllers import AuthController

auth_blueprint = Blueprint('auth', __name__)

@auth_blueprint.route('/login', methods=['POST'])
def login():
    return AuthController.login()
@auth_blueprint.route('/update', methods=['PUT'])  # Sử dụng PUT để cập nhật
def update_user():
    return AuthController.update_user()