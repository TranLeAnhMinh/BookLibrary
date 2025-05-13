from flask import request, jsonify, abort
from models.user import User
from services.auth_services import AuthService

class AuthController:
    @staticmethod
    def login():
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            abort(400, description="Bad request: Email and password are required.")
        
        return AuthService.login(email, password)
    @staticmethod
    def update_user():
        data = request.get_json()

        # Get user data from request
        user_id = data.get('userId')
        full_name = data.get('fullName')
        phone_number = data.get('phoneNumber')
        gender = data.get('gender')
        province_id = data.get('provinceId')
        district_id = data.get('districtId')
        ward_id = data.get('wardId')
        address = data.get('address')

        if not user_id or not full_name or not phone_number:
            return jsonify({"message": "Missing required fields"}), 400

        return AuthService.update_user(user_id, full_name, phone_number, gender, province_id, district_id, ward_id, address)
    
    