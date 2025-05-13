from services.user_services import UserService

class UserController:
    @staticmethod
    def get_all_users():
        return UserService.get_all_users()

    @staticmethod
    def block_user(user_id):
        return UserService.block_user(user_id)
