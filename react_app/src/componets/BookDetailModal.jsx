import React from "react";
import "../css/BookModal.css";

const BookDetailModal = ({ isOpen, onClose, book }) => {
  if (!isOpen || !book) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Chi Tiết Sách</h3>
        <img src={book.thumbnail} alt="Thumbnail" style={{ maxWidth: "100px" }} />
        <p><strong>Tên sách:</strong> {book.title}</p>
        <p><strong>Đánh giá:</strong> {book.rating} sao ({book.ratingCount} lượt)</p>
        <p><strong>Danh mục:</strong> {book.category}</p>
        <p><strong>Nhà xuất bản:</strong> {book.publisher}</p>
        <p><strong>Tác giả:</strong> {book.authors?.join(", ")}</p>
        <p><strong>Mô tả:</strong> {book.fullDescription}</p>
        <p><strong>Số lượng:</strong> {book.quantity}</p>

        {/* Ảnh khác */}
        {book.images?.length > 0 && (
          <div>
            <p><strong>Ảnh sách:</strong></p>
            {book.images.map((img, idx) => (
              <img key={idx} src={typeof img === "string" ? img : URL.createObjectURL(img)} alt={`img-${idx}`} style={{ maxWidth: "80px", margin: "5px" }} />
            ))}
          </div>
        )}

        <button onClick={onClose} style={{ marginTop: "10px" }}>Đóng</button>
      </div>
    </div>
  );
};

export default BookDetailModal;
