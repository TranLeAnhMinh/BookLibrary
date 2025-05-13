import React, { useState, useEffect } from "react";
import Sidebar from "../componets/Sidebar";
import AdminHeader from "../componets/AdminHeader";
import ToTopButton from "../componets/ToTopButton";
import EmployeeModal from "../componets/EmployeeModal";
import { exportEmployeesExcel } from "../../services/employeeservices";
import { getAllEmployees, searchEmployees, deleteEmployee, addEmployee, updateEmployee } from "../../services/employeeservices";


const EmployeePage = () => {
    // Toggle sidebar
    const [sidebarOpen, setSidebarOpen] = useState(true);
  
    // Danh sách nhân viên
    const [employees, setEmployees] = useState([]);
  
    // Modal trạng thái & nhân viên được chọn (nếu đang sửa)
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
  
    // Tìm kiếm
    const [searchText, setSearchText] = useState("");
  
    // Style chung cho button
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
    

    const handleDownloadExcel = async () => {
      const result = await exportEmployeesExcel();
      if (!result.success) alert(result.message);
    };
    // Load toàn bộ nhân viên từ API
    const loadEmployees = async () => {
      const res = await getAllEmployees();
      if (res.success) {
        setEmployees(res.employees);
      } else {
        alert("Lỗi khi tải nhân viên.");
      }
    };
  
    // Gọi API tìm kiếm
    const handleSearch = async () => {
      if (searchText.trim()) {
        const res = await searchEmployees(searchText);
        if (res.success) {
          setEmployees(res.employees);
        } else {
          alert("Tìm kiếm thất bại.");
        }
      } else {
        loadEmployees();
      }
    };
  
    // Gọi API xóa
    const handleDelete = async (id) => {
      if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
        const res = await deleteEmployee(id);
        if (res.success) {
          alert("Đã xoá thành công.");
          loadEmployees();
        } else {
          alert(res.message);
        }
      }
    };
  
    // Mở modal để sửa
    const handleEdit = (employee) => {
      setSelectedEmployee(employee);
      setModalOpen(true);
    };
  
    // Mở modal để thêm
    const handleAdd = () => {
      setSelectedEmployee(null);
      setModalOpen(true);
    };
  
    // Gửi form từ modal (thêm hoặc sửa)
    const handleSubmitModal = async (data) => {
      if (selectedEmployee) {
        const res = await updateEmployee(selectedEmployee.id, data);
        if (res.success) {
          alert("Cập nhật thành công.");
          setModalOpen(false);
          loadEmployees();
        } else {
          alert(res.message);
        }
      } else {
        const res = await addEmployee(data);
        if (res.success) {
          alert("Thêm nhân viên thành công.");
          setModalOpen(false);
          loadEmployees();
        } else {
          alert(res.message);
        }
      }
    };
  
    // Gọi load dữ liệu khi component mount
    useEffect(() => {
      loadEmployees();
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
              Trang quản lý Nhân viên
            </h2>
  
            {/* Thanh tìm kiếm và Import */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              <input
                type="text"
                placeholder="Tìm theo tên hoặc mã nhân viên"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                style={{ padding: "10px", width: "300px" }}
              />
              <button style={buttonStyle} onClick={handleSearch}>Tìm kiếm</button>
              <button style={buttonStyle} onClick={handleDownloadExcel}>
                    Export danh sách
              </button>
            </div>
  
            {/* Bảng danh sách nhân viên */}
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Mã nhân viên</th>
                  <th style={thStyle}>Tên nhân viên</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Hành động</th>
                </tr>
              </thead>
              <tbody>
  {employees.length > 0 ? (
    employees.map((emp, index) => (
      <tr key={emp.id}>
        <td style={thTdStyle}>{index + 1}</td> {/* Đánh số thứ tự */}
        <td style={thTdStyle}>{emp.employee_code}</td>
        <td style={thTdStyle}>{emp.full_name}</td>
        <td style={thTdStyle}>{emp.email}</td>
        <td style={thTdStyle}>
          <button style={buttonStyle} onClick={() => handleEdit(emp)}>Sửa</button>
          <button style={deleteButtonStyle} onClick={() => handleDelete(emp.id)}>Xóa</button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5" style={thTdStyle}>Không có dữ liệu</td>
    </tr>
  )}
</tbody>
            </table>
  
            {/* Nút thêm nhân viên */}
            <button style={{ ...buttonStyle, marginTop: "20px" }} onClick={handleAdd}>
              Thêm nhân viên
            </button>
          </section>
        </main>
  
        {/* Nút về đầu trang */}
        <ToTopButton />
  
        {/* Modal thêm/sửa nhân viên */}
        <EmployeeModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmitModal}
          employee={selectedEmployee}
        />
      </div>
    );
  };
  
  export default EmployeePage;