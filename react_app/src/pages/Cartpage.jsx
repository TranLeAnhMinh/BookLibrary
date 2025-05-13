import { useState, useEffect } from "react";
import Header from "../componets/Header";
import Footer from "../componets/Footer";
import "../css/Cart.css";
import { getCartByUserId, deleteFromCart, createOrderFromCart, updateOrderDetails } from "../../services/cartservices";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCartChanged, setIsCartChanged] = useState(true); // Ban đầu cho phép update
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      loadCart(user.id);
    }
  }, []);

  const loadCart = async (userId) => {
    const response = await getCartByUserId(userId);
    if (response.success) {
      const formattedCart = response.cart.map(item => ({
        id: item.book_id,
        title: item.title,
        thumbnail: item.image_url,
        quantity: item.quantity,
        dueDate: new Date(item.return_date_due).toISOString().split("T")[0],
      }));
      setCart(formattedCart);
      setIsCartChanged(true); // Mới load cho phép update
    } else {
      alert(response.message);
    }
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0 && newQuantity <= 5) {
      setCart(cart.map(book => book.id === id ? { ...book, quantity: newQuantity } : book));
      setIsCartChanged(true); // Thay đổi thì cho phép update
    }
  };

  const handleRemoveFromCart = async (bookId) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      alert("Vui lòng đăng nhập");
      return;
    }

    const response = await deleteFromCart(user.id, bookId);
    if (response.success) {
      setCart(cart.filter(book => book.id !== bookId));
      setIsCartChanged(true); // Xóa sách cho phép update
      alert("✅ Đã xóa khỏi giỏ hàng!");
    } else {
      alert(`❌ ${response.message}`);
    }
  };

  const handleUpdateCart = async () => {
    if (cart.length === 0) {
      alert("Giỏ hàng của bạn đang trống!");
      return;
    }

    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      alert("Vui lòng đăng nhập để cập nhật giỏ hàng!");
      return;
    }

    setIsUpdating(true);

    const orderId = sessionStorage.getItem("currentOrderId");
    let response;

    if (!orderId) {
      // Lần đầu tiên: Tạo đơn mới
      response = await createOrderFromCart(user.id, cart);

      if (response.success && response.orderId) {
        sessionStorage.setItem("currentOrderId", response.orderId); // Lưu orderId
      }
    } else {
      // Các lần sau: Update đơn cũ
      response = await updateOrderDetails(orderId, cart);
    }

    setIsUpdating(false);

    if (response.success) {
      alert("✅ Đã cập nhật đơn mượn thành công!");
      setIsCartChanged(false); // Sau update disable nút
    } else {
      alert(`❌ ${response.message}`);
    }
  };

  const handleRequestLoan = () => {
    if (cart.length === 0) {
      alert("Giỏ hàng của bạn đang trống!");
      return;
    }
    navigate("/checkout?orderId=" + sessionStorage.getItem("currentOrderId"));
  };

  return (
    <div>
      <Header />
      <div className="cart-container">
        <h2 className="cart-title">Your Borrowing Cart</h2>
        <div className="cart-list">
          {cart.length > 0 ? cart.map(book => (
            <div key={book.id} className="cart-item">
              <button className="remove-btn" onClick={() => handleRemoveFromCart(book.id)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <img src={book.thumbnail} alt={book.title} className="cart-thumbnail" />
              <div className="cart-info">
                <h3 className="cart-book-title">{book.title}</h3>
                <div className="cart-controls">
                  <label>Quantity:</label>
                  <input
                    className="quantity-input"
                    type="number"
                    min="1"
                    max="5"
                    value={book.quantity}
                    onChange={(e) => handleQuantityChange(book.id, parseInt(e.target.value))}
                  />
                </div>
                <div className="cart-controls">
                  <label>Due Date:</label>
                  <input className="date-input" type="date" value={book.dueDate} readOnly />
                </div>
              </div>
            </div>
          )) : <p style={{ textAlign: "center" }}>Bạn chưa có sách nào trong giỏ hàng.</p>}
        </div>

        {/* Nút cập nhật và yêu cầu mượn */}
        <div className="cart-buttons" style={{ justifyContent: "center" }}>
          <button
            className="cart-button update"
            onClick={handleUpdateCart}
            disabled={isUpdating || !isCartChanged}
            style={{
              backgroundColor: (isUpdating || !isCartChanged) ? "#ccc" : "#4CAF50",
              cursor: (isUpdating || !isCartChanged) ? "not-allowed" : "pointer"
            }}
          >
            {isUpdating ? "Đang cập nhật..." : "Update Cart"}
          </button>
          <button className="cart-button request" onClick={handleRequestLoan}>
            Request Loan
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
