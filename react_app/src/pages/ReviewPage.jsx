import React, { useState, useEffect } from "react";
import Sidebar from "../componets/Sidebar";
import AdminHeader from "../componets/AdminHeader";
import ToTopButton from "../componets/ToTopButton";
import "../css/ReviewPage.css"
const ReviewPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [searchText, setSearchText] = useState("");


  // Dữ liệu mẫu giả định cho reviews
  const mockReviews = [
    { id: 1, user_full_name: "Nguyễn Văn A", book_id: "Book 1", star: 5, comment: "Sách rất hay!", status: 1 },
    { id: 2, user_full_name: "Trần Thị B", book_id: "Book 2", star: 4, comment: "Nội dung ổn, nhưng cách kể hơi chậm.", status: 0 },
    { id: 3, user_full_name: "Lê Minh C", book_id: "Book 3", star: 3, comment: "Không hấp dẫn như tôi nghĩ.", status: 1 },
  ];

  const buttonStyle = {
    padding: "8px 16px",
    backgroundColor: "#2c3e50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    marginRight: "8px",
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#e74c3c",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  };

  const thTdStyle = {
    textAlign: "left",
    padding: "12px 15px",
    borderBottom: "1px solid #ddd",
  };

  const thStyle = {
    ...thTdStyle,
    backgroundColor: "#f8f9fa",
    fontWeight: "600",
  };

  // Giả lập tải đánh giá từ API
  const loadReviews = () => {
    setReviews(mockReviews);
  };

  // Gọi API tìm kiếm
  const handleSearch = () => {
    if (searchText.trim()) {
      const filteredReviews = mockReviews.filter(
        (review) =>
          review.user_full_name.toLowerCase().includes(searchText.toLowerCase()) ||
          review.status.toString() === searchText
      );
      setReviews(filteredReviews);
    } else {
      loadReviews();
    }
  };

  // Chuyển đổi trạng thái của đánh giá
  const handleChangeStatus = (reviewId, newStatus) => {
    const updatedReviews = reviews.map((review) =>
      review.id === reviewId ? { ...review, status: newStatus } : review
    );
    setReviews(updatedReviews);
  };

  useEffect(() => {
    loadReviews();
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <AdminHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} />
      <main
        style={{
          marginLeft: sidebarOpen ? "250px" : "0",
          marginTop: "60px",
          padding: "20px",
          transition: "margin-left 0.3s ease",
          width: "100%",
          overflow: "auto",
        }}
      >
        <section>
          <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "20px" }}>
            Trang quản lý Đánh giá
          </h2>

          {/* Thanh tìm kiếm */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Tìm theo tên người dùng hoặc trạng thái"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              style={{ padding: "10px", width: "300px" }}
            />
            <button style={buttonStyle} onClick={handleSearch}>Tìm kiếm</button>
          </div>

          {/* Bảng danh sách đánh giá */}
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Người đánh giá</th>
                <th style={thStyle}>Sách được đánh giá</th>
                <th style={thStyle}>Số sao</th>
                <th style={thStyle}>Lời đánh giá</th>
                <th style={thStyle}>Trạng thái</th>
                <th style={thStyle}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <tr key={review.id}>
                    <td style={thTdStyle}>{review.id}</td>
                    <td style={thTdStyle}>{review.user_full_name}</td>
                    <td style={thTdStyle}>{review.book_id}</td>
                    <td style={thTdStyle}>{review.star}</td>
                    <td style={thTdStyle}>{review.comment}</td>
                    <td style={thTdStyle}>
                      <select
                        className="select-status" // Áp dụng lớp CSS cho dropdown
                        value={review.status}
                        onChange={(e) => handleChangeStatus(review.id, Number(e.target.value))}
                        disabled={review.status === 2} // Nếu trạng thái là "Rejected", không thể thay đổi
                      >
                        <option value="0">Pending</option>
                        <option value="1">Approved</option>
                        <option value="2" disabled>Rejected</option>
                      </select>
                    </td>
                    <td style={thTdStyle}>
                      <button style={buttonStyle}>Sửa</button>
                      <button style={deleteButtonStyle}>Xóa</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={thTdStyle}>Không có dữ liệu</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>

      {/* Nút về đầu trang */}
      <ToTopButton />
    </div>
  );
};

export default ReviewPage;
