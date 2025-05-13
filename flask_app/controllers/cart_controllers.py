from services.cart_services import CartService

class CartController:
    @staticmethod
    def get_cart_by_user_id(user_id):
        return CartService.get_cart_by_user_id(user_id)
    @staticmethod
    def delete_from_cart(user_id, book_id):
        return CartService.delete_from_cart(user_id, book_id)
    @staticmethod
    def add_to_cart(data):
        return CartService.add_to_cart(data)
    
    
