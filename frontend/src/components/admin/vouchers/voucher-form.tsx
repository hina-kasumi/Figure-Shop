"use client";

import DescriptionInput from "@/components/ui/description-input";
import {
  useCreateVoucher,
  useUpdateVoucher,
  useVoucher,
} from "@/hooks/voucher-hook";
import { VoucherForm } from "@/types/voucher";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSave, FaTimes, FaCalendarAlt, FaTag, FaUsers, FaPercent, FaBoxOpen } from "react-icons/fa";

interface Props {
  id: string;
}

export default function VoucherFormPage({ id }: Props) {
  const router = useRouter();
  const isNew = id === "new";

  const { data: voucher, isLoading, error } = useVoucher(id);
  const { createVoucher, isLoading: isCreating } = useCreateVoucher();
  const { updateVoucher, isLoading: isUpdating } = useUpdateVoucher();

  const [form, setForm] = useState<VoucherForm>({
    description: "",
    salePercent: 0,
    quantity: 0,
    maxPriceCanDiscount: 0,
    minPriceCanUse: null,
    figuresAvalable: [],
    isActive: true,
    usedFrom: null,
    usedTo: null,
  });

  useEffect(() => {
    if (voucher && !isNew) {
      setForm({
        description: voucher.description || "",
        salePercent: voucher.salePercent || 0,
        quantity: voucher.quantity || 0,
        maxPriceCanDiscount: voucher.maxPriceCanDiscount || 0,
        minPriceCanUse: voucher.minPriceCanUse ?? null,
        figuresAvalable: voucher.figuresAvalable ?? [],
        isActive: voucher.isActive ?? true,
        usedFrom: voucher.usedFrom ?? null,
        usedTo: voucher.usedTo ?? null,
      });
    }
  }, [voucher, isNew]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isNew) {
        await createVoucher(form);
      } else {
        await updateVoucher(id, form);
      }
      alert(isNew ? "Tạo voucher thành công!" : "Cập nhật voucher thành công!");
      router.push("/admin/vouchers");
    } catch (err: any) {
      alert("Lỗi: " + (err.message || "Không thể lưu voucher"));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-700">Đang tải thông tin voucher...</p>
        </div>
      </div>
    );
  }

  if (error && !isNew) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 text-red-600 p-8 rounded-2xl shadow-lg text-center">
          <p className="text-xl font-bold">Không thể tải voucher</p>
          <p className="mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-10 py-8 text-white">
            <h1 className="text-4xl font-bold flex items-center gap-4">
              {isNew ? "Tạo Voucher Mới" : "Chỉnh sửa Voucher"}
            </h1>
            <p className="mt-3 text-lg opacity-90">
              {isNew ? "Tạo mã giảm giá hấp dẫn cho khách hàng" : `Mã: #${id}`}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-10">

            {/* Phần trăm giảm & Số lượng */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group">
                <label className="flex items-center gap-3 text-lg font-semibold text-gray-700 mb-3">
                  <FaPercent className="text-indigo-600" /> Giảm giá (%)
                </label>
                <input
                  type="number"
                  min="1"
                  max="99"
                  required
                  value={form.salePercent}
                  onChange={(e) => setForm({ ...form, salePercent: Number(e.target.value) })}
                  className="w-full px-6 py-5 text-3xl font-bold text-indigo-600 border-2 border-indigo-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
                  placeholder="15"
                />
              </div>

              <div className="group">
                <label className="flex items-center gap-3 text-lg font-semibold text-gray-700 mb-3">
                  <FaBoxOpen className="text-purple-600" /> Số lượng voucher
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={form.quantity}
                  onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
                  className="w-full px-6 py-5 text-3xl font-bold text-purple-600 border-2 border-purple-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all"
                  placeholder="100"
                />
              </div>
            </div>

            {/* Điều kiện áp dụng */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-8 border border-emerald-200">
              <h3 className="text-xl font-bold text-emerald-800 mb-6 flex items-center gap-3">
                Điều kiện áp dụng
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Đơn hàng tối thiểu (để dùng voucher)
                  </label>
                  <input
                    type="number"
                    value={form.minPriceCanUse ?? ""}
                    onChange={(e) => setForm({ ...form, minPriceCanUse: e.target.value ? Number(e.target.value) : null })}
                    className="w-full px-5 py-4 border-2 border-emerald-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all"
                    placeholder="Không giới hạn"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giảm tối đa (VNĐ)
                  </label>
                  <input
                    type="number"
                    required
                    value={form.maxPriceCanDiscount}
                    onChange={(e) => setForm({ ...form, maxPriceCanDiscount: Number(e.target.value) })}
                    className="w-full px-5 py-4 border-2 border-emerald-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all font-bold text-emerald-700"
                    placeholder="500000"
                  />
                </div>
              </div>
            </div>

            {/* Thời gian áp dụng */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="flex items-center gap-3 text-lg font-semibold text-gray-700 mb-3">
                  <FaCalendarAlt className="text-rose-600" /> Ngày bắt đầu
                </label>
                <input
                  type="date"
                  value={form.usedFrom || ""}
                  onChange={(e) => setForm({ ...form, usedFrom: e.target.value || null })}
                  className="w-full px-5 py-4 border-2 border-rose-200 rounded-xl focus:ring-4 focus:ring-rose-100 focus:border-rose-500 transition-all text-rose-600 font-medium"
                />
              </div>
              <div>
                <label className="flex items-center gap-3 text-lg font-semibold text-gray-700 mb-3">
                  <FaCalendarAlt className="text-pink-600" /> Ngày kết thúc
                </label>
                <input
                  type="date"
                  value={form.usedTo || ""}
                  onChange={(e) => setForm({ ...form, usedTo: e.target.value || null })}
                  className="w-full px-5 py-4 border-2 border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-100 focus:border-pink-500 transition-all text-pink-600 font-medium"
                />
              </div>
            </div>

            {/* Áp dụng cho khách hàng cụ thể */}
            <div>
              <label className="flex items-center gap-3 text-lg font-semibold text-gray-700 mb-3">
                <FaUsers className="text-cyan-600" /> Áp dụng riêng (tùy chọn)
              </label>
              <textarea
                rows={3}
                value={form.figuresAvalable?.join(", ") || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    figuresAvalable: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
                className="w-full px-5 py-4 border-2 border-cyan-200 rounded-xl focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 transition-all"
                placeholder="Nhập ID người dùng, cách nhau bằng dấu phẩy (VD: user123, user456)"
              />
              <p className="text-sm text-gray-500 mt-2">Để trống = áp dụng cho tất cả khách hàng</p>
            </div>

            {/* Trạng thái */}
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-4 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  className="w-6 h-6 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <span className="text-lg font-medium text-gray-700">Kích hoạt voucher ngay</span>
              </label>
            </div>

            {/* Mô tả */}
            <div>
              <label className="flex items-center gap-3 text-lg font-semibold text-gray-700 mb-3">
                <FaTag className="text-orange-600" /> Mô tả voucher (hiển thị cho khách)
              </label>
              <DescriptionInput
                value={form.description}
                handleChange={(value) => setForm({ ...form, description: value })}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-6 pt-8 border-t-2 border-gray-100">
              <button
                type="button"
                onClick={() => router.push("/admin/vouchers")}
                className="flex items-center gap-3 px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition-all"
              >
                <FaTimes /> Hủy bỏ
              </button>
              <button
                type="submit"
                disabled={isCreating || isUpdating}
                className="flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <FaSave />
                {isCreating || isUpdating ? "Đang lưu..." : (isNew ? "Tạo Voucher" : "Cập nhật")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}