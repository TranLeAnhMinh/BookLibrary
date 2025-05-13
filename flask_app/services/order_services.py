import MySQLdb
from flask import jsonify
from database_connect import mysql
from datetime import datetime

class OrderService:
    @staticmethod
    def create_order(data):
        try:
            user_id = data.get("user_id")
            full_name = data.get("full_name")
            email = data.get("email")
            phone_number = data.get("phone_number")
            address = data.get("address")
            province_id = data.get("province_id")
            district_id = data.get("district_id")
            ward_id = data.get("ward_id")
            items = data.get("items", [])

            if not user_id or not items:
                return jsonify({"success": False, "message": "Thiếu thông tin user hoặc giỏ hàng."}), 400

            cursor = mysql.connection.cursor()

            # Tạo order mới
            create_order_query = """
                INSERT INTO orders (
                    user_id, employee_code, full_name, email, phone_number, 
                    address, province_id, district_id, ward_id,
                    status, created_at, updated_at
                )
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, 0, NOW(), NOW())
            """
            employee_code = "EMP001"  # bạn có thể tự động sinh mã nếu muốn
            cursor.execute(create_order_query, (
                user_id, employee_code, full_name, email, phone_number,
                address, province_id, district_id, ward_id
            ))
            order_id = cursor.lastrowid

            # Insert từng order_details
            for item in items:
                insert_detail_query = """
                    INSERT INTO order_details (
                        order_id, book_id, quantity, return_date_due,
                        status, created_at, updated_at
                    )
                    VALUES (%s, %s, %s, %s, 0, NOW(), NOW())
                """
                cursor.execute(insert_detail_query, (
                    order_id,
                    item.get("book_id"),
                    item.get("quantity", 1),
                    item.get("return_date_due")
                ))

            mysql.connection.commit()
            cursor.close()

            return jsonify({"success": True, "message": "Tạo đơn mượn thành công!", "order_id": order_id}), 201

        except Exception as e:
            return jsonify({"success": False, "message": str(e)}), 500

    @staticmethod
    def update_order(order_id, data):
        try:
            items = data.get("items", [])

            if not items:
                return jsonify({"success": False, "message": "Thiếu danh sách sách cần update."}), 400

            cursor = mysql.connection.cursor()

            # Xóa hết order_details cũ của đơn này
            delete_details_query = "DELETE FROM order_details WHERE order_id = %s"
            cursor.execute(delete_details_query, (order_id,))

            # Insert lại order_details mới
            for item in items:
                insert_detail_query = """
                    INSERT INTO order_details (
                        order_id, book_id, quantity, return_date_due,
                        status, created_at, updated_at
                    )
                    VALUES (%s, %s, %s, %s, 0, NOW(), NOW())
                """
                cursor.execute(insert_detail_query, (
                    order_id,
                    item.get("book_id"),
                    item.get("quantity", 1),
                    item.get("return_date_due")
                ))

            mysql.connection.commit()
            cursor.close()

            return jsonify({"success": True, "message": "Cập nhật đơn mượn thành công!"}), 200

        except Exception as e:
            return jsonify({"success": False, "message": str(e)}), 500
    @staticmethod
    def get_order_details(order_id):
        try:
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            query = """
                SELECT od.book_id, b.title, b.image_url, od.quantity, od.return_date_due
                FROM order_details od
                JOIN books b ON od.book_id = b.id
                WHERE od.order_id = %s
            """
            cursor.execute(query, (order_id,))
            books = cursor.fetchall()
            cursor.close()
            return jsonify({"success": True, "books": books}), 200
        except Exception as e:
            return jsonify({"success": False, "message": str(e)}), 500
    @staticmethod
    def search_orders(keyword):
        try:
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            query = """
                SELECT id, employee_code, full_name, email, status, created_at
                FROM orders
                WHERE full_name LIKE %s OR email LIKE %s OR employee_code LIKE %s
                ORDER BY created_at DESC
            """
            like_keyword = f"%{keyword}%"
            cursor.execute(query, (like_keyword, like_keyword, like_keyword))
            orders = cursor.fetchall()
            cursor.close()
            return jsonify({"success": True, "orders": orders}), 200
        except Exception as e:
            return jsonify({"success": False, "message": str(e)}), 500

    @staticmethod
    def get_all_orders():
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        
        # Truy vấn tất cả các đơn mượn mà không có điều kiện tìm kiếm
        query = """
            SELECT o.id, o.user_id, o.employee_code, o.full_name, o.email, o.phone_number, o.province_id, 
                o.district_id, o.ward_id, o.address, o.status, o.created_at
            FROM orders o
            WHERE o.deleted_at IS NULL
        """
        cursor.execute(query)
        
        # Lấy kết quả
        orders = cursor.fetchall()
        cursor.close()
        
        return orders
