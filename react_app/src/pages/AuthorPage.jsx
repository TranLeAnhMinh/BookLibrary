import React, { useState, useEffect } from "react";
import { getAllAuthors, searchAuthors, deleteAuthor, addAuthor, updateAuthor } from "../../services/authorservices"; // Import services
import Sidebar from "../componets/Sidebar";
import AdminHeader from "../componets/AdminHeader";
import ToTopButton from "../componets/ToTopButton";
import AuthorModal from "../componets/AuthorModal"; // Modal cho thêm/sửa tác giả

const AuthorPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [authors, setAuthors] = useState([]);
  const [searchText, setSearchText] = useState(""); // Tìm kiếm
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

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

  // Fetch all authors
  useEffect(() => {
    loadAuthors();
  }, []);

  const loadAuthors = async () => {
    const response = await getAllAuthors();
    if (response.success) {
      setAuthors(response.authors);
    } else {
      alert(response.message);
    }
  };

  const handleSearch = async () => {
    if (searchText.trim()) {
      const response = await searchAuthors(searchText); // Gọi API tìm kiếm
      if (response.success) {
        setAuthors(response.results);
      } else {
        alert(response.message);
      }
    } else {
      loadAuthors(); // Nếu không có tìm kiếm, tải lại tất cả tác giả
    }
  };

  const handleDelete = async (id) => {
    const response = await deleteAuthor(id);
    if (response.success) {
      loadAuthors();
    } else {
      alert(response.message);
    }
  };

  const handleAdd = () => {
    setSelectedAuthor(null);
    setModalOpen(true);
  };

  const handleEdit = (author) => {
    setSelectedAuthor(author);
    setModalOpen(true);
  };

  const handleSubmitModal = async (data) => {
    let response;
    if (selectedAuthor) {
      response = await updateAuthor(selectedAuthor.id, data);
    } else {
      response = await addAuthor(data);
    }

    if (response.success) {
      setModalOpen(false);
      loadAuthors();
    } else {
      alert(response.message);
    }
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
            Trang quản lý Tác giả
          </h2>

          {/* Thanh tìm kiếm và Nút thêm */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Tìm theo tên tác giả"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              style={{ padding: "10px", width: "300px" }}
            />
            <button style={buttonStyle} onClick={handleSearch}>Tìm kiếm</button>
            <button style={buttonStyle} onClick={handleAdd}>Thêm tác giả</button>
          </div>

          {/* Bảng danh sách tác giả */}
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Tên tác giả</th>
                <th style={thStyle}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {authors.length > 0 ? (
                authors.map((author, index) => (
                  <tr key={author.id}>
                    <td style={thTdStyle}>{index + 1}</td> {/* Đánh số ID theo thứ tự */}
                    <td style={thTdStyle}>{author.name}</td>
                    <td style={thTdStyle}>
                      <button style={buttonStyle} onClick={() => handleEdit(author)}>Sửa</button>
                      <button style={deleteButtonStyle} onClick={() => handleDelete(author.id)}>Xóa</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={thTdStyle}>Không có dữ liệu</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>

      <ToTopButton />
      
      {/* Modal thêm/sửa tác giả */}
      <AuthorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmitModal}
        author={selectedAuthor}
      />
    </div>
  );
};

export default AuthorPage;
