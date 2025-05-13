import React, { useState } from "react";
import Sidebar from "../componets/Sidebar";
import AdminHeader from "../componets/AdminHeader";
import ToTopButton from "../componets/ToTopButton";

const AdminHomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <AdminHeader onToggleSidebar={handleToggleSidebar} />
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
          <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "10px" }}>
            Trang Admin
          </h2>
        </section>

        <section style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <div style={{ flex: 1, padding: "20px", background: "#ecf0f1", borderRadius: "8px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "600" }}>Số lượng người dùng</h3>
            <p style={{ fontSize: "24px", fontWeight: "700", color: "#2c3e50" }}>1,500</p>
          </div>
          <div style={{ flex: 1, padding: "20px", background: "#ecf0f1", borderRadius: "8px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "600" }}>Số lượng sách</h3>
            <p style={{ fontSize: "24px", fontWeight: "700", color: "#2c3e50" }}>200</p>
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: "20px", fontWeight: "600" }}>Danh mục sách</h2>
          {/* Có thể thêm một bảng danh sách hoặc thêm biểu đồ ở đây */}
        </section>
      </main>
      <ToTopButton />
    </div>
  );
};

export default AdminHomePage;
