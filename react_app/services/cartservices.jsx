const API_BASE = "http://localhost:5000/api";

export const getCartByUserId = async (userId) => {
  try {
    const response = await fetch(`${API_BASE}/cart/${userId}`);
    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        cart: data.cart,
      };
    } else {
      return {
        success: false,
        message: data.message || "Lỗi khi lấy dữ liệu giỏ hàng",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Không kết nối được server",
    };
  }
};

export const addToCart = async (userId, bookId) => {
  try {
    const response = await fetch(`${API_BASE}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: userId,
        book_id: bookId,
        quantity: 1,
        return_date_due: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0] // ngày trả sau 7 ngày
      })
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: data.message };
    } else {
      return { success: false, message: data.message || "Lỗi khi thêm vào giỏ hàng" };
    }
  } catch (error) {
    return {
      success: false,
      message: "Không thể kết nối đến server"
    };
  }
};
export const deleteFromCart = async (userId, bookId) => {
  try {
    const response = await fetch(`${API_BASE}/cart/${userId}/${bookId}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: data.message };
    } else {
      return { success: false, message: data.message || "Xóa khỏi giỏ hàng thất bại" };
    }
  } catch (error) {
    return { success: false, message: "Không thể kết nối đến server" };
  }
};

// Gửi lần đầu để TẠO order mới
export const createOrderFromCart = async (userId, cart) => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  try {
    const response = await fetch(`${API_BASE}/orders/save-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: userId,
        full_name: user.fullName,
        email: user.email,
        phone_number: user.phoneNumber,
        address: user.address,
        province_id: user.provinceId,
        district_id: user.districtId,
        ward_id: user.wardId,
        items: cart.map(item => ({
          book_id: item.id,
          quantity: item.quantity,
          return_date_due: item.dueDate
        }))
      })
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, orderId: data.order_id, message: data.message };
    } else {
      return { success: false, message: data.message || "Lỗi khi tạo đơn hàng" };
    }
  } catch (error) {
    return { success: false, message: "Không thể kết nối đến server" };
  }
};

// Gửi lần sau để UPDATE đơn đã có
export const updateOrderDetails = async (orderId, cart) => {
  try {
    const response = await fetch(`${API_BASE}/orders/update-cart/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        items: cart.map(item => ({
          book_id: item.id,
          quantity: item.quantity,
          return_date_due: item.dueDate
        }))
      })
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: data.message };
    } else {
      return { success: false, message: data.message || "Lỗi khi cập nhật đơn hàng" };
    }
  } catch (error) {
    return { success: false, message: "Không thể kết nối đến server" };
  }
};

export const getOrderDetails = async (orderId) => {
  try {
    const response = await fetch(`${API_BASE}/orders/${orderId}`);
    const data = await response.json();

    if (response.ok) {
      return { success: true, books: data.books };
    } else {
      return { success: false, message: data.message || "Lỗi khi lấy chi tiết đơn hàng" };
    }
  } catch (error) {
    return { success: false, message: "Không thể kết nối đến server" };
  }
};

export const searchOrders = async (keyword) => {
  try {
    const response = await fetch(`/api/orders/search?keyword=${keyword}`);
    const data = await response.json();
    if (response.ok) {
      return { success: true, orders: data.orders };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    return { success: false, message: "Không thể kết nối đến server" };
  }
};


export const getAllOrders = async () => {
  try {
    // Gửi yêu cầu để lấy tất cả các đơn mượn
    const response = await fetch(`${API_BASE}/orders`);  // Sửa dấu ngoặc kép thành backticks
    const data = await response.json();
    
    if (response.ok) {
      return { success: true, orders: data.orders };
    } else {
      return { success: false, message: data.message || "Không thể lấy danh sách đơn mượn." };
    }
  } catch (error) {
    return { success: false, message: "Không kết nối đến server" };
  }
};
