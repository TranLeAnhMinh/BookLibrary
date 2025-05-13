class Review {
    constructor(
      id,
      bookId,
      userId,
      comment,
      status,
      star,
      createdAt,
      updatedAt,
      deletedAt
    ) {
      this.id = id;
      this.bookId = bookId;
      this.userId = userId;
      this.comment = comment;
      this.status = status;
      this.star = star;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.deletedAt = deletedAt;
    }
  }
  
  export default Review;
  