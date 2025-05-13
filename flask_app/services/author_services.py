import MySQLdb
from flask import jsonify
from database_connect import mysql

class AuthorService:
    # Lấy danh sách tất cả tác giả
    @staticmethod
    def get_all_authors():
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        query = "SELECT id, name, slug, description FROM authors WHERE deleted_at IS NULL ORDER BY created_at DESC"
        cursor.execute(query)
        authors = cursor.fetchall()
        cursor.close()
        return jsonify({"success": True, "authors": authors}), 200

    # Thêm tác giả mới
    @staticmethod
    def add_author(data):
        name = data.get("name")
        slug = data.get("slug")
        description = data.get("description")

        if not (name and slug and description):
            return jsonify({"success": False, "message": "Missing required fields"}), 400

        try:
            cursor = mysql.connection.cursor()
            query = "INSERT INTO authors (name, slug, description) VALUES (%s, %s, %s)"
            cursor.execute(query, (name, slug, description))
            mysql.connection.commit()
            cursor.close()
            return jsonify({"success": True, "message": "Author added"}), 201
        except MySQLdb.IntegrityError as e:
            return jsonify({"success": False, "message": str(e)}), 409

    # Cập nhật thông tin tác giả
    @staticmethod
    def update_author(author_id, data):
        name = data.get("name")
        slug = data.get("slug")
        description = data.get("description")

        if not (name and slug and description):
            return jsonify({"success": False, "message": "Missing required fields"}), 400

        try:
            cursor = mysql.connection.cursor()
            query = """
                UPDATE authors
                SET name=%s, slug=%s, description=%s
                WHERE id=%s AND deleted_at IS NULL
            """
            cursor.execute(query, (name, slug, description, author_id))
            mysql.connection.commit()
            cursor.close()
            return jsonify({"success": True, "message": "Author updated"}), 200
        except MySQLdb.IntegrityError as e:
            return jsonify({"success": False, "message": str(e)}), 409

    @staticmethod
    def check_author_has_books(author_id):
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        query = "SELECT COUNT(*) as book_count FROM book_author WHERE author_id = %s"  # Dùng bảng book_author
        cursor.execute(query, (author_id,))
        result = cursor.fetchone()
        cursor.close()
        return result['book_count'] > 0  # Nếu có sách thì trả về True

    # Xóa tác giả (có ràng buộc là không được xóa tác giả có sách)
    @staticmethod
    def delete_author(author_id):
        if AuthorService.check_author_has_books(author_id):  # Kiểm tra nếu tác giả có sách
            return jsonify({"success": False, "message": "Không thể xóa tác giả vì họ có sách."}), 400
        
        cursor = mysql.connection.cursor()
        query = "UPDATE authors SET deleted_at = NOW() WHERE id = %s AND deleted_at IS NULL"  # Cập nhật deleted_at thay vì xóa trực tiếp
        cursor.execute(query, (author_id,))
        mysql.connection.commit()
        cursor.close()

        return jsonify({"success": True, "message": "Tác giả đã được xóa thành công."}), 200

    # Tìm kiếm tác giả theo tên, slug hoặc mô tả
    @staticmethod
    def search_authors(keyword):
        search_query = f"%{keyword.lower()}%"

        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        query = """
            SELECT id, name, slug, description
            FROM authors
            WHERE 
                LOWER(name) LIKE %s OR
                LOWER(slug) LIKE %s OR
                LOWER(description) LIKE %s
            ORDER BY created_at DESC
        """
        cursor.execute(query, (search_query, search_query, search_query))
        results = cursor.fetchall()
        cursor.close()
        return jsonify({"success": True, "results": results}), 200