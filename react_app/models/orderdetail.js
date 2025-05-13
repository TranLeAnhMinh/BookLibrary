class OrderDetail {
    constructor(
      id,
      orderId,
      bookId,
      returnDateDue,
      returnDateReal,
      quantity,
      status,
      createdAt,
      updatedAt,
      deletedAt
    ) {
      this.id = id;
      this.orderId = orderId;
      this.bookId = bookId;
      this.returnDateDue = returnDateDue;
      this.returnDateReal = returnDateReal;
      this.quantity = quantity;
      this.status = status;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.deletedAt = deletedAt;
    }
  }
  
  export default OrderDetail;
  