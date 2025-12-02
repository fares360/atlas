"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// 1. تعريف شكل المنتج في السلة
export interface CartItem {
  id: string | number;
  title: string;
  price: number;
  type: "book" | "consultation"; // لتمييز الكتب عن الاستشارات
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

  // استرجاع السلة من الذاكرة عند فتح الموقع
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

  // حفظ السلة عند أي تغيير
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("atlas-cart", JSON.stringify(items));
    }
  }, [items, mounted]);

  // إضافة منتج (مع منع التكرار للكتب لأنها منتجات رقمية)
  const addItem = (newItem: CartItem) => {
    setItems((currentItems) => {
      const exists = currentItems.find((item) => item.id === newItem.id);
      if (exists) return currentItems; // لو موجود مسبقاً لا تضفه مرة أخرى
      return [...currentItems, newItem];
    });
  };

  const removeItem = (id: string | number) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const clearCart = () => setItems([]);

  // حساب الإجماليات
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
