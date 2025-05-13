const API_BASE = "http://localhost:5000/api";

export const getWishlistByUserId = async (userId) => {
  try {
    const response = await fetch(`${API_BASE}/wishlist/${userId}`);
    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        wishlist: data.wishlist,
      };
    } else {
      return {
        success: false,
        message: data.message || "Lỗi khi lấy danh sách yêu thích",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Không kết nối được server",
    };
  }
};
export const deleteFromWishlist = async (userId, bookId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/wishlist/${userId}/${bookId}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: data.message };
    } else {
      return { success: false, message: data.message || "Xóa thất bại" };
    }
  } catch (error) {
    return { success: false, message: "Không thể kết nối đến server" };
  }
};
export const addToWishlist = async (userId, bookId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId, book_id: bookId }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: data.message };
    } else {
      return { success: false, message: data.message || "Thêm vào danh sách yêu thích thất bại" };
    }
  } catch (error) {
    return { success: false, message: "Không thể kết nối đến server" };
  }
};


