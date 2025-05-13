const API_URL = "http://localhost:5000/api/auth/update";  // Cập nhật đường dẫn API cho update user

export const updateUser = async (userId, fullName, phoneNumber, gender, provinceId, districtId, wardId, address) => {
  try {
    const response = await fetch(API_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        fullName,
        phoneNumber,
        gender,
        provinceId,
        districtId,
        wardId,
        address,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      // Nếu cập nhật thành công
      return {
        success: true,
        message: data.message,
        user: data.user,  // Trả về thông tin người dùng mới
      };
    } else {
      return {
        success: false,
        message: data.message || "Error updating user",
      };
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      success: false,
      message: "Failed to connect to the server",
    };
  }
};


export const getAllUsers = async () => {
  const res = await fetch("http://localhost:5000/api/users");
  const data = await res.json();
  return data;
};

export const blockUser = async (userId) => {
  const res = await fetch(`http://localhost:5000/api/users/${userId}/block`, {
    method: "PUT",
  });
  const data = await res.json();
  return data;
};