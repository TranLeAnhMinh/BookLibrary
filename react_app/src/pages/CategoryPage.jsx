import React, { useState, useEffect } from "react";
import Sidebar from "../componets/Sidebar";
import AdminHeader from "../componets/AdminHeader";
import ToTopButton from "../componets/ToTopButton";
import CategoryModal from "../componets/CategoryModal"; // Modal cho thêm/sửa danh mục
import { getAllCategories,deleteCategory,addCategory,updateCategory } from "../../services/categoryservices";
const CategoryPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  // Fetch all categories
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const response = await getAllCategories();
    if (response.success) {
      setCategories(response.categories);
    } else {
      alert(response.message);
    }
  };

  const handleSearch = () => {
    if (searchText.trim()) {
      setCategories(categories.filter(category => category.name.toLowerCase().includes(searchText.toLowerCase())));
    } else {
      loadCategories();
    }
  };

  const handleDelete = async (id) => {
    const response = await deleteCategory(id);
    if (response.success) {
      loadCategories();
    } else {
      alert(response.message);
    }
  };

  const handleAdd = () => {
    setSelectedCategory(null);
    setModalOpen(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setModalOpen(true);
  };

  const handleSubmitModal = async (data) => {
    let response;
    if (selectedCategory) {
      response = await updateCategory(selectedCategory.id, data);
    } else {
      response = await addCategory(data);
    }

    if (response.success) {
      setModalOpen(false);
      loadCategories();
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
            Trang quản lý Danh mục
          </h2>

          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Tìm theo tên danh mục"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              style={{ padding: "10px", width: "300px" }}
            />
            <button style={buttonStyle} onClick={handleSearch}>Tìm kiếm</button>
            <button style={buttonStyle} onClick={handleAdd}>Thêm danh mục</button>
          </div>

          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Tên danh mục</th>
                <th style={thStyle}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <tr key={category.id}>
                    <td style={thTdStyle}>{index + 1}</td>
                    <td style={thTdStyle}>{category.name}</td>
                    <td style={thTdStyle}>
                      <button style={buttonStyle} onClick={() => handleEdit(category)}>Sửa</button>
                      <button style={deleteButtonStyle} onClick={() => handleDelete(category.id)}>Xóa</button>
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
      
      {/* Modal thêm/sửa danh mục */}
      <CategoryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmitModal}
        category={selectedCategory}
      />
    </div>
  );
};

export default CategoryPage;
