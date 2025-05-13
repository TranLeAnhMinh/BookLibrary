const API_URL = "http://localhost:5000/api/publishers";

// Lấy danh sách nhà xuất bản
export const getAllPublishers = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return response.ok ? { success: true, publishers: data.publishers } : { success: false, message: data.message };
  } catch (err) {
    return { success: false, message: "Lỗi kết nối server" };
  }
};

// Tìm kiếm nhà xuất bản
export const searchPublishers = async (keyword) => {
  try {
    const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(keyword)}`);
    const data = await response.json();
    return response.ok ? { success: true, results: data.results } : { success: false, message: data.message };
  } catch (err) {
    return { success: false, message: "Lỗi kết nối server" };
  }
};

// Thêm nhà xuất bản
export const addPublisher = async (data) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return { success: res.ok, message: result.message };
  } catch (err) {
    return { success: false, message: "Lỗi thêm nhà xuất bản" };
  }
};

// Sửa nhà xuất bản
export const updatePublisher = async (id, data) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return { success: res.ok, message: result.message };
  } catch (err) {
    return { success: false, message: "Lỗi cập nhật nhà xuất bản" };
  }
};

// Xóa nhà xuất bản
export const deletePublisher = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    const result = await res.json();
    return { success: res.ok, message: result.message };
  } catch (err) {
    return { success: false, message: "Lỗi xóa nhà xuất bản" };
  }
};
