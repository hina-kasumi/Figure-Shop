"use client";
import type { OrderOfUserDetailResponse, OrderOfUserItem } from "@/types/order";
import { useEffect, useState } from "react";
import { FaBox, FaCheckCircle, FaShippingFast } from "react-icons/fa";
import OrderDetailModal from "./order-detail-modal-popup";
import { useUserOrders } from "@/hooks/order-hook";
import { formatDate } from "@/utils/date-format";

export default function ProfileOrders() {
  const { error, getUserOrderById, loading, orders, reload } = useUserOrders();
  const pending = orders.filter((o) => o.status === 0);
  const progressing = orders.filter((o) => o.status === 1);
  const shipping = orders.filter((o) => o.status === 2);
  const completed = orders.filter((o) => o.status === 3);

  const [selectedOrder, setSelectedOrder] = useState<OrderOfUserItem | null>(
    null
  );
  const [orderDetails, setOrderDetails] =
    useState<OrderOfUserDetailResponse | null>(null);

  useEffect(() => {
    if (selectedOrder) {
      getUserOrderById(selectedOrder.id)
        .then((details) => setOrderDetails(details))
        .catch((err) => console.error("Failed to fetch order details:", err));
    } else {
      setOrderDetails(null);
    }
  }, [selectedOrder]);

  if (loading) {
    return <p>Đang tải đơn hàng...</p>;
  }

  if (error) {
    return <p className="text-red-500">Lỗi khi tải đơn hàng: {error.message}</p>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-6">
      <h3 className="text-lg font-semibold flex items-center gap-2 text-theme-700">
        <FaBox /> Đơn hàng của bạn
      </h3>

      <OrderPart
        title="Chờ xử lý"
        icon={<FaBox className="text-yellow-500" />}
        orders={pending}
        setSelectedOrder={(order) => setSelectedOrder(order)}
      />
      <OrderPart
        title="Đang xử lý"
        icon={<FaShippingFast className="text-blue-500" />}
        orders={progressing}
        setSelectedOrder={(order) => setSelectedOrder(order)}
      />
      <OrderPart
        title="Đang giao"
        icon={<FaShippingFast className="text-purple-500" />}
        orders={shipping}
        setSelectedOrder={(order) => setSelectedOrder(order)}
      />
      <OrderPart
        title="Hoàn thành"
        icon={<FaCheckCircle className="text-green-500" />}
        orders={completed}
        setSelectedOrder={(order) => setSelectedOrder(order)}
      />

      {/* Popup chi tiết */}
      {selectedOrder && (
        <OrderDetailModal
          order={orderDetails}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}

interface OrderPartProps {
  title: string;
  icon: React.ReactNode;
  setSelectedOrder: (order: OrderOfUserItem) => void;
  orders: OrderOfUserItem[];
}

function OrderPart({ title, icon, orders, setSelectedOrder }: OrderPartProps) {
  return (
    <div>
      <h4 className="font-semibold flex items-center gap-2 text-theme-600 mb-2">
        {icon} {title}
      </h4>
      {orders.length === 0 ? (
        <p className="text-gray-500 text-sm">Chưa có đơn {title}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {orders.map((o) => (
            <OrderItem
              key={o.id}
              order={o}
              onClick={() => setSelectedOrder(o)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------- Order Item ------------------- */
const OrderItem = ({
  order,
  onClick,
}: {
  order: OrderOfUserItem;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="border border-gray-200 rounded-lg p-4 bg-theme-50 cursor-pointer hover:shadow-md transition"
  >
    <p className="text-sm text-gray-600">Mã đơn: {order.id}</p>
    <p className="font-semibold">{order.address}</p>
    <p className="text-sm text-gray-700">Giá: {order.totalPrice.toLocaleString("vi-VN")}đ</p>
    <p className="text-xs text-gray-500">Ngày tạo: {formatDate(order.orderDate)}</p>
  </div>
);
