import React from "react";

const Footer = () =>{
    return (
        <footer>
            <div className="footer-section">
                <h4>Exclusive</h4>
                <input type="email" placeholder="Enter your email" />
                <button>Subcribe</button>
            </div>
            <div className="footer-section">
                <h4>Support</h4>
                <ul>
                    <li>Email</li>
                    <li>Tel</li>
                    <li>Address</li>
                </ul>
            </div>
            <div className="footer-section">
                <h4>Account</h4>
                <ul>
                    <li>My Account</li>
                    <li>Login / Register</li>
                    <li>Cart</li>
                </ul>
            </div>
            <div className="footer-section">
                <h4>Social</h4>
                <ul>
                    <li>Facebook</li>
                    <li>Twitter</li>
                    <li>Instagram</li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;