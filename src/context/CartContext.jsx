import React, { createContext, useReducer, useContext } from "react";

const CartContext = createContext(null);
const CartDispatchContext = createContext(null);

const cartsReducer = (carts, action) => {
  // console.log({ action });

  switch (action.type) {
    case "added": {
      // jumlah item yang sama antara di keranjang dan yang mau ditambahkan
      const indexItem = carts.findIndex(
        (item) => item.id === action.payload.id
      );

      // console.log({ indexItem });

      // Cek kondisi jika di kerangjang belum ada item yang sama
      if (indexItem === -1) {
        return [...carts, { ...action.payload, quantity: 1 }];
      }
      // jika ada item yang sama di keranjang dan yang mau ditambahkan ke keranjang, tambah quantity nya 1
      else {
        return carts.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    }
    case "decrease": {
      // jumlah item yang sama antara di keranjang dan yang mau ditambahkan
      const indexItem = carts.findIndex(
        (item) => item.id === action.payload.id
      );

      if (indexItem !== -1) {
        if (carts[indexItem].quantity === 1) {
          return carts.filter((item) => item.id !== action.payload.id);
        } else {
          return carts.map((item) => {
            if (item.id === action.payload.id) {
              return { ...item, quantity: item.quantity - 1 };
            } else {
              return item;
            }
          });
        }
      }
    }
    case "clear": {
      return [];
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

const initialState = [];

export const CartProvider = ({ children }) => {
  const [carts, dispatch] = useReducer(cartsReducer, initialState);

  return (
    <CartContext.Provider value={carts}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
};

export const useCarts = () => useContext(CartContext);
export const useCartsDispatch = () => useContext(CartDispatchContext);
