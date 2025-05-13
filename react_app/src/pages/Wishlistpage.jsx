import React, { useState, useEffect } from "react";
import Header from "../componets/Header";
import Footer from "../componets/Footer";
import ToTopButton from "../componets/ToTopButton";
import "../css/Wishlist.css";
import { getWishlistByUserId } from "../../services/wishlistservices"; 
import { addToCart as addToCartService } from "../../services/cartservices";
import { deleteFromWishlist } from "../../services/wishlistservices";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';




const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [recommended, setRecommended] = useState([]); // giữ nguyên

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (user) {
            loadWishlist(user.id);
        }
    }, []);

    const loadWishlist = async (userId) => {
        const response = await getWishlistByUserId(userId);
        if (response.success) {
            const formatted = response.wishlist.map(item => ({
                id: item.book_id,
                name: item.title,
                image: item.image_url
            }));
            setWishlist(formatted);
        } else {
            alert(response.message);
        }
    };

    const removeFromWishlist = async (bookId) => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (!user) {
            alert("Vui lòng đăng nhập");
            return;
        }
    
        const response = await deleteFromWishlist(user.id, bookId);
        if (response.success) {
            setWishlist(wishlist.filter(book => book.id !== bookId));
            alert("Đã xóa khỏi wishlist");
        } else {
            alert(response.message);
        }
    };

    const addToCart = async (bookId) => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (!user) {
            alert("Vui lòng đăng nhập để thêm vào giỏ hàng");
            return;
        }
    
        const response = await addToCartService(user.id, bookId);
        if (response.success) {
            alert("Đã thêm vào giỏ hàng!");
        } else {
            alert(response.message);
        }
    };
    

    return (
        <div>
            <Header />
            <main className="wishlist-container">
                <h2 className="wishlist-subtitle">Danh sách các sách yêu thích</h2>
                <div className="wishlist-list">
                    {wishlist.length > 0 ? wishlist.map(book => (
                        <div key={book.id} className="wishlist-item">
                            <img src={book.image} alt={book.name} className="wishlist-image" />
                            <p className="wishlist-name">{book.name}</p>
                            <button className="wishlist-remove-btn" onClick={() => removeFromWishlist(book.id)}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                            <button className="wishlist-button add" onClick={() => addToCart(book.id)}>Thêm vào giỏ</button>
                        </div>
                    )) : <p className="wishlist-empty">Không có sách yêu thích nào.</p>}
                </div>

                <h2 className="wishlist-subtitle">Danh sách "Dành cho bạn"</h2>
                <div className="wishlist-recommendations">
                    {recommended.map(book => (
                        <div key={book.id} className="wishlist-item">
                            <img src={book.image} alt={book.name} className="wishlist-image" />
                            <p className="wishlist-name">{book.name}</p>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
            <ToTopButton />
        </div>
    );
};

export default Wishlist;
