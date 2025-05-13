import MySQLdb
from flask import jsonify, request
from database_connect import mysql

class PublisherService:
    @staticmethod
    def get_all_publishers():
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        query = "SELECT id, name, description, slug FROM publishers WHERE deleted_at IS NULL ORDER BY created_at DESC"
        cursor.execute(query)
        publishers = cursor.fetchall()
        cursor.close()
        return jsonify({"success": True, "publishers": publishers}), 200

    @staticmethod
    def add_publisher():
        data = request.json
        name = data.get("name")
        slug = data.get("slug")
        description = data.get("description")

        if not (name and slug and description):
            return jsonify({"success": False, "message": "Missing required fields"}), 400

        try:
            cursor = mysql.connection.cursor()
            query = "INSERT INTO publishers (name, slug, description) VALUES (%s, %s, %s)"
            cursor.execute(query, (name, slug, description))
            mysql.connection.commit()
            cursor.close()
            return jsonify({"success": True, "message": "Publisher added"}), 201
        except MySQLdb.IntegrityError as e:
            return jsonify({"success": False, "message": str(e)}), 409

    @staticmethod
    def update_publisher(pub_id):
        data = request.json
        name = data.get("name")
        slug = data.get("slug")
        description = data.get("description")

        if not (name and slug and description):
            return jsonify({"success": False, "message": "Missing required fields"}), 400

        try:
            cursor = mysql.connection.cursor()
            query = """
                UPDATE publishers
                SET name=%s, slug=%s, description=%s
                WHERE id=%s
            """
            cursor.execute(query, (name, slug, description, pub_id))
            mysql.connection.commit()
            cursor.close()
            return jsonify({"success": True, "message": "Publisher updated"}), 200
        except MySQLdb.IntegrityError as e:
            return jsonify({"success": False, "message": str(e)}), 409

    @staticmethod
    def delete_publisher(pub_id):
        cursor = mysql.connection.cursor()
        cursor.execute("UPDATE publishers SET deleted_at = NOW() WHERE id = %s AND deleted_at IS NULL", (pub_id,))
        mysql.connection.commit()
        cursor.close()
        return jsonify({"success": True, "message": "Publisher deleted"}), 200

    @staticmethod
    def search_publishers(keyword):
        search_query = f"%{keyword}%"
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        query = """
            SELECT id, name, description, slug
            FROM publishers
            WHERE 
                LOWER(name) LIKE %s OR
                LOWER(slug) LIKE %s
            ORDER BY created_at DESC
        """
        cursor.execute(query, (search_query, search_query))
        results = cursor.fetchall()
        cursor.close()
        return jsonify({"success": True, "results": results}), 200
