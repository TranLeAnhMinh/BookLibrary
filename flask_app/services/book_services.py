import MySQLdb
from flask import jsonify
from database_connect import mysql
from unidecode import unidecode  # Thêm thư viện chuẩn hóa tiếng Việt

class BookService:
    @staticmethod
    def normalize_keyword(keyword):
        # Bỏ dấu, viết thường, thay khoảng trắng bằng gạch nối
        normalized = unidecode(keyword).lower().strip().replace(" ", "-")
        return normalized

    @staticmethod
    def get_all_books():
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        query = """
        SELECT 
            b.*, 
            p.name AS publisher_name,
            GROUP_CONCAT(DISTINCT a.name SEPARATOR ', ') AS authors,
            GROUP_CONCAT(DISTINCT a.id) AS author_ids
        FROM books b
        LEFT JOIN book_author ba ON b.id = ba.book_id
        LEFT JOIN authors a ON ba.author_id = a.id
        LEFT JOIN publishers p ON b.publisher_id = p.id
        WHERE b.deleted_at IS NULL
        GROUP BY b.id
        """
        cursor.execute(query)
        books = cursor.fetchall()
        cursor.close()

          # Convert author_ids from string to list[int]
        for book in books:
            if book.get("author_ids"):
                book["author_ids"] = list(map(int, book["author_ids"].split(",")))
            else:
                book["author_ids"] = []
        return jsonify({"success": True, "books": books}), 200

    @staticmethod
    def get_book_by_id(book_id):
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        query = """
             SELECT 
            b.*, 
            GROUP_CONCAT(DISTINCT a.name SEPARATOR ', ') AS authors,
            GROUP_CONCAT(DISTINCT a.id) AS author_ids,
            p.name AS publisher_name,
            p.id AS publisher_id
        FROM books b
        LEFT JOIN book_author ba ON b.id = ba.book_id
        LEFT JOIN authors a ON ba.author_id = a.id
        LEFT JOIN publishers p ON b.publisher_id = p.id
        WHERE b.id = %s
        GROUP BY b.id
        """
        cursor.execute(query, (book_id,))
        book = cursor.fetchone()
        cursor.close()
        if book:
            # Parse author_ids string → list[int]
            if book.get("author_ids"):
                book["author_ids"] = list(map(int, book["author_ids"].split(",")))
            else:
                book["author_ids"] = []
            return jsonify({"success": True, "book": book}), 200
        else:
            return jsonify({"success": False, "message": "Book not found"}), 404

    @staticmethod
    def search_books(keyword):
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        normalized_keyword = BookService.normalize_keyword(keyword)
        search_query = f"%{normalized_keyword}%"

        query = """
           SELECT 
                b.*, 
                GROUP_CONCAT(DISTINCT a.name SEPARATOR ', ') AS authors,
                p.name AS publisher_name
            FROM books b
            LEFT JOIN book_author ba ON b.id = ba.book_id
            LEFT JOIN authors a ON ba.author_id = a.id
            LEFT JOIN publishers p ON b.publisher_id = p.id
            WHERE (
                b.slug LIKE %s OR
                a.slug LIKE %s OR
                p.slug LIKE %s
            )
            AND b.deleted_at IS NULL
            GROUP BY b.id
        """
        cursor.execute(query, (search_query, search_query, search_query))
        books = cursor.fetchall()
        cursor.close()
        return jsonify({"success": True, "results": books}), 200
    
    @staticmethod
    def create_book(data):
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

        title = data.get("title")
        slug = BookService.normalize_keyword(title)
        publisher_id = data.get("publisher_id")
        short_description = data.get("short_description")
        description = data.get("description")
        image_url = data.get("image_url")
        quantity = data.get("quantity")
        page = data.get("page")
        published_year = data.get("published_year")
        author_ids = data.get("author_ids", [])
        category_ids = data.get("category_ids", [])

        # Insert the book into books table
        query = """
            INSERT INTO books (publisher_id, title, slug, short_description, description, image_url, quantity, page, published_year)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (publisher_id, title, slug, short_description, description, image_url, quantity, page, published_year))
        book_id = cursor.lastrowid

        # Insert authors into book_author table
        for author_id in author_ids:
            cursor.execute("INSERT INTO book_author (book_id, author_id) VALUES (%s, %s)", (book_id, author_id))

        # Insert categories into book_category table
        for category_id in category_ids:
            cursor.execute("INSERT INTO book_category (book_id, category_id) VALUES (%s, %s)", (book_id, category_id))

        mysql.connection.commit()
        cursor.close()
        return jsonify({"success": True, "message": "Book created"}), 201

    @staticmethod
    def update_book(book_id, data):
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

        title = data.get("title")
        slug = BookService.normalize_keyword(title)
        publisher_id = data.get("publisher_id")
        short_description = data.get("short_description")
        description = data.get("description")
        image_url = data.get("image_url")
        quantity = data.get("quantity")
        page = data.get("page")
        published_year = data.get("published_year")
        author_ids = data.get("author_ids", [])
        category_ids = data.get("category_ids", [])

        # Update the book
        query = """
            UPDATE books 
            SET publisher_id=%s, title=%s, slug=%s, short_description=%s, description=%s, 
                image_url=%s, quantity=%s, page=%s, published_year=%s
            WHERE id = %s
        """
        cursor.execute(query, (publisher_id, title, slug, short_description, description, image_url, quantity, page, published_year, book_id))

        # Update authors
        cursor.execute("DELETE FROM book_author WHERE book_id = %s", (book_id,))
        for author_id in author_ids:
            cursor.execute("INSERT INTO book_author (book_id, author_id) VALUES (%s, %s)", (book_id, author_id))

        # Update categories
        cursor.execute("DELETE FROM book_category WHERE book_id = %s", (book_id,))
        for category_id in category_ids:
            cursor.execute("INSERT INTO book_category (book_id, category_id) VALUES (%s, %s)", (book_id, category_id))

        mysql.connection.commit()
        cursor.close()
        return jsonify({"success": True, "message": "Book updated"}), 200
    
    @staticmethod
    def delete_book(book_id):
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        # Update deleted_at to mark the book as deleted
        cursor.execute("UPDATE books SET deleted_at = NOW() WHERE id = %s", (book_id,))
        mysql.connection.commit()
        cursor.close()
        return jsonify({"success": True, "message": "Book deleted"}), 200
