import React, { useState, useEffect } from "react";

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};

const modalBox = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "10px",
  width: "400px",
  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const EmployeeModal = ({ isOpen, onClose, onSubmit, employee }) => {
  const [employeeCode, setEmployeeCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (employee) {
      setEmployeeCode(employee.employee_code);
      setFullName(employee.full_name);
      setEmail(employee.email);
    } else {
      setEmployeeCode("");
      setFullName("");
      setEmail("");
    }
  }, [employee]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!employeeCode || !fullName || !email) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    onSubmit({
      employee_code: employeeCode,
      full_name: fullName,
      email,
    });
  };

  return (
    <div style={modalOverlay}>
      <div style={modalBox}>
        <h3>{employee ? "Sửa nhân viên" : "Thêm nhân viên"}</h3>
        <input
          type="text"
          placeholder="Mã nhân viên"
          style={inputStyle}
          value={employeeCode}
          onChange={(e) => setEmployeeCode(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tên nhân viên"
          style={inputStyle}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          style={inputStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <button onClick={onClose} style={{ padding: "8px 16px" }}>Huỷ</button>
          <button onClick={handleSubmit} style={{ padding: "8px 16px", backgroundColor: "#2c3e50", color: "white", border: "none", borderRadius: "5px" }}>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;
