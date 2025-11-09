"use client";

import { useCart } from "@/hooks/cart-hook";
import { useFigures } from "@/hooks/figure-hook";
import { useAddNewOrder } from "@/hooks/order-hook";
import { useVouchers } from "@/hooks/voucher-hook";
import { CartItem } from "@/types/cart";
import { Voucher } from "@/types/voucher";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaBoxOpen,
  FaCreditCard,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTag,
} from "react-icons/fa";
import MyImage from "../ui/MyImage";

export default function CheckoutPage() {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const { cart } = useCart();
  const { data: figures } = useFigures();
  const { data: vouchers } = useVouchers();
  const { addNewOrder, loading } = useAddNewOrder();
  const route = useRouter();

  const cartItems: CartItem[] = cart.items || [];
  const figuresInCartMap = new Map(
    (
      figures?.filter((figure) =>
        cartItems.some((item) => item.productId === figure.id)
      ) || []
    ).map((figure) => [figure.id, figure])
  );

  const total = cart.totalPrice;
  const discountedTotal = selectedVoucher
    ? Math.max(
        total - (total * selectedVoucher.salePercent) / 100,
        total - selectedVoucher.maxPriceCanDiscount
      )
    : total;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNewOrder(
      cartItems.map((item) => item.productId),
      address,
      phone,
      selectedVoucher ? selectedVoucher.id : null
    )
      .then(() => {
        alert("Đặt hàng thành công!");
        route.push("/profile");
      })
      .catch((err) => {
        alert("Đặt hàng thất bại: " + err.message);
      });
  };

  const handleSelectVoucher = (v: Voucher) => {
    setSelectedVoucher(v);
  };

  return (
    <div className="min-h-screen bg-theme-50 flex justify-center items-center py-10 px-4">
      <div className="bg-white shadow-md rounded-lg max-w-4xl w-full p-6">
        <h1 className="text-2xl font-bold text-theme-700 mb-6 text-center">
          Thanh toán đơn hàng
        </h1>

        {/* 🧾 Danh sách sản phẩm */}
        <div className="mb-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-theme-700 mb-3">
            <FaBoxOpen className="text-theme-500" /> Sản phẩm trong đơn
          </h2>

          <div className="divide-y divide-gray-200 border border-theme-100 rounded-md">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between p-3 hover:bg-theme-50 transition"
              >
                <div className="flex items-center gap-3">
                  <MyImage
                    height={64}
                    width={64}
                    src={
                      figuresInCartMap.get(item.productId)?.imgSrc[0] ||
                      "no-image.png"
                    }
                    alt={item.name}
                    className="rounded object-cover border border-gray-200"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Số lượng: {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-theme-700">
                    {item.lineTotal.toLocaleString()}₫
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.unitPrice.toLocaleString()}₫ / cái
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🏠 Form thanh toán */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Địa chỉ */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-theme-500" />
                Địa chỉ nhận hàng
              </div>
            </label>
            <textarea
              className="w-full border border-theme-200 focus:border-theme-500 focus:ring-theme-500 rounded-md p-3"
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Nhập địa chỉ nhận hàng của bạn"
              required
            />
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-theme-500" />
                Số điện thoại
              </div>
            </label>
            <input
              type="tel"
              className="w-full border border-theme-200 focus:border-theme-500 focus:ring-theme-500 rounded-md p-3"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Nhập số điện thoại liên hệ"
              required
            />
          </div>

          {/* Voucher */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              <div className="flex items-center gap-2">
                <FaTag className="text-theme-500" />
                Chọn mã giảm giá / Voucher
              </div>
            </label>

            <div className="grid gap-3 max-h-96 overflow-y-auto">
              {vouchers.map((v) => {
                const isSelected = selectedVoucher?.id === v.id;
                const usedFrom =
                  v.usedFrom &&
                  new Date(v.usedFrom).toLocaleDateString("vi-VN");
                const usedTo =
                  v.usedTo && new Date(v.usedTo).toLocaleDateString("vi-VN");

                return (
                  <div
                    key={v.id}
                    onClick={() => handleSelectVoucher(v)}
                    title={v.description}
                    className={`relative border rounded-md p-3 cursor-pointer transition hover:shadow-sm ${
                      isSelected
                        ? "border-theme-500 bg-theme-100"
                        : "border-theme-200 hover:border-theme-400"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-semibold text-theme-700">{v.id}</p>
                        <p className="text-sm text-gray-600 line-clamp-1 max-w-[80%]">
                          {v.description}
                        </p>

                        <div className="mt-1 text-xs text-gray-500 space-x-2">
                          <span>Số lượng: {v.quantity}</span>
                          <span>| Giảm: {v.salePercent}%</span>
                          <span>
                            | Giảm tối đa:{" "}
                            {v.maxPriceCanDiscount.toLocaleString()}₫
                          </span>
                        </div>

                        {(usedFrom || usedTo) && (
                          <p className="text-xs text-gray-500 mt-1">
                            {usedFrom && <span>Từ: {usedFrom}</span>}{" "}
                            {usedTo && <span>→ Đến: {usedTo}</span>}
                          </p>
                        )}
                      </div>
                      {isSelected && (
                        <span className="text-theme-600 font-semibold ml-2">
                          ✓
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tổng tiền */}
          <div className="flex justify-end mt-3">
            <div className="text-right">
              <p className="text-gray-600">
                Tạm tính:{" "}
                <span className="font-semibold">{total.toLocaleString()}₫</span>
              </p>
              {selectedVoucher && (
                <p className="text-gray-600">
                  Giảm giá ({selectedVoucher.id}):{" "}
                  <span className="text-theme-600 font-semibold">
                    -{(total - discountedTotal).toLocaleString()}₫
                  </span>
                </p>
              )}
              <p className="text-lg font-bold text-theme-700">
                Tổng cộng: {discountedTotal.toLocaleString()}₫
              </p>
            </div>
          </div>

          {/* Thanh toán */}
          <div className="pt-4 border-t border-gray-200">
            <button
              disabled={loading}
              type="submit"
              className="w-full flex justify-center items-center gap-2 py-3 bg-theme-600 hover:bg-theme-700 text-white font-semibold rounded-md transition-all"
            >
              <FaCreditCard /> Thanh toán ngay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
