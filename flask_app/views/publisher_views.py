from flask import Blueprint
from controllers.publisher_controllers import PublisherController

publisher_blueprint = Blueprint("publishers", __name__)

@publisher_blueprint.route('/publishers', methods=['GET'])
def get_all_publishers():
    return PublisherController.get_all_publishers()

@publisher_blueprint.route('/publishers', methods=['POST'])
def add_publisher():
    return PublisherController.add_publisher()

@publisher_blueprint.route('/publishers/<int:pub_id>', methods=['PUT'])
def update_publisher(pub_id):
    return PublisherController.update_publisher(pub_id)

@publisher_blueprint.route('/publishers/<int:pub_id>', methods=['DELETE'])
def delete_publisher(pub_id):
    return PublisherController.delete_publisher(pub_id)

@publisher_blueprint.route('/publishers/search', methods=['GET'])
def search_publishers():
    return PublisherController.search_publishers()
