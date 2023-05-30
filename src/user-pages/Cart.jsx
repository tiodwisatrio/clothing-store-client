import React, { useState } from "react";

const Cart = () => {
  const [items, setItems] = useState([]);

  // Function to add an item to the cart
  const addToCart = (item) => {
    setItems([...items, item]);
  };

  // Function to remove an item from the cart
  const removeFromCart = (item) => {
    const updatedItems = items.filter((i) => i.id !== item.id);
    setItems(updatedItems);
  };

  // Render the cart items
  const renderCartItems = () => {
    if (items.length === 0) {
      return <p>Your cart is empty.</p>;
    }

    return (
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} -{" "}
            <button onClick={() => removeFromCart(item)}>Remove</button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h2>Cart</h2>
      {renderCartItems()}
      <button onClick={() => addToCart({ id: 1, name: "Item 1" })}>
        Add Item 1
      </button>
      <button onClick={() => addToCart({ id: 2, name: "Item 2" })}>
        Add Item 2
      </button>
    </div>
  );
};

export default Cart;
