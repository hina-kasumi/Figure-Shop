"use client";

import { CartItem } from "@/types/figure";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

interface CartProps {
  className?: string;
}

export default function Cart({ className }: CartProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      figureId: "1",
      name: "Mô hình Naruto Uzumaki",
      image:
        "https://product.hstatic.net/200000462939/product/gsc20878_3_7028f60006c8487b88e8885ed61fdc25_grande.jpg",
      price: 350000,
      quantity: 1,
      maxQuantity: 10,
    },
    {
      figureId: "2",
      name: "Mô hình Luffy Gear 5",
      image:
        "https://product.hstatic.net/200000462939/product/gsc20878_3_7028f60006c8487b88e8885ed61fdc25_grande.jpg",
      price: 420000,
      quantity: 2,
      maxQuantity: 5,
    },
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.figureId === id
          ? {
              ...item,
              quantity: Math.min(Math.max(newQuantity, 1), item.maxQuantity),
            }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.figureId !== id));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`${className} bg-white p-6 rounded-xl shadow-md w-full max-w-3xl mx-auto`}
    >
      <h2 className="text-2xl text-center font-bold text-theme-700 mb-4">
        🛒 Giỏ hàng của bạn
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 italic text-center py-10">
          Giỏ hàng trống.
        </p>
      ) : (
        <div className="space-y-4">
          <div className="max-h-96 overflow-y-auto px-2">
            {cartItems.map((item) => (
              <div
                key={item.figureId}
                className="grid grid-cols-4 border-b pb-4"
              >
                <Link
                  href={`/figures/${item.figureId}`}
                  className="col-span-2 flex items-center gap-4"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="rounded object-cover border border-theme-100"
                  />
                  <div className="text-start">
                    <h3 className="font-semibold text-gray-800 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">{item.price}₫</p>
                  </div>
                </Link>

                <div className="grid grid-cols-3 items-center justify-center text-center gap-3">
                  <button
                    onClick={() =>
                      updateQuantity(item.figureId, item.quantity - 1)
                    }
                    className="p-2 h-8 w-8 bg-theme-100 rounded text-theme-700 font-bold cursor-pointer"
                  >
                    <FaMinus />
                  </button>
                  <div className="font-semibold text-gray-700">
                    {item.quantity}
                  </div>
                  <button
                    onClick={() =>
                      updateQuantity(item.figureId, item.quantity + 1)
                    }
                    className="p-2 h-8 w-8 bg-theme-100 rounded text-theme-700 font-bold cursor-pointer"
                  >
                    <FaPlus />
                  </button>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-gray-800">
                    {item.price * item.quantity}₫
                  </p>
                  <button
                    onClick={() => removeItem(item.figureId)}
                    className="text-sm text-theme-600 hover:underline mt-1"
                  >
                    Xoá
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Tổng tiền */}
          <div className="flex justify-between items-center border-t">
            <span className="text-lg font-semibold text-gray-800">
              Tổng cộng:
            </span>
            <span className="text-xl font-bold text-theme-700">
              {totalPrice}₫
            </span>
          </div>

          {/* Nút thanh toán */}
          <Link
            href="/"
            className="text-center block w-full bg-theme-400 hover:bg-theme-500 text-white font-semibold py-2 rounded-lg mt-4 transition"
          >
            Thanh toán
          </Link>
        </div>
      )}
    </div>
  );
}
