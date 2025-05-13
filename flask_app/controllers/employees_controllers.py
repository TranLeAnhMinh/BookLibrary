from services.employee_services import EmployeeService
from flask import request
from flask import jsonify

class EmployeeController:
    @staticmethod
    def get_all_employees():
        return EmployeeService.get_all_employees()

    @staticmethod
    def add_employee():
        return EmployeeService.add_employee()

    @staticmethod
    def update_employee(emp_id):
        return EmployeeService.update_employee(emp_id)

    @staticmethod
    def delete_employee(emp_id):
        return EmployeeService.delete_employee(emp_id)

    @staticmethod
    def search_employees():
        keyword = request.args.get('q', '')
        if not keyword:
            return jsonify({"success": False, "message": "Missing keyword"}), 400
        return EmployeeService.search_employees(keyword)
    
    @staticmethod
    def export_excel():
        return EmployeeService.export_excel()
