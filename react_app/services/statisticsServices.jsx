const API_STATS_URL = "http://localhost:5000/api/statistics/summary";

export const getStatisticsSummary = async () => {
  try {
    const res = await fetch(API_STATS_URL);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Lỗi khi gọi API thống kê:", err);
    return { success: false, message: "Không thể kết nối máy chủ" };
  }
};
