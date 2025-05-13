import MySQLdb
from flask import jsonify
from database_connect import mysql

class WishlistService:
    @staticmethod
    def get_wishlist_by_user_id(user_id):
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        query = """
            SELECT 
                w.id AS wishlist_id,
                b.id AS book_id,
                b.title,
                b.image_url,
                b.short_description
            FROM wishlists w
            JOIN books b ON w.book_id = b.id
            WHERE w.user_id = %s AND w.deleted_at IS NULL
        """
        cursor.execute(query, (user_id,))
        wishlist_items = cursor.fetchall()
        cursor.close()
        return jsonify({"success": True, "wishlist": wishlist_items}), 200
    @staticmethod
    def delete_from_wishlist(user_id, book_id):
        try:
            cursor = mysql.connection.cursor()
            query = "DELETE FROM wishlists WHERE user_id = %s AND book_id = %s"
            cursor.execute(query, (user_id, book_id))
            mysql.connection.commit()
            cursor.close()
            return jsonify({"success": True, "message": "Đã xóa khỏi wishlist"}), 200
        except Exception as e:
            return jsonify({"success": False, "message": str(e)}), 500
    @staticmethod
    def add_to_wishlist(data):
        try:
            user_id = data.get("user_id")
            book_id = data.get("book_id")

            if not user_id or not book_id:
                return jsonify({"success": False, "message": "Thiếu dữ liệu"}), 400

            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

            # Kiểm tra trùng
            check_query = """
                SELECT id FROM wishlists
                WHERE user_id = %s AND book_id = %s AND deleted_at IS NULL
            """
            cursor.execute(check_query, (user_id, book_id))
            existing = cursor.fetchone()

            if existing:
                cursor.close()
                return jsonify({"success": False, "message": "Sách đã có trong danh sách yêu thích"}), 409

            # Thêm mới
            insert_query = """
                INSERT INTO wishlists (user_id, book_id)
                VALUES (%s, %s)
            """
            cursor.execute(insert_query, (user_id, book_id))
            mysql.connection.commit()
            cursor.close()

            return jsonify({"success": True, "message": "Đã thêm vào danh sách yêu thích"}), 201

        except Exception as e:
            return jsonify({"success": False, "message": str(e)}), 500