import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa"; 
import "../css/Signin.css"; 
import { login } from "../../services/authservices";
import User from "../../models/user";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      if (storedUser.role === 0) {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(email, password);
    if (response.success) {
      const loggedInUser = new User(
        response.user.id,
        response.user.email,
        response.user.password,
        response.user.fullName,
        response.user.phoneNumber,
        response.user.gender,
        response.user.birthDate,
        response.user.provinceId,
        response.user.districtId,
        response.user.wardId,
        response.user.address,
        response.user.googleId,
        response.user.role,
        response.user.status,
        response.user.createdAt,
        response.user.updatedAt,
        response.user.deletedAt
      );

      sessionStorage.setItem("user", JSON.stringify(loggedInUser));

      // Dùng window.open để thay thế history
      if (loggedInUser.role === 0) {
        window.open("/admin", "_self"); // Admin
      } else {
        window.open("/", "_self"); // Người dùng thường
      }
    } else {
      alert(response.message);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <div className="logo">
          <i className="cart-icon">🛒</i>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser className="icon" />
            <input
              type="email"
              placeholder="EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">
            LOGIN
          </button>
        </form>
        <a href="/forget-password" className="forgot-password">
          Forget password?
        </a>
      </div>
    </div>
  );
};

export default SignIn;
