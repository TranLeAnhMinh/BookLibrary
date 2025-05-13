import React from "react";
import Homepage from "./pages/Homepage";
import SignIn from "./pages/Signinpage";
import ForgetPassword from "./pages/ForgetPassword";
import Wishlist from "./pages/Wishlistpage";
import ProfileEdit from "./pages/Profilepage";
import Cart from "./pages/Cartpage";
import AdminHomePage from "./pages/AdminHomePage";
import BookDetail from "./pages/BookDetailPage";
import Checkout from "./pages/Checkout";
import EmployeePage from "./pages/EmployeePage";
import UserPage from "./pages/UserPage";
import Categories from "./pages/CategoryPage";
import Author from "./pages/AuthorPage";
import Publisher from "./pages/PublisherPage";
import BookAdminPage from "./pages/BookAdminPage";
import BorrowOrdersPage from "./pages/BorrowOrdersPage";
import ReviewPage from "./pages/ReviewPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
    return (
       <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/profile" element={<ProfileEdit />} />
                <Route path ="/cart" element={<Cart />}/>
                <Route path ="/admin" element={<AdminHomePage />} />
                <Route path="/books/:id" element={<BookDetail />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/admin/employees" element={<EmployeePage />} />
                <Route path="/admin/users" element={<UserPage />} />
                <Route path="/admin/categories" element={<Categories />} />
                <Route path ="admin/authors" element={<Author />} />
                <Route path ="admin/publishers" element={<Publisher />} />
                <Route path ="admin/books" element={<BookAdminPage />} />
                <Route path ="admin/borrow-orders" element={<BorrowOrdersPage />} />
                <Route path ="admin/reviews" element={<ReviewPage />} />
            </Routes>
       </Router>
    );
};

export default App;