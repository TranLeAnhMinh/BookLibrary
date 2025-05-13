import MySQLdb
from flask import jsonify, request
from database_connect import mysql
from unidecode import unidecode
from flask import send_file
import openpyxl
import io

class EmployeeService:
    @staticmethod
    def get_all_employees():
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        query = "SELECT id, employee_code, full_name, email FROM employees ORDER BY created_at DESC"
        cursor.execute(query)
        employees = cursor.fetchall()
        cursor.close()
        return jsonify({"success": True, "employees": employees}), 200

    @staticmethod
    def add_employee():
        data = request.json
        employee_code = data.get("employee_code")
        full_name = data.get("full_name")
        email = data.get("email")

        if not (employee_code and full_name and email):
            return jsonify({"success": False, "message": "Missing required fields"}), 400

        try:
            cursor = mysql.connection.cursor()
            query = "INSERT INTO employees (employee_code, full_name, email) VALUES (%s, %s, %s)"
            cursor.execute(query, (employee_code, full_name, email))
            mysql.connection.commit()
            cursor.close()
            return jsonify({"success": True, "message": "Employee added"}), 201
        except MySQLdb.IntegrityError as e:
            return jsonify({"success": False, "message": str(e)}), 409

    @staticmethod
    def update_employee(emp_id):
        data = request.json
        employee_code = data.get("employee_code")
        full_name = data.get("full_name")
        email = data.get("email")

        if not (employee_code and full_name and email):
            return jsonify({"success": False, "message": "Missing required fields"}), 400

        try:
            cursor = mysql.connection.cursor()
            query = """
                UPDATE employees
                SET employee_code=%s, full_name=%s, email=%s
                WHERE id=%s
            """
            cursor.execute(query, (employee_code, full_name, email, emp_id))
            mysql.connection.commit()
            cursor.close()
            return jsonify({"success": True, "message": "Employee updated"}), 200
        except MySQLdb.IntegrityError as e:
            return jsonify({"success": False, "message": str(e)}), 409

    @staticmethod
    def delete_employee(emp_id):
        cursor = mysql.connection.cursor()
        cursor.execute("DELETE FROM employees WHERE id = %s", (emp_id,))
        mysql.connection.commit()
        cursor.close()
        return jsonify({"success": True, "message": "Employee deleted"}), 200
    

    @staticmethod
    def normalize_keyword(keyword):
        return unidecode(keyword).lower().strip()

    @staticmethod
    def search_employees(keyword):
        normalized = EmployeeService.normalize_keyword(keyword)
        search_query = f"%{normalized}%"

        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        query = """
            SELECT id, employee_code, full_name, email
            FROM employees
            WHERE 
                LOWER(employee_code) LIKE %s OR
                LOWER(email) LIKE %s OR
                LOWER(full_name) LIKE %s
            ORDER BY created_at DESC
        """
        cursor.execute(query, (search_query, search_query, search_query))
        results = cursor.fetchall()
        cursor.close()
        return jsonify({"success": True, "results": results}), 200

    @staticmethod
    def export_excel():
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT employee_code, full_name, email FROM employees ORDER BY id ASC")
        employees = cursor.fetchall()
        cursor.close()

        # Tạo workbook Excel
        wb = openpyxl.Workbook()
        ws = wb.active
        ws.title = "Employees"

        # Ghi tiêu đề
        ws.append(["Mã nhân viên", "Tên nhân viên", "Email"])

        # Ghi từng dòng dữ liệu
        for emp in employees:
            ws.append([emp["employee_code"], emp["full_name"], emp["email"]])

        # Ghi ra bộ nhớ đệm (RAM)
        output = io.BytesIO()
        wb.save(output)
        output.seek(0)

        return send_file(
            output,
            as_attachment=True,
            download_name="danh_sach_nhan_vien.xlsx",
            mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )