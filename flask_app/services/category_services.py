import MySQLdb
from flask import jsonify, request
from database_connect import mysql

class CategoryService:
    @staticmethod
    def get_all_categories():
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        query = "SELECT id, name, slug, description FROM categories WHERE deleted_at IS NULL ORDER BY created_at DESC"
        cursor.execute(query)
        categories = cursor.fetchall()
        cursor.close()
        return jsonify({"success": True, "categories": categories}), 200

    @staticmethod
    def add_category():
        data = request.json
        name = data.get("name")
        slug = data.get("slug")
        description = data.get("description", "")

        if not (name and slug):
            return jsonify({"success": False, "message": "Missing required fields"}), 400

        try:
            cursor = mysql.connection.cursor()
            query = "INSERT INTO categories (name, slug, description) VALUES (%s, %s, %s)"
            cursor.execute(query, (name, slug, description))
            mysql.connection.commit()
            cursor.close()
            return jsonify({"success": True, "message": "Category added"}), 201
        except MySQLdb.IntegrityError as e:
            return jsonify({"success": False, "message": str(e)}), 409

    @staticmethod
    def update_category(category_id):
        data = request.json
        name = data.get("name")
        slug = data.get("slug")
        description = data.get("description", "")

        if not (name and slug):
            return jsonify({"success": False, "message": "Missing required fields"}), 400

        try:
            cursor = mysql.connection.cursor()
            query = """
                UPDATE categories
                SET name=%s, slug=%s, description=%s
                WHERE id=%s AND deleted_at IS NULL
            """
            cursor.execute(query, (name, slug, description, category_id))
            mysql.connection.commit()
            cursor.close()
            return jsonify({"success": True, "message": "Category updated"}), 200
        except MySQLdb.IntegrityError as e:
            return jsonify({"success": False, "message": str(e)}), 409

    @staticmethod
    def delete_category(category_id):
        cursor = mysql.connection.cursor()
        cursor.execute("UPDATE categories SET deleted_at = NOW() WHERE id = %s AND deleted_at IS NULL", (category_id,))
        mysql.connection.commit()
        cursor.close()
        return jsonify({"success": True, "message": "Category deleted"}), 200