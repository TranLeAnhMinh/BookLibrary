import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const sidebarStyle = {
    width: isOpen ? "200px" : "0", // Chiều rộng cố định
    backgroundColor: "#2c3e50", // Màu nền tối sang trọng
    color: "white", // Màu chữ sáng dễ đọc
    position: "fixed",
    top: "60px",
    bottom: 0,
    left: 0,
    transition: "width 0.2s ease", // Hiệu ứng trượt mượt mà
    padding: isOpen ? "20px" : "0", // Thêm padding khi mở sidebar
    zIndex: 2,
    boxShadow: "2px 0 15px rgba(0, 0, 0, 0.3)", // Thêm bóng đổ tạo chiều sâu
    overflow: "hidden", // Không để các mục tràn ra ngoài
  };

  const itemStyle = {
    margin: "15px 0", // Khoảng cách giữa các mục
    cursor: "pointer", 
    padding: "12px 20px", // Padding hợp lý để dễ click
    borderRadius: "8px", // Viền bo tròn tạo cảm giác mềm mại
    fontSize: "16px", // Kích thước chữ dễ đọc
    fontWeight: "500", // Trọng lượng chữ hợp lý
    transition: "background-color 0.3s ease, padding 0.3s ease", // Hiệu ứng hover mượt mà
    display: "block", // Đảm bảo mỗi item chiếm toàn bộ chiều rộng
    textDecoration: "none", // Bỏ underline của Link
    color: "white", // Màu chữ
    lineHeight: "1.5", // Điều chỉnh chiều cao dòng
  };

  const itemHoverStyle = {
    backgroundColor: "#34495e", // Màu nền khi hover
    paddingLeft: "30px", // Tạo hiệu ứng mở rộng khi hover
  };

  const items = [
    { label: "Dashboard", path: "/admin" },
    { label: "Nhân viên", path: "/admin/employees" },
    { label: "Người dùng", path: "/admin/users" },
  ];

  const danhMuc = [
    { label: "Tác giả", path: "/admin/authors" },
    { label: "Nhà xuất bản", path: "/admin/publishers" },
    { label: "Sách", path: "/admin/books" },
    { label: "Thể loại", path: "/admin/categories" },
  ];

  const bottomItems = [
    { label: "Quản lý đơn mượn", path: "/admin/borrow-orders" },
    { label: "Đánh giá", path: "/admin/reviews" },
  ];

  return (
    <aside style={sidebarStyle}>
      <div style={{ fontSize: "24px", fontWeight: "700", marginBottom: "20px", color: "#ecf0f1" }}>
        BookLib Admin
      </div>

      {/* Các mục chính */}
      {items.map((item, i) => (
        <Link
          key={i}
          to={item.path}
          style={itemStyle}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = itemHoverStyle.backgroundColor)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          {item.label}
        </Link>
      ))}

      {/* Các mục danh mục */}
      {danhMuc.map((item, i) => (
        <Link
          key={i}
          to={item.path}
          style={itemStyle}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = itemHoverStyle.backgroundColor)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          {item.label}
        </Link>
      ))}

      {/* Các mục phía dưới */}
      {bottomItems.map((item, i) => (
        <Link
          key={i}
          to={item.path}
          style={itemStyle}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = itemHoverStyle.backgroundColor)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          {item.label}
        </Link>
      ))}
    </aside>
  );
};

export default Sidebar;
