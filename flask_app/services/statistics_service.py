from flask import jsonify
from database_connect import mysql
import MySQLdb

class StatisticsService:
    @staticmethod
    def get_system_stats():
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

        # Tổng người dùng hoạt động
        cursor.execute("SELECT COUNT(*) AS total_users FROM users WHERE status = 1 AND deleted_at IS NULL")
        total_users = cursor.fetchone()["total_users"]

        # Tổng sách chưa bị xóa
        cursor.execute("SELECT COUNT(*) AS total_books FROM books WHERE deleted_at IS NULL")
        total_books = cursor.fetchone()["total_books"]

        cursor.close()

        return jsonify({
            "success": True,
            "stats": {
                "total_users": total_users,
                "total_books": total_books
            }
        }), 200
