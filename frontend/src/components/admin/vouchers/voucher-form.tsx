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

interface Props {
  id: string;
}

export default function VoucherFormPage({ id }: Props) {
  const router = useRouter();
  const { data: voucher, isLoading, error } = useVoucher(id);
  const { updateVoucher, isLoading: isUpdating } = useUpdateVoucher();
  const { createVoucher, isLoading: isCreating } = useCreateVoucher();

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

  // Khi dữ liệu voucher tải xong → set vào form
  useEffect(() => {
    if (voucher && id != "new") {
      setForm({
        description: voucher.description,
        salePercent: voucher.salePercent,
        quantity: voucher.quantity,
        maxPriceCanDiscount: voucher.maxPriceCanDiscount,
        minPriceCanUse: voucher.minPriceCanUse ?? null,
        figuresAvalable: voucher.figuresAvalable ?? [],
        isActive: voucher.isActive,
        usedFrom: voucher.usedFrom ?? null,
        usedTo: voucher.usedTo ?? null,
      });
    }
  }, [voucher]);

  // Hàm submit form
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (id === "new") await createVoucher(form);
      else await updateVoucher(id, form);

      alert("Cập nhật voucher thành công!");
      router.push("/admin/vouchers");
    } catch (err) {
      console.error(err);
      alert("Có lỗi khi cập nhật voucher, vui lòng thử lại!");
    }
  }

  if (isLoading) return <div className="p-4">Đang tải dữ liệu...</div>;
  if (error)
    return <div className="p-4 text-red-500">Không thể tải voucher</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold text-theme-700 mb-6">
        Cập nhật Voucher
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          {/* Phần trăm giảm */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Giảm giá (%)
            </label>
            <input
              type="number"
              min={0}
              max={100}
              value={form.salePercent}
              onChange={(e) =>
                setForm({ ...form, salePercent: Number(e.target.value) })
              }
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-theme-500 outline-none"
              required
            />
          </div>

          {/* Số lượng */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Số lượng
            </label>
            <input
              type="number"
              min={0}
              value={form.quantity}
              onChange={(e) =>
                setForm({ ...form, quantity: Number(e.target.value) })
              }
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-theme-500 outline-none"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* Điều kiện sử dụng */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Đơn hàng tối thiểu có thể dùng (VNĐ)
            </label>
            <input
              type="number"
              value={form.minPriceCanUse ?? ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  minPriceCanUse: e.target.value
                    ? Number(e.target.value)
                    : null,
                })
              }
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-theme-500 outline-none"
            />
          </div>

          {/* Giảm tối đa */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Giảm tối đa (VNĐ)
            </label>
            <input
              type="number"
              value={form.maxPriceCanDiscount}
              onChange={(e) =>
                setForm({
                  ...form,
                  maxPriceCanDiscount: Number(e.target.value),
                })
              }
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-theme-500 outline-none"
              required
            />
          </div>
        </div>
        {/* Thời gian áp dụng */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Bắt đầu
            </label>
            <input
              type="date"
              value={form.usedFrom ?? ""}
              onChange={(e) => setForm({ ...form, usedFrom: e.target.value })}
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-theme-500 outline-none"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Kết thúc
            </label>
            <input
              type="date"
              value={form.usedTo ?? ""}
              onChange={(e) => setForm({ ...form, usedTo: e.target.value })}
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-theme-500 outline-none"
            />
          </div>
        </div>

        {/* Khách hàng áp dụng */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Áp dụng cho khách hàng (mã người dùng, cách nhau bởi dấu phẩy)
          </label>
          <textarea
            rows={2}
            value={form.figuresAvalable?.join(", ") ?? ""}
            onChange={(e) =>
              setForm({
                ...form,
                figuresAvalable: e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
            className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-theme-500 outline-none"
            placeholder="VD: user123, user456, user789"
          />
        </div>

        {/* Trạng thái hoạt động */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isActive"
            checked={form.isActive}
            onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
            className="w-4 h-4 accent-theme-600"
          />
          <label htmlFor="isActive" className="text-sm text-gray-700">
            Hoạt động
          </label>
        </div>

        {/* Mô tả */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Mô tả
          </label>
          <DescriptionInput
            value={form.description}
            handleChange={(value) => setForm({ ...form, description: value })}
          />
        </div>

        {/* Nút hành động */}
        <div className="pt-4 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => router.push("/admin/vouchers")}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={isUpdating}
            className={`px-4 py-2 rounded-md bg-theme-600 text-white hover:bg-theme-700 transition ${
              isUpdating ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isUpdating ? "Đang lưu..." : "Cập nhật"}
          </button>
        </div>
      </form>
    </div>
  );
}
