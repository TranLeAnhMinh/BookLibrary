import MySQLdb
from flask import jsonify
from database_connect import mysql

class AuthService:
    @staticmethod
    def login(email, password):
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)  # Sử dụng DictCursor

        query = "SELECT * FROM users WHERE email = %s"
        cursor.execute(query, (email,))
        user = cursor.fetchone()
        
        if user and user['password'] == password:  # So sánh mật khẩu
            # Nếu mật khẩu đúng, trả về thông tin người dùng
            user_info = {
                "id": user['id'],
                "email": user['email'],
                "fullName": user['full_name'],
                "phoneNumber": user['phone_number'],
                "gender": user['gender'],
                "birthDate": user['birth_date'],
                "provinceId": user['province_id'],
                "districtId": user['district_id'],
                "wardId": user['ward_id'],
                "address": user['address'],
                "role": user['role'],
                "status": user['status'],
                "createdAt": user['created_at'],
                "updatedAt": user['updated_at'],
            }
            cursor.close()
            return jsonify({"success": True, "user": user_info}), 200
        else:
            cursor.close()
            return jsonify({"message": "Invalid email or password"}), 401
    @staticmethod
    def update_user(user_id, full_name, phone_number, gender, province_id, district_id, ward_id, address):
        cursor = mysql.connection.cursor()
        
        # Cập nhật thông tin người dùng trong bảng `users`
        update_query = """
        UPDATE users 
        SET full_name = %s, phone_number = %s, gender = %s, province_id = %s, district_id = %s, ward_id = %s, address = %s 
        WHERE id = %s
        """
        cursor.execute(update_query, (full_name, phone_number, gender, province_id, district_id, ward_id, address, user_id))
        mysql.connection.commit()
        cursor.close()
        
        return jsonify({"success": True, "message": "User updated successfully"}), 200