import { Order } from "@/types/order";
import { FaTicketAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

interface OrderDetailModalProps {
  order: Order;
  onClose: () => void;
}

/* ------------------- Popup Modal ------------------- */
export default function OrderDetailModal({
  order,
  onClose,
}: OrderDetailModalProps) {
  const voucher = order.voucherID ? order.voucherID : null;
  const figures = order.figures || [];

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-lg cursor-pointer"
        >
          <IoClose size={30} />
        </button>

        <h3 className="text-lg font-semibold text-theme-700 mb-3">
          Chi tiết đơn hàng
        </h3>

        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-600">
            <strong>Mã đơn:</strong> {order.id}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Địa chỉ:</strong> {order.address}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Ngày tạo:</strong> {order.createdAt}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Giá tiền:</strong> {order.priceDiscounted.toLocaleString()}đ
          </p>
        </div>

        <h4 className="font-semibold mb-2">Sản phẩm đã mua:</h4>
        <div className="space-y-2">
          {figures.length === 0 ? (
            <p className="text-gray-500 text-sm">Không có sản phẩm</p>
          ) : (
            figures.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded p-2 text-sm flex justify-between"
              >
                <span>{item.figure?.name || "Sản phẩm không tồn tại"}</span>
                <span>x{item.quantity}</span>
              </div>
            ))
          )}
        </div>

        {voucher && (
          <div className="mt-4 p-3 border border-dashed border-theme-400 bg-theme-50 rounded">
            <h4 className="font-semibold flex items-center gap-2 text-theme-600">
              <FaTicketAlt /> Voucher đã dùng
            </h4>
            <p className="text-sm">Mã voucher: {voucher}</p>
          </div>
        )}

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-theme-600 text-white rounded hover:bg-theme-700 cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
