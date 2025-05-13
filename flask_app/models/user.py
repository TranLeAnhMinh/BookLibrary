class User:
    def __init__(self, id, email, password, full_name, phone_number, gender, birth_date, province_id, district_id, ward_id, address, google_id, role, status, created_at, updated_at, deleted_at):
        self.id = id
        self.email = email
        self.password = password
        self.full_name = full_name
        self.phone_number = phone_number
        self.gender = gender
        self.birth_date = birth_date
        self.province_id = province_id
        self.district_id = district_id
        self.ward_id = ward_id
        self.address = address
        self.google_id = google_id
        self.role = role
        self.status = status
        self.created_at = created_at
        self.updated_at = updated_at
        self.deleted_at = deleted_at