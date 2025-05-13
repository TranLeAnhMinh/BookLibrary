// locationservices.jsx
const API_URL = "http://localhost:5000/api/locations"; // Đảm bảo đường dẫn API đúng

// Lấy danh sách tỉnh
export const getProvinces = async () => {
    try {
        const response = await fetch(`${API_URL}/provinces`);
        if (response.ok) {
            const data = await response.json();
            return data.provinces || [];
        } else {
            console.error("Failed to fetch provinces data");
            return [];
        }
    } catch (error) {
        console.error("Error fetching provinces:", error);
        return [];
    }
};

// Lấy danh sách quận theo provinceId
export const getDistricts = async (provinceId) => { // Changed function name from `getDistrict` to `getDistricts`
    try {
        const response = await fetch(`${API_URL}/districts?provinceId=${provinceId}`);
        if (response.ok) {
            const data = await response.json();
            return data.districts || [];
        } else {
            console.error("Failed to fetch district data");
            return [];
        }
    } catch (error) {
        console.error("Error fetching district:", error);
        return [];
    }
};

// Lấy danh sách phường theo districtId
export const getWards = async (districtId) => {
    try {
        const response = await fetch(`${API_URL}/wards?districtId=${districtId}`);
        if (response.ok) {
            const data = await response.json();
            return data.wards || [];
        } else {
            console.error("Failed to fetch ward data");
            return [];
        }
    } catch (error) {
        console.error("Error fetching ward:", error);
        return [];
    }
};
