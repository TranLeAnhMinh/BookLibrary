import React, { useState, useEffect } from "react";
import { getAllBooks, searchBooks,createBook,updateBook,deleteBook } from "../../services/bookservices"; // Import các API functions
import Sidebar from "../componets/Sidebar";
import AdminHeader from "../componets/AdminHeader";
import ToTopButton from "../componets/ToTopButton";
import BookModal from "../componets/BookModal";
import BookDetailModal from "../componets/BookDetailModal";

const BookPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [books, setBooks] = useState([]);
  const [searchParams, setSearchParams] = useState({
    title: "",
    author: "",
    publisher: "",
    category: ""
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  // Lấy tất cả sách khi component mount
  useEffect(() => {
    const fetchBooks = async () => {
      const result = await getAllBooks();
      if (result.success) {
        setBooks(result.books);
      } else {
        alert(result.message);
      }
    };
    fetchBooks();
  }, []);

  // Tìm kiếm sách
  const handleSearch = async () => {
    const result = await searchBooks(searchParams.title);
    if (result.success) {
      setBooks(result.books);
    } else {
      alert(result.message);
    }
  };

  // Mở modal thêm sách
  const handleAdd = () => {
    setSelectedBook(null);
    setModalOpen(true);
  };

  // Mở modal chỉnh sửa sách
  const handleEdit = (book) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  // Xem chi tiết sách
  const handleViewDetail = (book) => {
    setSelectedBook(book);
    setDetailModalOpen(true);
  };

  // Xóa sách
  const handleDelete = async (book) => {
    const confirmDelete = window.confirm(`Bạn chắc chắn muốn xoá sách "${book.title}"?`);
    if (confirmDelete) {
      const result = await deleteBook(book.id);
      if (result.success) {
        // Xóa thành công, cập nhật lại danh sách sách
        setBooks(books.filter((b) => b.id !== book.id));
        alert("Book deleted successfully");
      } else {
        alert(result.message);
      }
    }
  };

  // Thêm hoặc chỉnh sửa sách
  const handleSubmitBook = async (bookData) => {
    if (selectedBook) {
      const result = await updateBook(selectedBook.id, bookData);
      if (result.success) {
        // Cập nhật sách thành công
        setModalOpen(false);
        alert("Book updated successfully");
        setBooks(books.map((b) => (b.id === selectedBook.id ? { ...b, ...bookData } : b))); // Update book in state
      } else {
        alert(result.message);
      }
    } else {
      const result = await createBook(bookData);
      if (result.success) {
        // Thêm sách thành công
        setModalOpen(false);
        alert("Book added successfully");
        setBooks([...books, { ...bookData, id: Date.now() }]); // Add new book to state
      } else {
        alert(result.message);
      }
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <AdminHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} />

      <main
        style={{
          marginLeft: sidebarOpen ? "250px" : "0",
          marginTop: "60px",
          padding: "20px",
          transition: "margin-left 0.3s ease",
          width: "100%",
          overflow: "auto",
        }}
      >
        <section>
          <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "20px" }}>
            Trang quản lý Sách
          </h2>

          {/* Tìm kiếm */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Tìm theo tên sách"
              value={searchParams.title}
              onChange={(e) => setSearchParams({ ...searchParams, title: e.target.value })}
              style={{ padding: "10px", width: "250px" }}
            />
            <button style={{ padding: "8px 16px", backgroundColor: "#2c3e50", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }} onClick={handleSearch}>
              Tìm kiếm
            </button>
            <button style={{ padding: "8px 16px", backgroundColor: "#2c3e50", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }} onClick={handleAdd}>
              Thêm sách
            </button>
          </div>

          {/* Bảng danh sách sách */}
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
            <thead>
              <tr>
                <th style={{ padding: "12px 15px", textAlign: "left", backgroundColor: "#f8f9fa", fontWeight: "600" }}>STT</th>
                <th style={{ padding: "12px 15px", textAlign: "left", backgroundColor: "#f8f9fa", fontWeight: "600" }}>Ảnh</th>
                <th style={{ padding: "12px 15px", textAlign: "left", backgroundColor: "#f8f9fa", fontWeight: "600" }}>Tên sách</th>
                <th style={{ padding: "12px 15px", textAlign: "left", backgroundColor: "#f8f9fa", fontWeight: "600" }}>Số lượng</th>
                <th style={{ padding: "12px 15px", textAlign: "left", backgroundColor: "#f8f9fa", fontWeight: "600" }}>Tác giả</th>
                <th style={{ padding: "12px 15px", textAlign: "left", backgroundColor: "#f8f9fa", fontWeight: "600" }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {books.length > 0 ? (
                books.map((book, idx) => (
                  <tr key={book.id}>
                    <td style={{ padding: "12px 15px", borderBottom: "1px solid #ddd" }}>{idx + 1}</td>
                    <td style={{ padding: "12px 15px", borderBottom: "1px solid #ddd" }}><img src={book.image_url} alt="thumbnail" style={{ width: "50px" }} /></td>
                    <td style={{ padding: "12px 15px", borderBottom: "1px solid #ddd" }}>{book.title}</td>
                    <td style={{ padding: "12px 15px", borderBottom: "1px solid #ddd" }}>{book.quantity}</td>
                    <td style={{ padding: "12px 15px", borderBottom: "1px solid #ddd" }}>{book.authors}</td>
                    <td style={{ padding: "12px 15px", borderBottom: "1px solid #ddd" }}>
                      <button style={{ padding: "8px 16px", backgroundColor: "#2c3e50", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }} onClick={() => handleEdit(book)}>Sửa</button>
                      <button style={{ padding: "8px 16px", backgroundColor: "#e74c3c", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }} onClick={() => handleDelete(book)}>Xóa</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ padding: "12px 15px", textAlign: "center" }}>Không có dữ liệu</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>

      <ToTopButton />

      <BookModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        book={selectedBook}
        onSubmit={handleSubmitBook}
      />

      <BookDetailModal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        book={selectedBook}
      />
    </div>
  );
};

export default BookPage;
