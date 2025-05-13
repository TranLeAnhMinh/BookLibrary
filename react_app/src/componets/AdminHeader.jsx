import React from "react";

const AdminHeader = ({ onToggleSidebar }) => {
  const headerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "60px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #ddd",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    zIndex: 1000,
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Thêm bóng cho header để nổi bật hơn
  };

  // Style cho thanh tìm kiếm, giống UserHeader
  const searchBarStyle = {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#ffffff",
    border: "1px solid #ccc",
    borderRadius: "20px", // Bo tròn giống UserHeader
    padding: "5px",
    width: "250px", // Độ rộng hợp lý
  };

  // Style cho input trong thanh tìm kiếm
  const inputStyle = {
    border: "none",
    outline: "none",
    flex: 1,
    padding: "8px",
    fontSize: "14px",
    borderRadius: "20px", // Bo tròn như UserHeader
    background: "transparent",
  };

  // Style cho nút tìm kiếm
  const buttonStyle = {
    background: "transparent",
    color: "#333",
    border: "none",
    padding: "5px 10px",
    fontSize: "14px",
    borderRadius: "50%",
    cursor: "pointer",
  };

  // Style cho dropdown ngôn ngữ
  const languageDropdownStyle = {
    padding: "6px 12px",
    borderRadius: "25px", // Bo tròn dễ nhìn hơn
    backgroundColor: "#f0f0f0",
    border: "1px solid #ddd",
    fontSize: "14px",
    cursor: "pointer",
  };

  return (
    <header style={headerStyle}>
      {/* Đổi biểu tượng ba sọc thành một icon đẹp hơn */}
      <button 
        onClick={onToggleSidebar} 
        style={{
          fontSize: "18px", 
          cursor: "pointer", 
          background: "transparent", 
          border: "none", 
          color: "#333"
        }}>
        ☰
      </button>
      {/* Chỉnh sửa phần chuyển ngôn ngữ */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <select style={languageDropdownStyle}>
          <option>Tiếng Việt</option>
          <option>English</option>
        </select>
      </div>
    </header>
  );
};

export default AdminHeader;
