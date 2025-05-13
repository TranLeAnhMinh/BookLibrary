import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getOrderDetails } from "../../services/cartservices"; // nhớ import service
import "../css/Checkout.css";
import ToTopButton from "../componets/ToTopButton";

const Checkout = () => {
  const [formData, setFormData] = useState({
    borrowerName: "",
    province: "",
    district: "",
    ward: "",
    addressDetail: "",
    phone: "",
    email: "",
    saveInfo: false,
  });

  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const orderId = params.get("orderId");
    if (orderId) {
      loadBorrowedBooks(orderId);
    }
  }, [location]);

  const loadBorrowedBooks = async (orderId) => {
    const response = await getOrderDetails(orderId);
    if (response.success) {
      const formatted = response.books.map(book => ({
        id: book.book_id,
        image: book.image_url,
        title: book.title,
        quantity: book.quantity,
        dueDate: new Date(book.return_date_due).toISOString().split("T")[0],
      }));
      setBorrowedBooks(formatted);
    } else {
      alert(response.message || "Lỗi khi tải danh sách sách mượn.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Checkout Info:", formData);
    alert("✅ Xác nhận mượn sách thành công!");
  };

  return (
    <div className="checkout-container">
      <nav className="breadcrumb">
        Trang chủ &gt; Giỏ hàng &gt; Checkout
      </nav>

      <h2 className="checkout-title">Thông tin người mượn</h2>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="borrowerName"
          placeholder="Tên người mượn"
          required
          value={formData.borrowerName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="province"
          placeholder="Tỉnh/Thành phố"
          required
          value={formData.province}
          onChange={handleChange}
        />
        <input
          type="text"
          name="district"
          placeholder="Quận/Huyện"
          required
          value={formData.district}
          onChange={handleChange}
        />
        <input
          type="text"
          name="ward"
          placeholder="Xã/Phường"
          required
          value={formData.ward}
          onChange={handleChange}
        />
        <input
          type="text"
          name="addressDetail"
          placeholder="Chi tiết toà nhà (optional)"
          value={formData.addressDetail}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Số điện thoại"
          required
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <label className="checkbox-container">
          <input
            type="checkbox"
            name="saveInfo"
            checked={formData.saveInfo}
            onChange={handleChange}
          />
          Lưu thông tin cho lần sau
        </label>

        <button type="submit" className="confirm-button">
          Xác nhận mượn sách
        </button>
      </form>

      <h2 className="checkout-title">Danh sách sách mượn</h2>

      <div className="book-list">
        {borrowedBooks.length > 0 ? (
          borrowedBooks.map(book => (
            <div key={book.id} className="book-item">
              <img src={book.image} alt={book.title} />
              <div className="book-info">
                <h4>{book.title}</h4>
                <p>Số lượng: {book.quantity}</p>
                <p>Ngày hẹn trả: {book.dueDate}</p>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>Không có sách nào trong đơn mượn.</p>
        )}
      </div>

      <ToTopButton />
    </div>
  );
};

export default Checkout;
