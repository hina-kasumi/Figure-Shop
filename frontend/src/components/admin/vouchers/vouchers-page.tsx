"use client";

import Link from "next/link";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useState } from "react";
import { useDeleteVoucher, useVouchers } from "@/hooks/voucher-hook";

export default function VoucherListPage() {
  const { data: vouchers, isLoading, error } = useVouchers();
  const { deleteVoucher, isLoading: isDeleting } = useDeleteVoucher();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    const confirm = window.confirm("Bạn có chắc muốn xóa voucher này?");
    if (!confirm) return;

    try {
      setDeletingId(id);
      await deleteVoucher(id);
      // Reload lại danh sách (cách đơn giản nhất là refresh trang hoặc gọi lại API)
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Xóa thất bại, vui lòng thử lại!");
    } finally {
      setDeletingId(null);
    }
  }

  if (isLoading)
    return (
      <div className="p-4 text-gray-500">Đang tải danh sách voucher...</div>
    );
  if (error)
    return <div className="p-4 text-red-500">Lỗi khi tải dữ liệu voucher</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-theme-700">
          Danh sách Voucher
        </h1>
        <Link
          href="/admin/vouchers/new"
          className="px-4 py-2 rounded-md bg-theme-600 text-white hover:bg-theme-700"
        >
          + Thêm Voucher
        </Link>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-theme-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Mã
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Mô tả
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Giảm (%)
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Số lượng
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Trạng thái
              </th>
              <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {vouchers.map((v) => (
              <tr key={v.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-800">{v.id}</td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  <p className="line-clamp-1">{v.description}</p>
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {v.salePercent}%
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {v.quantity}
                </td>
                <td className="px-4 py-2 text-sm">
                  <span
                    className={`px-2 py-1 rounded-md text-xs ${
                      v.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {v.isActive ? "Hoạt động" : "Tạm dừng"}
                  </span>
                </td>
                <td className="px-4 py-2 text-right text-sm">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/vouchers/${v.id}`}
                      className="text-theme-600 hover:text-theme-800 flex items-center gap-2"
                      title="Chỉnh sửa"
                    >
                      <FiEdit className="w-5 h-5" />
                      Sửa
                    </Link>
                    <button
                      onClick={() => handleDelete(v.id)}
                      disabled={isDeleting && deletingId === v.id}
                      className={`text-red-500 hover:text-red-700 flex items-center gap-2 transition ${
                        isDeleting && deletingId === v.id
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      title="Xóa voucher"
                    >
                      <FiTrash className="w-5 h-5" />
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {vouchers.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center text-gray-500 py-4 text-sm"
                >
                  Không có voucher nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
