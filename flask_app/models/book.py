class Book:
    def __init__(self, id, publisher_id, title, slug, short_description, description, image_url, quantity, page, published_year, created_at, updated_at, deleted_at):
        self.id = id
        self.publisher_id = publisher_id
        self.title = title
        self.slug = slug
        self.short_description = short_description
        self.description = description
        self.image_url = image_url
        self.quantity = quantity
        self.page = page
        self.published_year = published_year
        self.created_at = created_at
        self.updated_at = updated_at
        self.deleted_at = deleted_at