class Cart {
    constructor(
      id,
      userId,
      bookId,
      quantity,
      returnDateDue,
      createdAt,
      updatedAt,
      deletedAt
    ) {
      this.id = id;
      this.userId = userId;
      this.bookId = bookId;
      this.quantity = quantity;
      this.returnDateDue = returnDateDue;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.deletedAt = deletedAt;
    }
  }
  
  export default Cart;
  