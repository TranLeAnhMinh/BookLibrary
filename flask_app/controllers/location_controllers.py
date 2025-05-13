from flask import jsonify
from services.location_services import LocationService

class LocationController:
    @staticmethod
    def get_provinces():
        provinces = LocationService.get_provinces()
        if provinces:
            return jsonify({"provinces": provinces}), 200
        else:
            return jsonify({"message": "No provinces found"}), 404

    @staticmethod
    def get_districts(province_id):
        districts = LocationService.get_districts(province_id)
        if districts:
            return jsonify({"districts": districts}), 200
        else:
            return jsonify({"message": "No districts found for the given province"}), 404

    @staticmethod
    def get_wards(district_id):
        wards = LocationService.get_wards(district_id)
        if wards:
            return jsonify({"wards": wards}), 200
        else:
            return jsonify({"message": "No wards found for the given district"}), 404
