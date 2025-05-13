import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/BookDetailPage.css";
import Header from "../componets/Header";
import Footer from "../componets/Footer";
import ToTopButton from "../componets/ToTopButton";
import { getCartByUserId, addToCart } from "../../services/cartservices";
import { addToWishlist } from "../../services/wishlistservices";
import { getReviewsByBookId, submitReview } from "../../services/reviewservices";
import defaultAvatar from "../assets/images/istockphoto-1300845620-612x612.jpg";

const BookDetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]); // State to hold reviews
  const [newComment, setNewComment] = useState(""); // State to hold the new comment
  const [newStar, setNewStar] = useState(5); // State to hold the new rating

  useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch(`http://localhost:5000/api/books/${id}`);
      const data = await response.json();
      if (data.success) setBook(data.book);
    };

    const fetchReviews = async () => {
      const result = await getReviewsByBookId(id);
      if (result.success) setReviews(result.reviews);
    };

    fetchBook();
    fetchReviews();
  }, [id]);

  const handleAddToCart = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      alert("⚠️ Bạn cần đăng nhập để thêm sách vào giỏ hàng.");
      return;
    }

    const result = await addToCart(user.id, book.id);
    if (result.success) {
      alert("✅ Đã thêm vào giỏ hàng!");
    } else {
      alert(`❌ Thêm thất bại: ${result.message}`);
    }
  };

  const handleAddToFavorites = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      alert("⚠️ Bạn cần đăng nhập để thêm sách vào danh sách yêu thích.");
      return;
    }

    const response = await addToWishlist(user.id, book.id);
    if (response.success) {
      alert("✅ Đã thêm vào danh sách yêu thích!");
    } else {
      alert(`❌ Lỗi: ${response.message}`);
    }
  };

  const handleSubmitReview = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      alert("⚠️ Bạn cần đăng nhập để thêm đánh giá.");
      return;
    }

    const result = await submitReview(book.id, user.id, newStar, newComment);
    if (result.success) {
      alert("✅ Đã thêm đánh giá!");
      setNewComment(""); // Clear comment input after submission
      setNewStar(5); // Reset star rating to default
      const updatedReviews = await getReviewsByBookId(id);
      setReviews(updatedReviews.reviews); // Update the reviews list
    } else {
      alert(`❌ Lỗi: ${result.message}`);
    }
  };

  if (!book) return <div className="loading">Đang tải dữ liệu...</div>;

  return (
    <>
      <Header />
      <main className="book-detail-wrapper">
        <div className="book-detail-container">
          <div className="book-image">
            <img src={book.image_url} alt={book.title} />
          </div>

          <div className="book-info">
            <h2>{book.title}</h2>
            <p className="author">Tác giả: <strong>{book.authors}</strong></p>
            <p><strong>Mô tả ngắn:</strong> {book.short_description}</p>
            <p><strong>Nội dung:</strong> {book.description}</p>
            <p><strong>Số trang:</strong> {book.page}</p>
            <p><strong>Năm xuất bản:</strong> {book.published_year}</p>
            <p><strong>Số lượng còn:</strong> {book.quantity}</p>

            <div className="buttons">
              <button className="cart-btn" onClick={handleAddToCart}>🛒 Thêm vào giỏ hàng</button>
              <button className="fav-btn" onClick={handleAddToFavorites}>❤️ Yêu thích</button>
            </div>
          </div>
        </div>

        {/* Bình luận và đánh giá sao */}
        <section className="reviews-section">
          <h3>Bình luận và đánh giá</h3>

          {/* Reviews List with Scroll */}
          <div className="reviews-list">
            <div className="reviews-container">
              {reviews.map((review, index) => (
                <div key={index} className="review-item">
                  <div className="review-header">
                    {/* Hiển thị avatar và tên người dùng */}
                    <img
                      className="user-avatar"
                      src={review.user_avatar || defaultAvatar}
                      alt={review.user_full_name}
                    />
                    <p><strong>{review.user_full_name}</strong></p>
                    <span className="star-rating-display">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span key={i} className={`star ${review.star > i ? "selected" : ""}`}>
                          &#9733; {/* Biểu tượng sao */}
                        </span>
                      ))}
                    </span>
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form thêm đánh giá */}
          <div className="add-review">
            <h4>Thêm đánh giá của bạn</h4>
            
            {/* Đánh giá sao */}
            <div className="star-rating">
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${newStar >= star ? "selected" : ""}`}
                    onClick={() => setNewStar(star)}
                  >
                    &#9733; {/* Biểu tượng sao */}
                  </span>
                ))}
              </div>
            </div>

            {/* Phần viết bình luận */}
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Viết bình luận của bạn..."
            />
            <button onClick={handleSubmitReview} className="submit-review-btn">Gửi đánh giá</button>
          </div>
        </section>
      </main>
      <Footer />
      <ToTopButton />
    </>
  );
};

export default BookDetailPage;