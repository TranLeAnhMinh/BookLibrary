class Order:
    def __init__(self, id, user_id, employee_code, full_name, email, phone_number, province_id, district_id, ward_id, address, status, created_at, updated_at, deleted_at):
        self.id = id
        self.user_id = user_id
        self.employee_code = employee_code
        self.full_name = full_name
        self.email = email
        self.phone_number = phone_number
        self.province_id = province_id
        self.district_id = district_id
        self.ward_id = ward_id
        self.address = address
        self.status = status
        self.created_at = created_at
        self.updated_at = updated_at
        self.deleted_at = deleted_at