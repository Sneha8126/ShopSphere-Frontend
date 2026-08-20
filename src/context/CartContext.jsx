import { createContext, useContext, useState, useEffect, useMemo } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "shopsphere_cart";

const readStoredCart = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(readStoredCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product._id);
      if (existing) {
        const nextQty = Math.min(existing.quantity + quantity, product.stock);
        return prev.map((i) => (i.productId === product._id ? { ...i, quantity: nextQty } : i));
      }
      return [
        ...prev,
        {
          productId: product._id,
          title: product.title,
          image: product.images?.[0],
          price: product.price,
          originalPrice: product.originalPrice,
          stock: product.stock,
          quantity: Math.min(quantity, product.stock),
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId
          ? { ...i, quantity: Math.max(1, Math.min(quantity, i.stock)) }
          : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const { subtotal, totalDiscount, itemCount } = useMemo(() => {
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const originalTotal = items.reduce((sum, i) => sum + (i.originalPrice || i.price) * i.quantity, 0);
    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
    return { subtotal, totalDiscount: Math.max(0, originalTotal - subtotal), itemCount };
  }, [items]);

  const shippingCost = subtotal > 999 || subtotal === 0 ? 0 : 49;
  const total = subtotal + shippingCost;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        totalDiscount,
        shippingCost,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};
