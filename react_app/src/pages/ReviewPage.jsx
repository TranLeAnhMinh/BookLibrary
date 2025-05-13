import React, { useState, useEffect } from "react";
import Sidebar from "../componets/Sidebar";
import AdminHeader from "../componets/AdminHeader";
import ToTopButton from "../componets/ToTopButton";
import "../css/ReviewPage.css";
import { getAllReviewsWithDetails, searchReviews, updateReviewStatus, deleteReview } from "../../services/reviewservices";

const ReviewPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [searchText, setSearchText] = useState("");

  const loadReviews = async () => {
    const response = await getAllReviewsWithDetails();
    if (response.success) {
      setReviews(response.reviews);
    } else {
      console.error(response.message);
    }
  };

  const handleSearch = async () => {
    const response = await searchReviews(searchText);
    if (response.success) {
      setReviews(response.reviews);
    } else {
      console.error(response.message);
    }
  };

  const handleChangeStatus = async (reviewId, newStatus) => {
    const response = await updateReviewStatus(reviewId, newStatus);
    if (response.success) {
      alert("Trạng thái đã được cập nhật thành công!");
      loadReviews();
    } else {
      console.error(response.message);
    }
  };

  const handleDelete = async (reviewId) => {
    if (reviewId) {
      if (window.confirm("Bạn có chắc chắn muốn xóa đánh giá này?")) {
        const response = await deleteReview(reviewId);
        if (response.success) {
          alert("Đánh giá đã được xóa thành công!");
          loadReviews();
        } else {
          console.error(response.message);
        }
      }
    } else {
      console.error("Invalid review ID");
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

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
              {reviews.length > 0 ? reviews.map((review, index) => (
                <tr key={review.review_id || index}>
                  <td style={thTdStyle}>{index + 1}</td>
                  <td style={thTdStyle}>{review.user_full_name}</td>
                  <td style={thTdStyle}>{review.book_title}</td>
                  <td style={thTdStyle}>{review.star}</td>
                  <td style={thTdStyle}>{review.comment}</td>
                  <td style={thTdStyle}>
                    <select
                      className="select-status"
                      value={review.status}
                      onChange={(e) => handleChangeStatus(review.review_id, Number(e.target.value))}
                      style={{
                        backgroundColor:
                          review.status === 0 ? "#f1c40f" :
                          review.status === 1 ? "#2ecc71" :
                          "#e74c3c",
                        color: "white",
                        padding: "6px",
                        borderRadius: "4px",
                      }}
                    >
                      <option value="0">Pending</option>
                      <option value="1">Approved</option>
                      <option value="2">Rejected</option>
                    </select>
                  </td>
                  <td style={thTdStyle}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '5px' }}>
                      <button
                        className="delete-btn"
                        style={deleteButtonStyle}
                        onClick={() => handleDelete(review.review_id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" style={thTdStyle}>Không có dữ liệu</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
      <ToTopButton />
    </div>
  );
};

export default ReviewPage;
