from flask import Blueprint
from controllers.statistics_controller import StatisticsController

statistics_blueprint = Blueprint("statistics", __name__)

@statistics_blueprint.route('/statistics/summary', methods=['GET'])
def get_stats():
    return StatisticsController.get_stats()
