import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./user-pages/Home";
import About from "./user-pages/About";
import Product from "./user-pages/Product";
import Contact from "./user-pages/Contact";
import Cart from "./user-pages/Cart";

import Login from "./admin-pages/Login";
import ProductList from "./admin-pages/ProductList";
import AddProduct from "./admin-pages/AddProduct";
import EditProduct from "./admin-pages/EditProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

function App() {
  return (
    <div className="px-4 py-4">
      <ToastContainer position="top-center" autoClose={2000} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Product />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/cart" element={<Cart />} /> */}

          <Route path="/login" element={<Login />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/editproduct/:id" element={<EditProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
