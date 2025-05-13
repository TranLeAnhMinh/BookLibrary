import React, { useEffect, useState } from "react";
import Sidebar from "../componets/Sidebar";
import AdminHeader from "../componets/AdminHeader";
import ToTopButton from "../componets/ToTopButton";
import BorrowOrderDetailsModal from "../componets/BorrowOrderDetailsModal";
import { getAllOrders, getOrderDetails } from "../../services/cartservices";

const BorrowOrdersPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [searchText, setSearchText] = useState("");

  const statusMap = {
    0: "Đang mượn",
    1: "Đã trả",
    2: "Quá hạn",
    3: "Mất",
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

  const fetchOrders = async () => {
  const res = await getAllOrders(); // Gọi API không cần keyword
  if (res.success) {
    setOrders(res.orders || []);
  } else {
    alert(res.message || "Không thể tải đơn mượn.");
  }
};

  const handleSearch = () => {
    fetchOrders(searchText.trim());
  };

  const handleViewBooks = async (orderId) => {
    const res = await getOrderDetails(orderId);
    if (res.success) {
      setSelectedBooks(
        res.books.map((b) => ({
          title: b.title,
          returnDateDue: b.return_date_due,
          returnDateReal: b.return_date_real || null,
          status: b.status || 0,
        }))
      );
      setModalOpen(true);
    } else {
      alert(res.message || "Không thể lấy chi tiết sách.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <AdminHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} />
      <main
        style={{
          marginLeft: sidebarOpen ? "250px" : "0",
          marginTop: "60px",
          padding: "20px",
          width: "100%",
        }}
      >
        <h2 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "20px" }}>
          Quản lý Đơn mượn
        </h2>

        {/* Search */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, email hoặc mã NV"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            style={{ padding: "8px", width: "300px" }}
          />
          <button style={buttonStyle} onClick={handleSearch}>
            Tìm kiếm
          </button>
        </div>

        {/* Table */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={thStyle}>#</th>
              <th style={thStyle}>Tên người mượn</th>
              <th style={thStyle}>Mã nhân viên</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Trạng thái</th>
              <th style={thStyle}>Ngày tạo</th>
              <th style={thStyle}>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={order.id}>
                  <td style={thTdStyle}>{index + 1}</td>
                  <td style={thTdStyle}>{order.full_name}</td>
                  <td style={thTdStyle}>{order.employee_code}</td>
                  <td style={thTdStyle}>{order.email}</td>
                  <td style={thTdStyle}>{statusMap[order.status]}</td>
                  <td style={thTdStyle}>{order.created_at?.substring(0, 10)}</td>
                  <td style={thTdStyle}>
                    <button
                      style={buttonStyle}
                      onClick={() => handleViewBooks(order.id)}
                    >
                      Xem sách
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={thTdStyle}>
                  Không có đơn mượn nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <ToTopButton />
      </main>

      <BorrowOrderDetailsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        books={selectedBooks}
      />
    </div>
  );
};

export default BorrowOrdersPage;
