from flask import jsonify, request
from database_connect import mysql
import MySQLdb

class UserService:
    @staticmethod
    def get_all_users():
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        query = """
            SELECT 
                u.id, u.email, u.full_name, u.phone_number, u.gender, 
                u.birth_date, u.address, u.status,
                p.name AS province_name,
                d.name AS district_name,
                w.name AS ward_name
            FROM users u
            LEFT JOIN provinces p ON u.province_id = p.id
            LEFT JOIN districts d ON u.district_id = d.id
            LEFT JOIN wards w ON u.ward_id = w.id
            WHERE u.deleted_at IS NULL
        """
        cursor.execute(query)
        users = cursor.fetchall()
        cursor.close()
        return jsonify({"success": True, "users": users}), 200

    @staticmethod
    def block_user(user_id):
        cursor = mysql.connection.cursor()
        query = "UPDATE users SET status = 0 WHERE id = %s"
        cursor.execute(query, (user_id,))
        mysql.connection.commit()
        cursor.close()
        return jsonify({"success": True, "message": "User has been blocked"}), 200
