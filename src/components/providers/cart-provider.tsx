"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback, // 1️⃣ استورد دي ضروري
} from "react";

export interface CartItem {
  id: string | number;
  title: string;
  price: number;
  type: "book" | "consultation";
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string | number) => void;
  clearCart: () => void;
  totalAmount: number;
  itemsCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("atlas-cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("atlas-cart", JSON.stringify(items));
    }
  }, [items, mounted]);

  // 2️⃣ نستخدم useCallback مع addItem
  const addItem = useCallback((newItem: CartItem) => {
    setItems((currentItems) => {
      const exists = currentItems.find((item) => item.id === newItem.id);
      if (exists) return currentItems;
      return [...currentItems, newItem];
    });
  }, []); // Array فاضي عشان الدالة متتغيرش أبداً

  // 3️⃣ نستخدم useCallback مع removeItem
  const removeItem = useCallback((id: string | number) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  }, []);

  // 4️⃣ أهم واحدة: نستخدم useCallback مع clearCart
  const clearCart = useCallback(() => {
    setItems([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("atlas-cart");
    }
  }, []);

  const totalAmount = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        totalAmount,
        itemsCount: items.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
