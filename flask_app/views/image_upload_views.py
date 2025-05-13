# views/image_upload_view.py

import os
from flask import Blueprint, request, jsonify, current_app
from unidecode import unidecode

image_upload_bp = Blueprint('image_upload_bp', __name__)

@image_upload_bp.route('/api/upload-image', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({"success": False, "message": "No image file provided"}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({"success": False, "message": "Empty filename"}), 400

    slug_raw = request.form.get("slug", "")
    if not slug_raw:
        return jsonify({"success": False, "message": "Missing slug"}), 400

    slug = unidecode(slug_raw).lower().strip().replace(" ", "_")
    filename = f"{slug}.jpg"
    save_path = os.path.join(current_app.root_path, "assets", filename)
    file.save(save_path)

    image_url = f"http://127.0.0.1:5000/images/{filename}"
    return jsonify({"success": True, "url": image_url}), 200
