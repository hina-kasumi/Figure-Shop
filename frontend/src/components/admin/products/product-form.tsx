"use client";

import DescriptionInput from "@/components/ui/description-input";
import {
  useBranches,
  useCategories,
  useCreateFigure,
  useFigureDetail,
  useUpdateFigure,
} from "@/hooks/figure-hook";
import { FigureForm } from "@/types/figure";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductFormPage({ id }: { id: string }) {
  const router = useRouter();

  const { data: figureDetail } = useFigureDetail(id);
  const { data: categories } = useCategories();
  const { data: branches } = useBranches();
  const [form, setForm] = useState<FigureForm>({
    id: undefined,
    name: "",
    imgSrc: [],
    branchId: "",
    categoryId: "",
    price: 0,
    quantity: 0,
    description: "",
  });
  const { func: createFigure } = useCreateFigure();
  const { func: updateFigure } = useUpdateFigure();

  function handleSave() {
    if (id !== "new") {
      updateFigure(form);
    } else {
      createFigure(form);
    }
  }

  useEffect(() => {
    if (figureDetail && id != "new") {
      setForm({
        ...figureDetail,
      });
    }
  }, [id, figureDetail]);

  // --- Cập nhật form state ---
  const handleChange = (key: keyof FigureForm, value: unknown) =>
    setForm({ ...form, [key]: value });

  // --- Khi chọn branch/category ---
  const handleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const branch = branches.find((b) => b.id === e.target.value);
    if (branch) {
      setForm({
        ...form,
        branchId: branch.id,
      });
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = categories.find((c) => c.id === e.target.value);
    if (category) {
      setForm({
        ...form,
        categoryId: category.id,
      });
    }
  };

  // --- Submit ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(id ? "Đã cập nhật sản phẩm!" : "Đã thêm sản phẩm mới!");
    router.push("/admin/products");
  };

  return (
    <div className="p-6 max-w-4xl bg-white rounded-lg mx-auto shadow">
      <h1 className="text-xl font-semibold text-theme-700 mb-4">
        {id ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tên sản phẩm */}
        <div>
          <label className="block text-sm font-medium mb-1">Tên sản phẩm</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 text-sm"
            value={form?.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />
        </div>

        {/* Giá + Giảm giá + số lượng*/}
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Giá</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2 text-sm"
              value={form?.price}
              onChange={(e) => handleChange("price", Number(e.target.value))}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Giảm (%)</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2 text-sm"
              value={form?.salePercent ?? 0}
              onChange={(e) =>
                handleChange("salePercent", Number(e.target.value))
              }
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Số lượng</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2 text-sm"
              value={form?.quantity}
              onChange={(e) =>
                handleChange("quantity", Number(e.target.value))
              }
            />
          </div>
        </div>

        {/* Ảnh */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Ảnh (URLs, cách nhau bởi dấu phẩy)
          </label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 text-sm"
            placeholder="https://..."
            value={form?.imgSrc.join(",")}
            onChange={(e) =>
              handleChange(
                "imgSrc",
                e.target.value.split(",").map((s) => s.trim())
              )
            }
          />
        </div>

        {/* Danh mục + Thương hiệu */}
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              Danh mục (Category)
            </label>
            <select
              className="w-full border rounded px-3 py-2 text-sm"
              value={form?.categoryId}
              onChange={handleCategoryChange}
            >
              <option value="">-- Chọn danh mục --</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              Thương hiệu (Branch)
            </label>
            <select
              className="w-full border rounded px-3 py-2 text-sm"
              value={form?.branchId}
              onChange={handleBranchChange}
            >
              <option value="">-- Chọn thương hiệu --</option>
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Mô tả */}
        <div>
          <label className="block text-sm font-medium mb-1">Mô tả</label>
          <DescriptionInput
            value={form.description}
            handleChange={(value) => handleChange("description", value)}
          />
        </div>

        {/* Nút hành động */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-sm border rounded hover:bg-gray-100"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-theme-600 text-white rounded hover:opacity-90"
            onClick={handleSave}
          >
            {id != "new" ? "Cập nhật" : "Lưu sản phẩm"}
          </button>
        </div>
      </form>
    </div>
  );
}
