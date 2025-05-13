from services.order_services import OrderService
from flask import jsonify
class OrderController:
    @staticmethod
    def create_order(data):
        return OrderService.create_order(data)

    @staticmethod
    def update_order(order_id, data):
        return OrderService.update_order(order_id, data)
    
    @staticmethod
    def get_order_details(order_id):
        return OrderService.get_order_details(order_id)

    @staticmethod
    def search_orders(keyword):
        return OrderService.search_orders(keyword)
    
    @staticmethod
    def get_all_orders():
        try:
            # Lấy tất cả các đơn mượn mà không cần tìm kiếm theo keyword
            orders = OrderService.get_all_orders()
            return jsonify({"success": True, "orders": orders}), 200
        except Exception as e:
            return jsonify({"success": False, "message": str(e)}), 500