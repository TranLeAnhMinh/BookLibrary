import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/ForgetPassword.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Vui lòng nhập email của bạn!");
      return;
    }

    // Giả lập gửi yêu cầu reset password
    setTimeout(() => {
      setMessage(`🔗 Link đặt lại mật khẩu đã được gửi tới: ${email}`);
    }, 1000);
  };

  return (
    <div className="forget-password-container">
      <div className="forget-password-box">
        <h2>Quên Mật Khẩu</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <label>Email của bạn:</label>
          <input
            type="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="reset-btn">Gửi link đặt lại mật khẩu</button>
        </form>
        <button className="back-btn" onClick={() => navigate("/signin")}>
          Quay lại trang đăng nhập
        </button>
      </div>
    </div>
  );
};

export default ForgetPassword;
