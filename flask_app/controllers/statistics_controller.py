from services.statistics_service import StatisticsService

class StatisticsController:
    @staticmethod
    def get_stats():
        return StatisticsService.get_system_stats()
