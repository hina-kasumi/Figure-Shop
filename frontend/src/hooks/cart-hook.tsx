"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { cartService } from "@/services/cart-service";
import { Cart } from "@/types/cart";

interface CartContextType {
  cart: Cart;
  loading: boolean;
  error: Error | null;
  reloadCart: () => void;
  addCartItem: (productId: string, quantity: number) => Promise<void>;
  removeCartItem: (productId: string) => Promise<void>;
  updateCartItemQuantity: (productId: string, quantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>({
    items: [],
    totalItems: 0,
    totalPrice: 0,
    totalDiscount: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [reloadFlag, setReloadFlag] = useState<number>(0);

  const reloadCart = () => setReloadFlag((prev) => prev + 1);

  // 🔁 Tải dữ liệu giỏ hàng
  useEffect(() => {
    setLoading(true);
    setError(null);
    cartService
      .getCart()
      .then((data) => setCart(data))
      .catch((err) => {
        setError(err instanceof Error ? err : new Error("Failed to load cart"));
      })
      .finally(() => setLoading(false));
  }, [reloadFlag]);

  // 🧩 Các hàm thao tác
  async function addCartItem(productId: string, quantity: number) {
    try {
      await cartService.addItemToCart(productId, quantity);
      reloadCart();
    } catch (err) {
      setError(err as Error);
    }
  }

  async function removeCartItem(productId: string) {
    setLoading(true);
    try {
      await cartService.removeItemFromCart(productId);
      reloadCart();
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  async function updateCartItemQuantity(productId: string, quantity: number) {
    setLoading(true);
    try {
      await cartService.updateItemQuantity(productId, quantity);
      reloadCart();
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        reloadCart,
        addCartItem,
        removeCartItem,
        updateCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook truy cập context
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
