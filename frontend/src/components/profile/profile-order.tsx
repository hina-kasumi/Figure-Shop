"use client";
import type { Order } from "@/types/order";
import { useState } from "react";
import { FaBox, FaCheckCircle, FaShippingFast } from "react-icons/fa";
import OrderDetailModal from "./order-detail-modal-popup";

export default function ProfileOrders({ orders }: { orders: Order[] }) {
  const shipping = orders.filter((o) => o.status === "shipping");
  const completed = orders.filter((o) => o.status === "completed");

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-6">
      <h3 className="text-lg font-semibold flex items-center gap-2 text-theme-700">
        <FaBox /> Đơn hàng của bạn
      </h3>

      {/* Đang giao */}
      <div>
        <h4 className="font-semibold flex items-center gap-2 text-theme-600 mb-2">
          <FaShippingFast /> Đang giao
        </h4>
        {shipping.length === 0 ? (
          <p className="text-gray-500 text-sm">Không có đơn đang giao</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {shipping.map((o) => (
              <OrderItem key={o.id} order={o} onClick={() => setSelectedOrder(o)} />
            ))}
          </div>
        )}
      </div>

      {/* Đã hoàn thành */}
      <div>
        <h4 className="font-semibold flex items-center gap-2 text-theme-600 mb-2">
          <FaCheckCircle /> Đã hoàn thành
        </h4>
        {completed.length === 0 ? (
          <p className="text-gray-500 text-sm">Chưa có đơn hoàn thành</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {completed.map((o) => (
              <OrderItem key={o.id} order={o} onClick={() => setSelectedOrder(o)} />
            ))}
          </div>
        )}
      </div>

      {/* Popup chi tiết */}
      {selectedOrder && (
        <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  );
}

/* ------------------- Order Item ------------------- */
const OrderItem = ({
  order,
  onClick,
}: {
  order: Order;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="border border-gray-200 rounded-lg p-4 bg-theme-50 cursor-pointer hover:shadow-md transition"
  >
    <p className="text-sm text-gray-600">Mã đơn: {order.id}</p>
    <p className="font-semibold">{order.address}</p>
    <p className="text-sm text-gray-700">
      Giá: {order.priceDiscounted.toLocaleString()}đ
    </p>
    <p className="text-xs text-gray-500">Ngày tạo: {order.createdAt}</p>
  </div>
);
