class OrderDetail:
    def __init__(self, id, order_id, book_id, return_date_due, return_date_real, quantity, status, created_at, updated_at, deleted_at):
        self.id = id
        self.order_id = order_id
        self.book_id = book_id
        self.return_date_due = return_date_due
        self.return_date_real = return_date_real
        self.quantity = quantity
        self.status = status
        self.created_at = created_at
        self.updated_at = updated_at
        self.deleted_at = deleted_at