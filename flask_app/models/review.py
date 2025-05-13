class Review:
    def __init__(self, id, book_id, user_id, comment, status, star, created_at, updated_at, deleted_at):
        self.id = id
        self.book_id = book_id
        self.user_id = user_id
        self.comment = comment
        self.status = status
        self.star = star
        self.created_at = created_at
        self.updated_at = updated_at
        self.deleted_at = deleted_at