import React from "react";

const BorrowOrderDetailsModal = ({ isOpen, onClose, books }) => {
  if (!isOpen) return null;

  const thTdStyle = {
    textAlign: "left",
    padding: "10px 12px",
    borderBottom: "1px solid #ddd",
  };

  const thStyle = {
    ...thTdStyle,
    backgroundColor: "#f1f1f1",
    fontWeight: "bold",
  };

  const buttonStyle = {
    padding: "6px 12px",
    backgroundColor: "#2c3e50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        width: "600px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        zIndex: 999,
      }}
    >
      <h3>Chi tiết sách trong đơn</h3>
      <table style={{ width: "100%", marginTop: "10px" }}>
        <thead>
          <tr>
            <th style={thStyle}>Tên sách</th>
            <th style={thStyle}>Ngày trả mong muốn</th>
            <th style={thStyle}>Ngày trả thực tế</th>
            <th style={thStyle}>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {books && books.length > 0 ? (
            books.map((book, index) => (
              <tr key={index}>
                <td style={thTdStyle}>{book.title}</td>
                <td style={thTdStyle}>{book.returnDateDue}</td>
                <td style={thTdStyle}>{book.returnDateReal || "—"}</td>
                <td style={thTdStyle}>
                  {book.status === 1 ? (
                    "Đã trả"
                  ) : (
                    <select defaultValue={book.status}>
                      <option value="0">Chưa trả</option>
                      <option value="1">Đã trả</option>
                      <option value="2">Quá hạn</option>
                      <option value="3">Làm mất</option>
                    </select>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={thTdStyle}>
                Không có sách trong đơn
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={{ marginTop: "15px", textAlign: "right" }}>
        <button style={buttonStyle} onClick={onClose}>
          Đóng
        </button>
      </div>
    </div>
  );
};

export default BorrowOrderDetailsModal;
