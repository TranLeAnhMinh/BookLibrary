const BOOK_API_URL = "http://localhost:5000/api/books";

export const getAllBooks = async () => {
    try {
        const response = await fetch(BOOK_API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (response.ok) {
            return {
                success: true,
                books: data.books,
            };
        } else {
            return {
                success: false,
                message: data.message || "Fail to fetch books",
            };
        }
    } catch (error) {
        return {
            success: false,
            message: "Fail to connect to server",
        };
    }
};

export const searchBooks = async (keyword) => {
    try {
        const response = await fetch(`${BOOK_API_URL}/search?q=${encodeURIComponent(keyword)}`);
        const data = await response.json();

        if (response.ok) {
            return {
                success: true,
                books: data.results, // API trả về key là `results`
            };
        } else {
            return {
                success: false,
                message: data.message || "Search failed",
            };
        }
    } catch (error) {
        return {
            success: false,
            message: "Failed to connect to server",
        };
    }
};


// Thêm sách
export const createBook = async (bookData) => {
    try {
        const response = await fetch(BOOK_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookData),
        });

        const data = await response.json();

        if (response.ok) {
            return {
                success: true,
                message: data.message,
            };
        } else {
            return {
                success: false,
                message: data.message || "Failed to create book",
            };
        }
    } catch (error) {
        return {
            success: false,
            message: "Failed to connect to server",
        };
    }
};

// Cập nhật sách
export const updateBook = async (bookId, bookData) => {
    try {
        const response = await fetch(`${BOOK_API_URL}/${bookId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookData),
        });

        const data = await response.json();

        if (response.ok) {
            return {
                success: true,
                message: data.message,
            };
        } else {
            return {
                success: false,
                message: data.message || "Failed to update book",
            };
        }
    } catch (error) {
        return {
            success: false,
            message: "Failed to connect to server",
        };
    }
};

// Xóa sách
export const deleteBook = async (bookId) => {
    try {
        const response = await fetch(`${BOOK_API_URL}/${bookId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (response.ok) {
            return {
                success: true,
                message: data.message,
            };
        } else {
            return {
                success: false,
                message: data.message || "Failed to delete book",
            };
        }
    } catch (error) {
        return {
            success: false,
            message: "Failed to connect to server",
        };
    }
};