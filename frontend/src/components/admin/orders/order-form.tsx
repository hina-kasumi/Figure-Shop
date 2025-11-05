"use client";
import { useUpdateOrderStatus } from "@/hooks/order-hook";
import { OrderResponse, OrderStatus } from "@/types/order";
import { useState } from "react";

interface OrderDetailModalProps {
  order: OrderResponse | null;
  onClose: () => void;
  onUpdated?: () => void;
}

export default function OrderDetailModal({
  order,
  onClose,
  onUpdated,
}: OrderDetailModalProps) {
  const { updateOrderStatus, loading } = useUpdateOrderStatus();
  const [newStatus, setNewStatus] = useState<OrderStatus | undefined>(
    order ? (order.status as OrderStatus) : undefined
  );
  const [updating, setUpdating] = useState(false);

  if (!order) return null;

  async function handleUpdate() {
    if (!order) return;
    if (!newStatus || newStatus == order?.status) return;
    setUpdating(true);
    try {
      await updateOrderStatus(order.id, newStatus);
      if (onUpdated) onUpdated();
      onClose();
    } catch (err) {
      console.error("Cập nhật trạng thái lỗi:", err);
      alert("Không thể cập nhật trạng thái đơn hàng!");
    } finally {
      setUpdating(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 animate-fade-in">
        <h2 className="text-xl font-semibold text-theme-800 mb-4">
          🧾 Chi tiết đơn hàng
        </h2>

        <div className="space-y-2 mb-4">
          <div>
            <span className="font-semibold text-gray-700">Mã đơn:</span>{" "}
            <span className="font-mono text-gray-800">{order.id}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Khách hàng:</span>{" "}
            {order.user.email}
          </div>
          <div>
            <span className="font-semibold text-gray-700">Số điện thoại:</span>{" "}
            {order.phoneNumber}
          </div>
          <div>
            <span className="font-semibold text-gray-700">Địa chỉ:</span>{" "}
            {order.address}
          </div>
          <div>
            <span className="font-semibold text-gray-700">Ngày đặt:</span>{" "}
            {new Date(order.orderDate).toLocaleString("vi-VN")}
          </div>
          <div>
            <span className="font-semibold text-gray-700">Ngày giao:</span>{" "}
            {order.deliveryDate
              ? new Date(order.deliveryDate).toLocaleDateString("vi-VN")
              : "Chưa giao"}
          </div>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="border rounded-md p-3 mb-4">
          <h3 className="font-medium mb-2 text-theme-700">
            Sản phẩm trong đơn
          </h3>
          <table className="w-full text-sm">
            <thead className="bg-theme-50">
              <tr>
                <th className="p-2 text-left">ID Figure</th>
                <th className="p-2 text-left">Giá</th>
                <th className="p-2 text-left">Số lượng</th>
              </tr>
            </thead>
            <tbody>
              {order.orderFigures.map((f) => (
                <tr key={f.figureId} className="border-t">
                  <td className="p-2">{f.figureId}</td>
                  <td className="p-2">{f.price.toLocaleString("vi-VN")}₫</td>
                  <td className="p-2">{f.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tổng tiền */}
        <div className="mb-4 font-semibold text-theme-800">
          Tổng tiền: {order.totalPrice.toLocaleString("vi-VN")}₫
        </div>

        {/* Cập nhật trạng thái */}
        <div className="flex items-center gap-3 mb-6">
          <label className="font-medium text-gray-700">
            Cập nhật trạng thái:
          </label>
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
            className="border border-theme-200 rounded px-3 py-2 focus:ring-2 focus:ring-theme-400"
          >
            {Object.values(OrderStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Nút hành động */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100 cursor-pointer"
          >
            Đóng
          </button>
          <button
            disabled={updating || loading}
            onClick={handleUpdate}
            className={`px-4 py-2 rounded-md text-white bg-theme-600 hover:bg-theme-700 disabled:opacity-50 cursor-pointer`}
          >
            {updating ? "Đang cập nhật..." : "Lưu thay đổi"}
          </button>
        </div>
      </div>
    </div>
  );
}
