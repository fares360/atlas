"use client";

import { createContext, useContext, useState } from "react";

// Context للسلة (فارغ مؤقتاً)
const CartContext = createContext({ items: [], addItem: (item: any) => {} });

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState([]);

  const addItem = (item: any) => {
    // Logic later
    console.log("Added to cart", item);
  };

  return (
    <CartContext.Provider value={{ items, addItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
