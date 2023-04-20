import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const getProducts = async () => {
    const response = await axios.get(`http://localhost:5000/products`);
    setProducts(response.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row w-full mt-4 h-72">
        <div className="product-input bg-red-500 w-3/4">
          <h2 className="text-xl font-bold mt-10">Cart</h2>
          <ul className="list-disc list-inside">
            {cart.map((product) => (
              <li key={product.id}>
                {/* {product.name} - ${product.price.toFixed(2)} */}
                {product.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="detail-checkout bg-teal-600 w-1/4">asda</div>
      </div>
    </>
  );
};

export default Cart;
