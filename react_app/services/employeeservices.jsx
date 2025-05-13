const API_URL = "http://localhost:5000/api/employees";

export const getAllEmployees = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return response.ok ? { success: true, employees: data.employees } : { success: false, message: data.message };
  } catch (err) {
    return { success: false, message: "Lỗi kết nối server" };
  }
};

export const searchEmployees = async (keyword) => {
  try {
    const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(keyword)}`);
    const data = await response.json();
    return response.ok ? { success: true, employees: data.results } : { success: false, message: data.message };
  } catch (err) {
    return { success: false, message: "Lỗi kết nối server" };
  }
};

export const deleteEmployee = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    const data = await response.json();
    return { success: response.ok, message: data.message };
  } catch {
    return { success: false, message: "Xoá thất bại" };
  }
};


export const addEmployee = async (data) => {
    try {
      const res = await fetch("http://localhost:5000/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      return { success: res.ok, message: result.message };
    } catch {
      return { success: false, message: "Lỗi thêm nhân viên" };
    }
  };
  
  export const updateEmployee = async (id, data) => {
    try {
      const res = await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      return { success: res.ok, message: result.message };
    } catch {
      return { success: false, message: "Lỗi cập nhật nhân viên" };
    }
  };

  export const exportEmployeesExcel = async () => {
    try {
      const res = await fetch(`${API_URL}/export`);
      if (!res.ok) throw new Error("Không thể tải file");
      const blob = await res.blob();
  
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "danh_sach_nhan_vien.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
  
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Lỗi tải file Excel" };
    }
  };