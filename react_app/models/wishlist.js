class Wishlist {
    constructor(id, userId, bookId, createdAt, updatedAt, deletedAt) {
        this.id = id;
        this.userId = userId;
        this.bookId = bookId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}

export default Wishlist;
