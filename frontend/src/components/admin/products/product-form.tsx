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
import { IoIosCloseCircle, IoMdCloudUpload } from "react-icons/io";
import { FaSave, FaTimes, FaTrash } from "react-icons/fa";

export default function ProductFormPage({ id }: { id: string }) {
  const router = useRouter();
  const isNew = id === "new";

  const { data: figureDetail } = useFigureDetail(id);
  const { data: categories = [] } = useCategories();
  const { data: branches = [] } = useBranches();
  const { data: comments = [] } = useComments(id);
  const { func: createFigure } = useCreateFigure();
  const { func: updateFigure } = useUpdateFigure();

  const [form, setForm] = useState<FigureForm>({
    id: undefined,
    name: "",
    imgSrc: [],
    branchId: "",
    categoryId: "",
    price: 0,
    quantity: 0,
    description: "",
    salePercent: 0,
  });

  const [createFigureForm, setCreateFigureForm] = useState<CreateFigureForm>({
    name: "",
    images: null,
    branchId: "",
    categoryId: "",
    price: 0,
    quantity: 0,
    description: "",
    salePercent: 0,
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Sync form khi edit
  useEffect(() => {
    if (figureDetail && !isNew) {
      setForm({ ...figureDetail });
    }
  }, [figureDetail, isNew]);

  // Handle input change
  const handleChange = (key: keyof FigureForm, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleCreateChange = (key: keyof CreateFigureForm, value: unknown) =>
    setCreateFigureForm((prev) => ({ ...prev, [key]: value }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(files);
      setCreateFigureForm((prev) => ({ ...prev, images: e.target.files }));
    }
  };

  const handleSave = () => {
    if (!isNew) {
      updateFigure(form);
    } else {
      createFigure(createFigureForm);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSave();
    alert(isNew ? "Thêm sản phẩm thành công!" : "Cập nhật sản phẩm thành công!");
    router.push("/admin/products");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="xl:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6 text-white">
                <h1 className="text-3xl font-bold">
                  {isNew ? "Thêm sản phẩm mới" : "Chỉnh sửa sản phẩm"}
                </h1>
                <p className="mt-2 opacity-90">
                  {isNew ? "Tạo sản phẩm mới cho cửa hàng" : `ID: #${id}`}
                </p>
              </div>

              <div className="p-8 space-y-8">
                {/* Tên sản phẩm */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tên sản phẩm</label>
                  <input
                    type="text"
                    required
                    value={isNew ? createFigureForm.name : form.name}
                    onChange={(e) => {
                      handleChange("name", e.target.value);
                      handleCreateChange("name", e.target.value);
                    }}
                    className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all text-lg font-medium"
                    placeholder="Nendoroid Hatsune Miku: Symphony 2024 Ver."
                  />
                </div>

                {/* Giá, Giảm giá, Số lượng */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Giá gốc (₫)</label>
                    <input
                      type="number"
                      required
                      value={isNew ? createFigureForm.price : form.price}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        handleChange("price", val);
                        handleCreateChange("price", val);
                      }}
                      className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all text-xl font-bold text-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Giảm giá (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="99"
                      value={isNew ? createFigureForm.salePercent ?? 0 : form.salePercent ?? 0}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        handleChange("salePercent", val);
                        handleCreateChange("salePercent", val);
                      }}
                      className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-4 focus:ring-rose-200 focus:border-rose-500 transition-all text-xl font-bold text-rose-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Số lượng tồn</label>
                    <input
                      type="number"
                      required
                      value={isNew ? createFigureForm.quantity : form.quantity}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        handleChange("quantity", val);
                        handleCreateChange("quantity", val);
                      }}
                      className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-200 focus:border-emerald-500 transition-all text-xl font-bold text-emerald-600"
                    />
                  </div>
                </div>

                {/* Ảnh sản phẩm */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    {isNew ? "Tải lên ảnh sản phẩm" : "Ảnh hiện tại"}
                  </label>

                  {isNew ? (
                    <div className="border-2 border-dashed border-indigo-300 rounded-2xl p-10 text-center hover:border-indigo-500 transition-all cursor-pointer bg-indigo-50/50">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <IoMdCloudUpload className="mx-auto size-16 text-indigo-500 mb-4" />
                        <p className="text-lg font-medium text-gray-700">Kéo thả hoặc click để tải ảnh</p>
                        {selectedFiles.length > 0 && (
                          <p className="mt-3 text-sm text-indigo-600 font-semibold">
                            Đã chọn {selectedFiles.length} ảnh
                          </p>
                        )}
                      </label>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {form.imgSrc?.map((src) => (
                        <div key={src} className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                          <MyImage src={src} alt="" fill className="object-contain bg-gray-50" />
                          <button
                            type="button"
                            onClick={() => handleChange("imgSrc", form.imgSrc.filter(x => x !== src))}
                            className="absolute top-3 right-3 p-2 bg-red-500/90 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <FaTrash className="size-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Danh mục & Thương hiệu */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Thương hiệu</label>
                    <select
                      value={isNew ? createFigureForm.branchId : form.branchId}
                      onChange={(e) => {
                        handleChange("branchId", e.target.value);
                        handleCreateChange("branchId", e.target.value);
                      }}
                      className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all"
                    >
                      <option value="">-- Chọn thương hiệu --</option>
                      {branches.map(b => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Loại sản phẩm</label>
                    <select
                      value={isNew ? createFigureForm.categoryId : form.categoryId}
                      onChange={(e) => {
                      handleChange("categoryId", e.target.value);
                      handleCreateChange("categoryId", e.target.value);
                      }}
                      className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all"
                    >
                      <option value="">-- Chọn loại --</option>
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Mô tả */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Mô tả chi tiết</label>
                  <DescriptionInput
                    value={isNew ? createFigureForm.description : form.description}
                    handleChange={(value) => {
                      handleChange("description", value);
                      handleCreateChange("description", value);
                    }}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex items-center gap-3 px-8 py-4 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold transition-all"
                  >
                    <FaTimes /> Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    onClick={handleSave}
                    className="flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all"
                  >
                    <FaSave /> {isNew ? "Tạo sản phẩm" : "Cập nhật"}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Sidebar: Bình luận */}
          {comments.length > 0 && (
            <div className="xl:col-span-1">
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden sticky top-8">
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-6 text-white">
                  <h2 className="text-2xl font-bold">Bình luận khách hàng</h2>
                  <p className="opacity-90">{comments.length} đánh giá</p>
                </div>
                <div className="p-6 space-y-6 max-h-screen overflow-y-auto">
                  {comments.map((comment, i) => (
                    <Comment
                      key={comment.id}
                      id={comment.id}
                      content={comment.content}
                      user={comment.user}
                      vote={comment.vote}
                      createdAt={comment.createdAt}
                      className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-5 border border-pink-100"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}