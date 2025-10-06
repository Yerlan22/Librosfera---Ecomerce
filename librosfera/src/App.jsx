import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import CartView from "./pages/Homepage/CartView";
import UserProfile from "./pages/Homepage/UserProfile";
import Book from "./pages/book/book";
import Books from "./pages/Books/Books";
import Layout from "./components/layout/layout";
import ContactUs from "./pages/ContactUs/ContactUs";
import Checkout from "./pages/checkout/checkout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<CartView />} />
        <Route path="/pages/book/:id" element={<Book />} />
        <Route path="/books/:categoriaId" element={<Books />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/pages/checkout/" element={<Checkout />} />
        <Route path="/UserPage" element={<UserProfile />} />
      </Routes>
    </Layout>
  );
}

export default App;
