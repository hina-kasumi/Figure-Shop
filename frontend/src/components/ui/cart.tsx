"use client";

import { useCart } from "@/hooks/cart-hook";
import { useFigures } from "@/hooks/figure-hook";
import { CartItem } from "@/types/cart";
import Link from "next/link";
import { FaMinus, FaPlus } from "react-icons/fa";
import MyImage from "./MyImage";

interface CartProps {
  className?: string;
}

export default function Cart({ className }: CartProps) {
  const { cart, removeCartItem, updateCartItemQuantity, error } = useCart();
  const { data: figures } = useFigures();

  const cartItems: CartItem[] = cart.items || [];

  const figuresInCartMap = new Map(
    (
      figures?.filter((figure) =>
        cartItems.some((item) => item.productId === figure.id)
      ) || []
    ).map((figure) => [figure.id, figure])
  );

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateCartItemQuantity(id, newQuantity);
  };

  const removeItem = (id: string) => {
    removeCartItem(id);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0
  );

  // 🚨 Hiển thị lỗi (ưu tiên)
  if (error) {
    return (
      <div
        className={`${className} bg-white p-6 rounded-xl shadow-md w-full max-w-3xl mx-auto text-center`}
      >
        <h2 className="text-2xl font-bold text-red-600 mb-3">Lỗi tải dữ liệu</h2>
        <p className="text-gray-600">
          {error?.message|| "Không thể tải dữ liệu giỏ hàng."}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-theme-500 text-white rounded hover:bg-theme-600 transition"
        >
          Thử lại
        </button>
      </div>
    );
  }

  // ⏳ Hiển thị khi đang tải dữ liệu
  if (cartItems === null) {
    return (
      <div
        className={`${className} bg-white p-6 rounded-xl shadow-md w-full max-w-3xl mx-auto text-center`}
      >
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-theme-400 border-t-transparent"></div>
        </div>
        <p className="text-gray-500 mt-3">Đang tải giỏ hàng...</p>
      </div>
    );
  }

  // 🛒 Hiển thị giỏ hàng
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
                key={item.productId}
                className="grid grid-cols-4 border-b pb-4"
              >
                <Link
                  href={`/figures/${item.productId}`}
                  className="col-span-2 flex items-center gap-4"
                >
                  <MyImage
                    src={figuresInCartMap.get(item.productId)?.imgSrc[0] || "/placeholder.png"}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="rounded object-cover border border-theme-100"
                  />
                  <div className="text-start">
                    <h3 className="font-semibold text-gray-800 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {item.unitPrice.toLocaleString("vi-VN")}₫
                    </p>
                  </div>
                </Link>

                <div className="grid grid-cols-3 items-center justify-center text-center gap-3">
                  <button
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity - 1)
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
                      updateQuantity(item.productId, item.quantity + 1)
                    }
                    className="p-2 h-8 w-8 bg-theme-100 rounded text-theme-700 font-bold cursor-pointer"
                  >
                    <FaPlus />
                  </button>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-gray-800">
                    {(item.unitPrice * item.quantity).toLocaleString("vi-VN")}₫
                  </p>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-sm text-theme-600 hover:underline mt-1"
                  >
                    Xoá
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Tổng tiền */}
          <div className="flex justify-between items-center border-t pt-3">
            <span className="text-lg font-semibold text-gray-800">
              Tổng cộng:
            </span>
            <span className="text-xl font-bold text-theme-700">
              {totalPrice.toLocaleString("vi-VN")}₫
            </span>
          </div>

          {/* Nút thanh toán */}
          <Link
            href="/checkout"
            className="text-center block w-full bg-theme-400 hover:bg-theme-500 text-white font-semibold py-2 rounded-lg mt-4 transition"
          >
            Thanh toán
          </Link>
        </div>
      )}
    </div>
  );
}
