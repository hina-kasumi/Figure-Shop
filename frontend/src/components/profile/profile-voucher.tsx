import { Voucher } from "@/types/voucher";
import { FaTicketAlt } from "react-icons/fa";

export function ProfileVouchers({ vouchers }: { vouchers: Voucher[] }) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-semibold flex items-center gap-2 text-theme-700">
        <FaTicketAlt /> Voucher khả dụng
      </h3>

      {vouchers.length === 0 ? (
        <p className="text-gray-500 mt-2">Không có voucher nào khả dụng</p>
      ) : (
        <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {vouchers.map((v) => (
            <li
              key={v.id}
              className="border border-theme-200 rounded-lg p-4 bg-theme-50"
            >
              <p className="font-semibold text-theme-700">{v.description}</p>
              <p className="text-sm text-gray-600">
                Giảm {v.salePercent}% (Tối đa{" "}
                {v.maxPriceCanDiscount.toLocaleString()}đ)
              </p>
              <p className="text-xs text-gray-500 mt-1">
                HSD: {v.usedFrom} - {v.usedTo}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
