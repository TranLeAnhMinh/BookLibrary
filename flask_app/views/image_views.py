import os
from flask import Blueprint, send_from_directory, current_app

image_bp = Blueprint('image_bp', __name__)

@image_bp.route('/images/<filename>')
def get_image(filename):
    # Xác định thư mục assets chính xác
    assets_folder = os.path.join(current_app.root_path, "assets")    
    # Kiểm tra xem file có tồn tại không, nếu không thì trả về lỗi 404
    if not os.path.exists(os.path.join(assets_folder, filename)):
        return {"error": "File not found"}, 404
    return send_from_directory(assets_folder, filename)
