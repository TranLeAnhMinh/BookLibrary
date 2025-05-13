from services.wishlist_services import WishlistService

class WishlistController:
    @staticmethod
    def get_wishlist_by_user_id(user_id):
        return WishlistService.get_wishlist_by_user_id(user_id)
    @staticmethod
    def delete_from_wishlist(user_id, book_id):
        return WishlistService.delete_from_wishlist(user_id, book_id)
    @staticmethod
    def add_to_wishlist(data):
        return WishlistService.add_to_wishlist(data)