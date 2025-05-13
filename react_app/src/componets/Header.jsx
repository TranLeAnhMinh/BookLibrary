import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BookLBlogo from "../assets/images/BookLBlogo.png";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery) {
            navigate(`/?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <header>
            <div className="logo">
                <a href="/">
                    <img src={BookLBlogo} alt="Logo" />
                </a>
            </div>

            <nav>
                <ul style={{ display: "flex", gap: "20px", listStyle: "none" }}>
                    <li>
                        <a
                            href="/"
                            style={{
                                fontWeight: isActive("/") ? "bold" : "normal",
                                color: isActive("/") ? "#007bff" : "inherit"
                            }}
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <a
                            href="/about"
                            style={{
                                fontWeight: isActive("/about") ? "bold" : "normal",
                                color: isActive("/about") ? "#007bff" : "inherit"
                            }}
                        >
                            About Me
                        </a>
                    </li>
                    <li>
                        <a
                            href="/contact"
                            style={{
                                fontWeight: isActive("/contact") ? "bold" : "normal",
                                color: isActive("/contact") ? "#007bff" : "inherit"
                            }}
                        >
                            Contact Us
                        </a>
                    </li>
                    <li>
                        <a
                            href="/signin"
                            style={{
                                fontWeight: isActive("/signin") ? "bold" : "normal",
                                color: isActive("/signin") ? "#007bff" : "inherit"
                            }}
                        >
                            Sign In
                        </a>
                    </li>
                </ul>
            </nav>

            <div className="search-bar">
                <form onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Tìm kiếm sách"
                    />
                    <button type="submit">🔍</button>
                </form>
            </div>

            <div className="icons" style={{ display: "flex", gap: "16px" }}>
                <a
                    href="/wishlist"
                    style={{
                        fontWeight: isActive("/wishlist") ? "bold" : "normal",
                        color: isActive("/wishlist") ? "#007bff" : "inherit"
                    }}
                >
                    Wishlist
                </a>
                <a
                    href="/cart"
                    style={{
                        fontWeight: isActive("/cart") ? "bold" : "normal",
                        color: isActive("/cart") ? "#007bff" : "inherit"
                    }}
                >
                    Giỏ Hàng
                </a>
                <a
                    href="/profile"
                    style={{
                        fontWeight: isActive("/profile") ? "bold" : "normal",
                        color: isActive("/profile") ? "#007bff" : "inherit"
                    }}
                >
                    Profile
                </a>
            </div>
        </header>
    );
};

export default Header;
