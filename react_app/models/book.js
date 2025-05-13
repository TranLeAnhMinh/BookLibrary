class Book {
    constructor(
      id,
      publisherId,
      title,
      slug,
      shortDescription,
      description,
      imageUrl,
      quantity,
      page,
      publishedYear,
      createdAt,
      updatedAt,
      deletedAt
    ) {
      this.id = id;
      this.publisherId = publisherId;
      this.title = title;
      this.slug = slug;
      this.shortDescription = shortDescription;
      this.description = description;
      this.imageUrl = imageUrl;
      this.quantity = quantity;
      this.page = page;
      this.publishedYear = publishedYear;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.deletedAt = deletedAt;
    }
  }
  
  export default Book;
  