from flask import Blueprint, request, jsonify 
from controllers.location_controllers import LocationController

location_blueprint = Blueprint('location', __name__)

# Route để lấy danh sách tỉnh
@location_blueprint.route('/provinces', methods=['GET'])
def get_provinces():
    return LocationController.get_provinces()

# Route để lấy danh sách quận theo province_id
@location_blueprint.route('/districts', methods=['GET'])
def get_districts():
    province_id = request.args.get('provinceId')
    if not province_id:
        return jsonify({"message": "provinceId is required"}), 400
    return LocationController.get_districts(province_id)

# Route để lấy danh sách phường theo district_id
@location_blueprint.route('/wards', methods=['GET'])
def get_wards():
    district_id = request.args.get('districtId')
    if not district_id:
        return jsonify({"message": "districtId is required"}), 400
    return LocationController.get_wards(district_id)
