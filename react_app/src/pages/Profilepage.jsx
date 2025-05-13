import { useState, useEffect } from "react";
import Header from "../componets/Header";
import Footer from "../componets/Footer";
import "../css/Profile.css";
import { getDistricts, getProvinces, getWards } from "../../services/locationservices";
import { updateUser } from "../../services/userservices"; // Import updateUser từ user_services

export default function ProfileEdit() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    provinceId: "",
    districtId: "",
    wardId: "",
    address: "",
    gender: "",
    provinces: [],  // State lưu danh sách các tỉnh
    districts: [],  // State lưu danh sách các quận
    wards: [],      // State lưu danh sách các phường
  });

  // Lấy dữ liệu người dùng từ sessionStorage khi trang tải
  useEffect(() => {
    const user = sessionStorage.getItem("user");

    if (!user || user === "undefined") {
      console.error("Không có dữ liệu người dùng trong sessionStorage");
      return;
    }

    let userData;
    try {
      userData = JSON.parse(user);
    } catch (error) {
      console.error("Lỗi khi phân tích dữ liệu người dùng từ sessionStorage:", error);
      return;
    }

    if (userData && userData.fullName) {
      console.log("Dữ liệu người dùng trong sessionStorage:", userData);

      const fetchLocationData = async () => {
        try {
          const provinces = await getProvinces();
          const districts = await getDistricts(userData.provinceId);
          const wards = await getWards(userData.districtId);

          setFormData({
            fullName: userData.fullName || "",
            phoneNumber: userData.phoneNumber || "",
            address: userData.address || "",
            gender: userData.gender === 0 ? "male" : userData.gender === 1 ? "female" : "other",
            provinceId: userData.provinceId || "",
            districtId: userData.districtId || "",
            wardId: userData.wardId || "",
            provinces: provinces || [],
            districts: districts || [],
            wards: wards || [],
          });
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu địa lý:", error);
        }
      };

      fetchLocationData();
    } else {
      console.error("Dữ liệu người dùng không đầy đủ hoặc thiếu thuộc tính fullName");
    }
  }, []);  // Chỉ chạy khi component mount

  // Hàm xử lý khi người dùng chọn tỉnh
  const handleProvinceChange = async (e) => {
    const provinceId = e.target.value;
    try {
      const districts = await getDistricts(provinceId);
      setFormData((prevState) => ({
        ...prevState,
        provinceId,
        districts,
        districtId: "",  // Reset district and ward
        wardId: "",
      }));
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu quận:", error);
    }
  };

  // Hàm xử lý khi người dùng chọn quận
  const handleDistrictChange = async (e) => {
    const districtId = e.target.value;
    try {
      const wards = await getWards(districtId);
      setFormData((prevState) => ({
        ...prevState,
        districtId,
        wards,
        wardId: "",  // Reset ward
      }));
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu phường:", error);
    }
  };

  // Hàm xử lý khi người dùng bấm Save Changes
  const handleUpdate = async () => {
    const { fullName, phoneNumber, gender, provinceId, districtId, wardId, address } = formData;

    let genderValue = 0; // Default to male
    if (gender === "female") genderValue = 1;
    else if (gender === "other") genderValue = 2;

    const userId = JSON.parse(sessionStorage.getItem("user"))?.id;

    try {
      const response = await updateUser(userId, fullName, phoneNumber, genderValue, provinceId, districtId, wardId, address);

      if (response.success) {
        alert("Cập nhật người dùng thành công!");

        const updatedUser = response.user;

        // Kiểm tra và lưu dữ liệu người dùng vào sessionStorage
        if (updatedUser) {
          sessionStorage.setItem("user", JSON.stringify(updatedUser));  // Lưu lại thông tin người dùng mới
          console.log("Dữ liệu đã được lưu vào sessionStorage: ", sessionStorage.getItem("user"));

          // Cập nhật lại formData với thông tin người dùng đã được cập nhật
          setFormData({
            fullName: updatedUser.fullName,
            phoneNumber: updatedUser.phoneNumber,
            gender: updatedUser.gender === 0 ? "male" : updatedUser.gender === 1 ? "female" : "other",
            provinceId: updatedUser.provinceId,
            districtId: updatedUser.districtId,
            wardId: updatedUser.wardId,
            address: updatedUser.address,
            provinces: formData.provinces, // Giữ nguyên danh sách tỉnh
            districts: formData.districts, // Giữ nguyên danh sách quận
            wards: formData.wards, // Giữ nguyên danh sách phường
          });
        }
      } else {
        alert("Lỗi khi cập nhật người dùng: " + response.message);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật người dùng:", error);
      alert("Có lỗi khi cập nhật người dùng. Vui lòng thử lại.");
    }
  };

  return (
    <div>
      <Header />
      <div className="profile-container">
        <div className="profile-card">
          <h2 className="profile-title">Thông tin cá nhân</h2>
          <div className="profile-row">
            <input
              className="profile-input"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Họ và tên"
            />
            <input
              className="profile-input"
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              placeholder="Số điện thoại"
            />
          </div>
          <div className="profile-row">
            <select
              className="profile-select gender-select"
              name="gender"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            >
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>
          <div className="profile-row">
            <select
              className="profile-select"
              name="province"
              value={formData.provinceId}
              onChange={handleProvinceChange}
            >
              <option value="">Chọn Tỉnh</option>
              {formData.provinces.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              ))}
            </select>
            <select
              className="profile-select"
              name="district"
              value={formData.districtId}
              onChange={handleDistrictChange}
            >
              <option value="">Chọn Quận</option>
              {formData.districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>
          <div className="profile-row">
            <select
              className="profile-select"
              name="ward"
              value={formData.wardId}
              onChange={(e) => setFormData({ ...formData, wardId: e.target.value })}
            >
              <option value="">Chọn Phường</option>
              {formData.wards.map((ward) => (
                <option key={ward.id} value={ward.id}>
                  {ward.name}
                </option>
              ))}
            </select>
            <input
              className="profile-input"
              type="text"
              name="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Địa chỉ"
            />
          </div>
          <div className="profile-buttons">
            <button className="cancel-button">Hủy</button>
            <button className="save-button" onClick={handleUpdate}>Lưu Thay Đổi</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
