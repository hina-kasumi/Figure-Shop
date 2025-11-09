"use client";

import Comment from "@/components/ui/comment";
import DescriptionInput from "@/components/ui/description-input";
import MyImage from "@/components/ui/MyImage";
import {
  useBranches,
  useCategories,
  useComments,
  useCreateFigure,
  useFigureDetail,
  useUpdateFigure,
} from "@/hooks/figure-hook";
import { CreateFigureForm, FigureForm } from "@/types/figure";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";

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
  const [createFigureForm, setCreateFigureForm] = useState<CreateFigureForm>({
    name: "",
    images: null,
    branchId: "",
    categoryId: "",
    price: 0,
    quantity: 0,
    description: "",
  });

  const { func: createFigure } = useCreateFigure();
  const { func: updateFigure } = useUpdateFigure();
  const { data: comments } = useComments(id);

  function handleSave() {
    if (id !== "new") {
      updateFigure(form);
    } else {
      createFigure(createFigureForm);
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
  const handleCreateChange = (key: keyof CreateFigureForm, value: unknown) =>
    setCreateFigureForm({ ...createFigureForm, [key]: value });

  // --- Khi chọn branch/category ---
  const handleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const branch = branches.find((b) => b.id === e.target.value);
    if (branch) {
      setForm({
        ...form,
        branchId: branch.id,
      });
      setCreateFigureForm({
        ...createFigureForm,
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
      setCreateFigureForm({
        ...createFigureForm,
        categoryId: category.id,
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCreateFigureForm({
        ...createFigureForm,
        images: e.target.files,
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
    <div
      className={`grid gap-6 ${
        comments.length ? "xl:grid-cols-2" : "grid-cols-1"
      }`}
    >
      <div className="max-w-4xl w-full mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-xl font-semibold text-theme-700 mb-4">
          {id ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tên sản phẩm */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Tên sản phẩm
            </label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 text-sm"
              value={id === "new" ? createFigureForm?.name : form?.name}
              onChange={(e) => {
                handleChange("name", e.target.value);
                handleCreateChange("name", e.target.value);
              }}
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
                value={
                  id === "new" ? createFigureForm?.price : form?.price ?? 0
                }
                onChange={(e) => {
                  handleChange("price", Number(e.target.value));
                  handleCreateChange("price", Number(e.target.value));
                }}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Giảm (%)</label>
              <input
                type="number"
                className="w-full border rounded px-3 py-2 text-sm"
                value={
                  (id === "new"
                    ? createFigureForm?.salePercent
                    : form?.salePercent) ?? 0
                }
                onChange={(e) => {
                  handleChange("salePercent", Number(e.target.value));
                  handleCreateChange("salePercent", Number(e.target.value));
                }}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Số lượng</label>
              <input
                type="number"
                className="w-full border rounded px-3 py-2 text-sm"
                value={
                  id === "new" ? createFigureForm?.quantity : form?.quantity
                }
                onChange={(e) => {
                  handleChange("quantity", Number(e.target.value));
                  handleCreateChange("quantity", Number(e.target.value));
                }}
              />
            </div>
          </div>

          {/* Ảnh */}
          {id === "new" ? (
            <div>
              <label className="block text-sm font-medium mb-1">Ảnh</label>
              <input
                type="file"
                multiple
                className="block w-full text-sm text-theme-500 
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-theme-50 file:text-theme-700
                     hover:file:bg-theme-100 cursor-pointer"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="flex flex-wrap gap-4 mb-4 p-4 max-h-96 overflow-auto">
              {form.imgSrc.length > 0 &&
                form.imgSrc.map((src) => (
                  <div key={src} className="relative w-56 h-56 border p-1">
                    <MyImage
                      src={src || "no-image.png"}
                      alt=""
                      fill
                      objectFit="contain"
                      objectPosition="center"
                    />
                    <div
                      className="rounded-full bg-white absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 text-red-500 cursor-pointer"
                      onClick={() =>
                        handleChange(
                          "imgSrc",
                          form.imgSrc.filter((x) => x !== src)
                        )
                      }
                    >
                      <IoIosCloseCircle size={30} />
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* Danh mục + Thương hiệu */}
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Danh mục (Category)
              </label>
              <select
                className="w-full border rounded px-3 py-2 text-sm"
                value={
                  id === "new" ? createFigureForm?.categoryId : form?.categoryId
                }
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
                value={
                  id === "new" ? createFigureForm?.branchId : form?.branchId
                }
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
              value={
                id === "new" ? createFigureForm?.description : form?.description
              }
              handleChange={(value) => {
                handleChange("description", value);
                handleCreateChange("description", value);
              }}
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
      {comments.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Bình luận</h2>
          {comments.map((comment, index) => (
            <Comment
              className="mt-2"
              key={index}
              id={comment.id}
              content={comment.content}
              user={comment.user}
              vote={comment.vote}
              createdAt={comment.createdAt}
            />
          ))}
        </div>
      )}
    </div>
  );
}
