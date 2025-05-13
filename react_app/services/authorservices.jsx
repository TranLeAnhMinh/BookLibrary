const API_URL = "http://localhost:5000/api/authors";

export const getAllAuthors = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return response.ok ? { success: true, authors: data.authors } : { success: false, message: data.message };
  } catch (err) {
    return { success: false, message: "Lỗi kết nối server" };
  }
};

export const searchAuthors = async (keyword) => {
  try {
    const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(keyword)}`);
    const data = await response.json();
    return response.ok ? { success: true, results: data.results } : { success: false, message: data.message };
  } catch (err) {
    return { success: false, message: "Lỗi kết nối server" };
  }
};

export const deleteAuthor = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    const data = await response.json();
    return { success: response.ok, message: data.message };
  } catch {
    return { success: false, message: "Xoá tác giả thất bại" };
  }
};

export const addAuthor = async (data) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return { success: response.ok, message: result.message };
  } catch {
    return { success: false, message: "Lỗi thêm tác giả" };
  }
};

export const updateAuthor = async (id, data) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return { success: response.ok, message: result.message };
  } catch {
    return { success: false, message: "Lỗi cập nhật tác giả" };
  }
};