const API_URL = "http://localhost:5000/api/auth/login";

export const login = async (email, password) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        console.log("Data from login API:", data);

        if (response.ok) {
            // ✅ Lưu toàn bộ user object trả về
            sessionStorage.setItem("user", JSON.stringify(data.user));

            return {
                success: true,
                user: data.user,
            };
        } else {
            return {
                success: false,
                message: data.message || "Fail to sign in",
            };
        }
    } catch (error) {
        console.error("Login error:", error);
        return {
            success: false,
            message: "Fail to connect to server",
        };
    }
};
