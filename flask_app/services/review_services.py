import MySQLdb
from database_connect import mysql
from flask import jsonify

class ReviewService:
    @staticmethod
    def get_all_review(book_id):
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        query = """
           SELECT 
            reviews.id, 
            reviews.book_id, 
            reviews.user_id, 
            reviews.comment, 
            reviews.status, 
            reviews.star, 
            reviews.created_at, 
            reviews.updated_at, 
            users.full_name as user_full_name, 
            users.email as user_email
        FROM reviews
        JOIN users ON reviews.user_id = users.id
        WHERE reviews.deleted_at IS NULL 
          AND reviews.status = 1  -- Chỉ lấy đánh giá có status = 1 (được duyệt)
          AND reviews.book_id = %s
        ORDER BY reviews.created_at DESC
        """
        cursor.execute(query, (book_id,))
        reviews = cursor.fetchall()
        cursor.close()
        return jsonify({"success": True, "reviews": reviews}), 200

    # Thêm đánh giá mới vào bảng reviews
    @staticmethod
    def add_review(data):
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

        # Dữ liệu đầu vào
        book_id = data.get('book_id')
        user_id = data.get('user_id')
        star = data.get('star')
        comment = data.get('comment')

        # Câu lệnh SQL để thêm đánh giá
        query = """
            INSERT INTO reviews (book_id, user_id, comment, star, status)
            VALUES (%s, %s, %s, %s, %s)
        """
        status = 0  # Đánh giá mặc định ở trạng thái chờ duyệt

        try:
            cursor.execute(query, (book_id, user_id, comment, star, status))
            mysql.connection.commit()  # Lưu thay đổi vào database
            cursor.close()
            return jsonify({"success": True, "message": "Đánh giá đã được thêm thành công!"}), 201
        except Exception as e:
            mysql.connection.rollback()  # Rollback nếu có lỗi
            cursor.close()
            return jsonify({"success": False, "message": f"Lỗi: {str(e)}"}), 500
