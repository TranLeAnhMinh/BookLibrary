from services.publisher_services import PublisherService
from flask import request, jsonify

class PublisherController:
    @staticmethod
    def get_all_publishers():
        return PublisherService.get_all_publishers()

    @staticmethod
    def add_publisher():
        return PublisherService.add_publisher()

    @staticmethod
    def update_publisher(pub_id):
        return PublisherService.update_publisher(pub_id)

    @staticmethod
    def delete_publisher(pub_id):
        return PublisherService.delete_publisher(pub_id)

    @staticmethod
    def search_publishers():
        keyword = request.args.get('q', '')
        if not keyword:
            return jsonify({"success": False, "message": "Missing keyword"}), 400
        return PublisherService.search_publishers(keyword)
