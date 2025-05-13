from flask import Blueprint
from controllers.employees_controllers import EmployeeController

employee_blueprint = Blueprint("employees", __name__)

@employee_blueprint.route('/employees', methods=['GET'])
def get_all_employees():
    return EmployeeController.get_all_employees()

@employee_blueprint.route('/employees', methods=['POST'])
def add_employee():
    return EmployeeController.add_employee()

@employee_blueprint.route('/employees/<int:emp_id>', methods=['PUT'])
def update_employee(emp_id):
    return EmployeeController.update_employee(emp_id)

@employee_blueprint.route('/employees/<int:emp_id>', methods=['DELETE'])
def delete_employee(emp_id):
    return EmployeeController.delete_employee(emp_id)

@employee_blueprint.route('/employees/search', methods=['GET'])
def search_employees():
    return EmployeeController.search_employees()

@employee_blueprint.route("/employees/export", methods=["GET"])
def export_excel():
    return EmployeeController.export_excel()
