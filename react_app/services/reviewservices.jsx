const API_URL = "http://localhost:5000/api/reviews";  // Đổi API_URL cho phù hợp với endpoint reviews

export const getReviewsByBookId = async (book_id) => {
  try {
    const response = await fetch(`${API_URL}/${book_id}`);
    const data = await response.json();
    return response.ok ? { success: true, reviews: data.reviews } : { success: false, message: data.message };
  } catch (err) {
    return { success: false, message: "Lỗi kết nối server" };
  }
};

export const submitReview = async (book_id, user_id, star, comment) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        book_id: book_id,
        user_id: user_id,
        star: star,
        comment: comment,
      }),
    });

    const data = await response.json();
    return response.ok ? { success: true, message: data.message } : { success: false, message: data.message };
  } catch (err) {
    return { success: false, message: "Lỗi kết nối server" };
  }
};

export const searchReviews = async (query) => {
  try {
    const response = await fetch(`${API_URL}/search?query=${query}`);
    const data = await response.json();
    return response.ok ? { success: true, reviews: data.reviews } : { success: false, message: data.message };
  } catch (err) {
    return { success: false, message: "Lỗi kết nối server" };
  }
};

// Cập nhật trạng thái của một đánh giá
export const updateReviewStatus = async (review_id, new_status) => {
  try {
    const response = await fetch(`${API_URL}/${review_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: new_status,
      }),
    });

    const data = await response.json();
    return response.ok ? { success: true, message: data.message } : { success: false, message: data.message };
  } catch (err) {
    return { success: false, message: "Lỗi kết nối server" };
  }
};

// Xóa một đánh giá
export const deleteReview = async (review_id) => {
  try {
    const response = await fetch(`${API_URL}/${review_id}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    return response.ok ? { success: true, message: data.message } : { success: false, message: data.message };
  } catch (err) {
    return { success: false, message: "Lỗi kết nối server" };
  }
};

export const getAllReviewsWithDetails = async () => {
  try {
    const response = await fetch(`${API_URL}/details`);
    const data = await response.json();
    return response.ok ? { success: true, reviews: data.reviews } : { success: false, message: data.message };
  } catch (err) {
    return { success: false, message: "Lỗi kết nối server" };
  }
};
