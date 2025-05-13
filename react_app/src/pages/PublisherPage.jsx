import React, { useState, useEffect } from "react";
import { getAllPublishers, searchPublishers, deletePublisher, addPublisher, updatePublisher } from "../../services/publisherservices"; // Import services
import Sidebar from "../componets/Sidebar";
import AdminHeader from "../componets/AdminHeader";
import ToTopButton from "../componets/ToTopButton";
import PublisherModal from "../componets/PublisherModal";  // Modal cho thêm/sửa nhà xuất bản

const PublisherPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [publishers, setPublishers] = useState([]);
  const [searchText, setSearchText] = useState(""); // Tìm kiếm
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPublisher, setSelectedPublisher] = useState(null);

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "flex-start", // Căn trái
    gap: "10px", // Khoảng cách giữa các nút
  };

  const buttonStyle = {
    padding: "8px 16px",
    backgroundColor: "#2c3e50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
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

  // Lấy danh sách nhà xuất bản từ API
  useEffect(() => {
    loadPublishers();
  }, []);

  const loadPublishers = async () => {
    const response = await getAllPublishers();  // Gọi API để lấy danh sách nhà xuất bản
    if (response.success) {
      setPublishers(response.publishers);  // Cập nhật lại danh sách publishers
    } else {
      alert(response.message);  // Thông báo nếu có lỗi
    }
  };

  // Tìm kiếm nhà xuất bản
  const handleSearch = async () => {
    if (searchText.trim()) {
      const response = await searchPublishers(searchText); // Gọi API tìm kiếm
      if (response.success) {
        setPublishers(response.results);
      } else {
        alert(response.message);
      }
    } else {
      loadPublishers(); // Nếu không có tìm kiếm, tải lại tất cả nhà xuất bản
    }
  };

  // Thêm nhà xuất bản
  const handleAdd = () => {
    setSelectedPublisher(null);
    setModalOpen(true);
  };

  // Sửa nhà xuất bản
  const handleEdit = (publisher) => {
    setSelectedPublisher(publisher);
    setModalOpen(true);
  };

  // Xóa nhà xuất bản (Hiển thị hộp thoại xác nhận)
  const handleDelete = (publisher) => {
    // Lưu publisher vào state trước khi mở prompt xác nhận xóa
    setSelectedPublisher(publisher);
    const confirmDelete = window.confirm(
      `Bạn chắc chắn muốn xóa nhà xuất bản "${publisher.name}"?`
    );
  
    // Nếu xác nhận xóa, thực hiện xóa
    if (confirmDelete) {
      handleDeleteConfirm(publisher); // Truyền publisher vào hàm xác nhận xóa
    }
  };
  
  // Xác nhận xóa nhà xuất bản
  const handleDeleteConfirm = async (publisher) => {
    // Gọi API xóa với publisher đã được chọn
    const response = await deletePublisher(publisher.id);  // Gọi API xóa
    if (response.success) {
      loadPublishers();  // Lấy lại dữ liệu publisher sau khi xóa thành công
    } else {
      alert(response.message);  // Thông báo lỗi nếu xóa không thành công
    }
  };

  // Submit modal thêm/sửa nhà xuất bản
  const handleSubmitModal = async (data) => {
    let response;
    if (selectedPublisher) {
      response = await updatePublisher(selectedPublisher.id, data);
    } else {
      response = await addPublisher(data);
    }

    if (response.success) {
      setModalOpen(false);
      loadPublishers();
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
            Trang quản lý Nhà Xuất Bản
          </h2>

          {/* Thanh tìm kiếm */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Tìm theo tên nhà xuất bản"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ padding: "10px", width: "300px" }}
            />
            <button style={buttonStyle} onClick={handleSearch}>
              Tìm kiếm
            </button>
            <button style={buttonStyle} onClick={handleAdd}>
              Thêm nhà xuất bản
            </button>
          </div>

          {/* Bảng danh sách nhà xuất bản */}
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Tên nhà xuất bản</th>
                <th style={thStyle}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {publishers.length > 0 ? (
                publishers.map((publisher, index) => (
                  <tr key={publisher.id}>
                    <td style={thTdStyle}>{index + 1}</td> {/* Đánh số ID theo thứ tự */}
                    <td style={thTdStyle}>{publisher.name}</td>
                    <td style={thTdStyle}>
                      <div style={buttonContainerStyle}>
                        <button style={buttonStyle} onClick={() => handleEdit(publisher)}>
                          Sửa
                        </button>
                        <button
                          style={deleteButtonStyle}
                          onClick={() => handleDelete(publisher)}
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={thTdStyle}>
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>

      <ToTopButton />

      {/* Modal Thêm/Sửa */}
      <PublisherModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmitModal}
        publisher={selectedPublisher}
      />
    </div>
  );
};

export default PublisherPage;
