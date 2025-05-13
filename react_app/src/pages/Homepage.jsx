import React, { useEffect, useState } from "react";
import Header from "../componets/Header";
import Footer from "../componets/Footer";
import ToTopButton from "../componets/ToTopButton";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllBooks, searchBooks } from "../../services/bookservices";

const Homepage = () => {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 12;

    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("q");

    useEffect(() => {
        const fetchBooks = async () => {
            let res;
            if (searchQuery) {
                res = await searchBooks(searchQuery); // gọi API tìm kiếm
            } else {
                res = await getAllBooks(); // gọi API lấy tất cả
            }

            if (res.success) {
                setBooks(res.books);
                setCurrentPage(1); // reset về page đầu
            }
        };
        fetchBooks();
    }, [searchQuery]);

    // Tính chỉ số phân trang
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
    const totalPages = Math.ceil(books.length / booksPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <Header />
            <main style={{ padding: "20px" }}>
                {!searchQuery && (
                <section>
                    <h2 style={{ marginBottom: "24px" }}>Top các sách được mượn nhiều nhất</h2>
                </section>
                )}

                <section>
                    <h2 style={{ marginBottom: "16px" }}>Danh mục sách</h2>
                    <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "24px",
                        justifyContent: "flex-start",
                    }}>
                        {currentBooks.map((book) => (
                            <div
                                key={book.id}
                                onClick={() => navigate(`/books/${book.id}`)}
                                style={{
                                    border: "1px solid #e0e0e0",
                                    borderRadius: "12px",
                                    padding: "12px",
                                    width: "180px",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                    transition: "transform 0.2s",
                                    backgroundColor: "#fff",
                                    cursor: "pointer"
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                            >
                                <div style={{
                                    width: "100%",
                                    height: "260px",
                                    overflow: "hidden",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "8px",
                                    marginBottom: "10px",
                                    backgroundColor: "#f8f8f8"
                                }}>
                                    <img
                                        src={book.image_url}
                                        alt={book.title}
                                        style={{
                                            maxWidth: "100%",
                                            maxHeight: "100%",
                                            objectFit: "contain"
                                        }}
                                    />
                                </div>
                                <h3 style={{
                                    fontSize: "1rem",
                                    fontWeight: "600",
                                    margin: "0 0 6px",
                                    textAlign: "center"
                                }}>{book.title}</h3>
                                <p style={{ fontSize: "0.9rem", color: "#555", textAlign: "center" }}>
                                    <strong>Tác giả:</strong> {book.authors || "Chưa rõ"}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Nút phân trang */}
                    <div style={{ marginTop: "20px", textAlign: "center" }}>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => handlePageChange(i + 1)}
                                style={{
                                    margin: "0 5px",
                                    padding: "6px 12px",
                                    borderRadius: "6px",
                                    border: "1px solid #ccc",
                                    backgroundColor: currentPage === i + 1 ? "#007bff" : "#fff",
                                    color: currentPage === i + 1 ? "#fff" : "#000",
                                    cursor: "pointer"
                                }}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
            <ToTopButton />
        </div>
    );
};

export default Homepage;
