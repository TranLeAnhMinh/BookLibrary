import React, { useState, useEffect } from "react";
import Sidebar from "../componets/Sidebar";
import AdminHeader from "../componets/AdminHeader";
import ToTopButton from "../componets/ToTopButton";
import { getAllUsers, blockUser } from "../../services/userservices";

const UserPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");

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

  const blockButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#e67e22",
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

  // Lấy danh sách tất cả users
  const loadUsers = async () => {
    const res = await getAllUsers();
    if (res.success) {
      setUsers(res.users);
    } else {
      alert("Không thể tải danh sách user");
    }
  };

  // Tìm kiếm đơn giản bằng cách lọc phía client
  const handleSearch = () => {
    if (!searchText.trim()) {
      loadUsers();
    } else {
      const filtered = users.filter((user) =>
        (user.full_name || "").toLowerCase().includes(searchText.toLowerCase()) ||
        (user.email || "").toLowerCase().includes(searchText.toLowerCase())
      );
      setUsers(filtered);
    }
  };

  const handleBlock = async (userId) => {
    if (window.confirm("Bạn có muốn block user này không?")) {
      const res = await blockUser(userId);
      if (res.success) {
        alert("User đã bị block.");
        loadUsers();
      } else {
        alert(res.message || "Block thất bại.");
      }
    }
  };

  useEffect(() => {
    loadUsers();
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
            Trang quản lý người dùng
          </h2>

          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Tìm theo tên, email hoặc mã NV"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              style={{ padding: "10px", width: "300px" }}
            />
            <button style={buttonStyle} onClick={handleSearch}>Tìm kiếm</button>
          </div>

          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>STT</th>
                <th style={thStyle}>Tên</th>
                <th style={thStyle}>Giới tính</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>SĐT</th>
                <th style={thStyle}>Địa chỉ</th>
                <th style={thStyle}>Ngày sinh</th>
                <th style={thStyle}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user.id}>
                    <td style={thTdStyle}>{index + 1}</td>
                    <td style={thTdStyle}>{user.full_name}</td>
                    <td style={thTdStyle}>
                      {user.gender === 0 ? "Nam" : user.gender === 1 ? "Nữ" : "Khác"}
                    </td>
                    <td style={thTdStyle}>{user.email}</td>
                    <td style={thTdStyle}>{user.phone_number || "-"}</td>
                    <td style={thTdStyle}>
                      {[user.address, user.ward_name, user.district_name, user.province_name]
                        .filter(Boolean)
                        .join(", ")}
                    </td>
                    <td style={thTdStyle}>
                        {user.birth_date ? new Date(user.birth_date).toLocaleDateString("vi-VN") : "-"}
                    </td>
                    <td style={thTdStyle}>
                      {user.status === 1 ? (
                        <button style={blockButtonStyle} onClick={() => handleBlock(user.id)}>
                          Block
                        </button>
                      ) : (
                        <span style={{ color: "#c0392b" }}>Đã bị block</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={thTdStyle}>Không có dữ liệu</td>
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

export default UserPage;
