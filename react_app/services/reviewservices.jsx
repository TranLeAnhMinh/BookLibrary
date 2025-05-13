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