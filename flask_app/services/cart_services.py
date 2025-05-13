import MySQLdb
from flask import jsonify
from database_connect import mysql
from datetime import datetime

class CartService:
    @staticmethod
    def get_cart_by_user_id(user_id):
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        query = """
            SELECT 
                c.id AS cart_id,
                c.book_id,
                b.title,
                b.image_url,
                c.quantity,
                c.return_date_due,
                c.created_at
            FROM carts c
            JOIN books b ON c.book_id = b.id
            WHERE c.user_id = %s AND c.deleted_at IS NULL
        """
        cursor.execute(query, (user_id,))
        cart_items = cursor.fetchall()
        cursor.close()
        return jsonify({"success": True, "cart": cart_items}), 200

    @staticmethod
    def add_to_cart(data):
        try:
            user_id = data.get("user_id")
            book_id = data.get("book_id")
            quantity = data.get("quantity", 1)
            return_date_due = data.get("return_date_due")

            if not all([user_id, book_id, return_date_due]):
                return jsonify({"success": False, "message": "Thiếu dữ liệu"}), 400

            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

        # 🚫 Kiểm tra xem sách đã tồn tại trong giỏ chưa
            check_query = """
                SELECT id FROM carts
                WHERE user_id = %s AND book_id = %s AND deleted_at IS NULL
            """
            cursor.execute(check_query, (user_id, book_id))
            existing = cursor.fetchone()

            if existing:
                cursor.close()
                return jsonify({"success": False, "message": "Sách đã có trong giỏ hàng"}), 409

        # ✅ Nếu chưa có thì thêm mới
            insert_query = """
                INSERT INTO carts (user_id, book_id, quantity, return_date_due)
                VALUES (%s, %s, %s, %s)
            """
            cursor.execute(insert_query, (user_id, book_id, quantity, return_date_due))
            mysql.connection.commit()
            cursor.close()

            return jsonify({"success": True, "message": "Đã thêm vào giỏ hàng"}), 201

        except Exception as e:
            return jsonify({"success": False, "message": str(e)}), 500
    @staticmethod
    def delete_from_cart(user_id, book_id):
        try:
            cursor = mysql.connection.cursor()
            query = "DELETE FROM carts WHERE user_id = %s AND book_id = %s"
            cursor.execute(query, (user_id, book_id))
            mysql.connection.commit()
            cursor.close()
            return jsonify({"success": True, "message": "Đã xóa khỏi carts"}), 200
        except Exception as e:
            return jsonify({"success": False, "message": str(e)}), 500
 

   
