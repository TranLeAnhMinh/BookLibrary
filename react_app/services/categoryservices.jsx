const API_URL = "http://localhost:5000/api/categories";

export const getAllCategories = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return response.ok ? { success: true, categories: data.categories } : { success: false, message: data.message };
  } catch (err) {
    return { success: false, message: "Lỗi kết nối server" };
  }
};

export const addCategory = async (data) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return response.ok ? { success: true, message: result.message } : { success: false, message: result.message };
  } catch {
    return { success: false, message: "Lỗi thêm danh mục" };
  }
};

export const updateCategory = async (id, data) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return response.ok ? { success: true, message: result.message } : { success: false, message: result.message };
  } catch {
    return { success: false, message: "Lỗi cập nhật danh mục" };
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    const result = await response.json();
    return { success: response.ok, message: result.message };
  } catch {
    return { success: false, message: "Xóa thất bại" };
  }
};