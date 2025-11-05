"use client";
import { useState } from "react";
import { useOrders } from "@/hooks/order-hook";
import { OrderResponse, OrderStatus } from "@/types/order";
import OrderDetailModal from "./order-form";

export default function OrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | undefined>(
    undefined
  );
  const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(
    null
  );
  const [searchUser, setSearchUser] = useState<string>("");

  const { orders, reload, loading, error } = useOrders(
    searchUser || undefined,
    selectedStatus
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-theme-800">
        Quản lý đơn hàng
      </h1>

      {/* Bộ lọc + tìm kiếm */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Tìm kiếm theo user */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            placeholder="🔍 Tìm theo email người dùng..."
            className="border border-theme-200 rounded-md px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-theme-400 text-gray-700"
          />
          {searchUser && (
            <button
              onClick={() => setSearchUser("")}
              className="text-theme-700 text-sm hover:underline"
            >
              Xoá
            </button>
          )}
        </div>

        {/* Bộ lọc trạng thái */}
        <div className="flex items-center gap-2">
          <label htmlFor="status" className="font-medium text-gray-700">
            Trạng thái:
          </label>
          <select
            id="status"
            value={selectedStatus ?? ""}
            onChange={(e) =>
              setSelectedStatus(
                e.target.value ? (e.target.value as OrderStatus) : undefined
              )
            }
            className="border border-theme-200 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-theme-400"
          >
            <option value="">Tất cả</option>
            {Object.values(OrderStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading & Error */}
      {loading && (
        <p className="text-gray-500 animate-pulse">
          Đang tải danh sách đơn hàng...
        </p>
      )}
      {error && (
        <p className="text-red-600">Lỗi khi tải dữ liệu: {error.message}</p>
      )}

      {/* Bảng đơn hàng */}
      {!loading && !error && (
        <div className="overflow-x-auto rounded-md border border-gray-200 shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-theme-100 text-theme-800 font-semibold">
              <tr>
                <th className="p-3 text-left">Mã đơn</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Trạng thái</th>
                <th className="p-3 text-left">Tổng tiền</th>
                <th className="p-3 text-left">Ngày đặt</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t hover:bg-theme-50 cursor-pointer transition"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <td className="p-3 font-mono text-sm">{order.id}</td>
                    <td className="p-3">{order.user.email}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-sm font-medium ${
                          order.status === OrderStatus.Completed
                            ? "bg-green-100 text-green-700"
                            : order.status === OrderStatus.Pending
                            ? "bg-theme-100 text-theme-700"
                            : order.status === OrderStatus.Cancelled
                            ? "bg-red-100 text-red-700"
                            : "bg-theme-200 text-theme-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3">
                      {order.totalPrice.toLocaleString("vi-VN")}₫
                    </td>
                    <td className="p-3 text-gray-600">
                      {new Date(order.orderDate).toLocaleDateString("vi-VN")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    Không có đơn hàng nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {/* Popup chi tiết */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdated={() => reload()}
        />
      )}
    </div>
  );
}
