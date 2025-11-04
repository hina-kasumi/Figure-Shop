"use client";

import { useState } from "react";
import { useCategories, useCategory } from "@/hooks/figure-hook";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

export default function CategoriesPage() {
  const { data: categories, isLoading, reload } = useCategories();
  const { createCategory, deleteCategory, updateCategory } = useCategory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<{ id?: string; name: string }>({
    name: "",
  });

  // Mở popup thêm mới
  const openAddModal = () => {
    setEditingCategory({ name: "" });
    setIsModalOpen(true);
  };

  // Mở popup sửa
  const openEditModal = (category: { id: string; name: string }) => {
    setEditingCategory({ id: category.id, name: category.name });
    setIsModalOpen(true);
  };

  // Đóng modal
  const closeModal = () => setIsModalOpen(false);

  // Xử lý lưu (thêm hoặc sửa)
  const handleSave = async () => {
    if (!editingCategory.name.trim()) return alert("Vui lòng nhập tên danh mục!");

    try {
      if (editingCategory.id) {
        await updateCategory(editingCategory.id, editingCategory.name);
      } else {
        await createCategory(editingCategory.name);
      }
      alert("Lưu thành công!");
      setIsModalOpen(false);
      reload();
    } catch {
      alert("Có lỗi xảy ra khi lưu danh mục.");
    }
  };

  // Xóa danh mục
  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc muốn xóa danh mục này không?")) {
      try {
        await deleteCategory(id);
        alert("Đã xóa thành công!");
        reload();
      } catch {
        alert("Lỗi khi xóa danh mục!");
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-theme-700">Quản lý danh mục</h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-theme-600 text-white px-3 py-2 rounded text-sm hover:opacity-90"
        >
          <FaPlus /> Thêm danh mục
        </button>
      </div>

      {/* Danh sách */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 text-sm">
          <thead className="bg-theme-100">
            <tr>
              <th className="p-3 border-b text-center w-16">#</th>
              <th className="p-3 border-b text-left">Tên danh mục</th>
              <th className="p-3 border-b text-center w-32">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={3} className="text-center p-4">
                  Đang tải...
                </td>
              </tr>
            ) : categories.length > 0 ? (
              categories.map((c, idx) => (
                <tr key={c.id} className="hover:bg-theme-50 transition">
                  <td className="p-3 border-b text-center">{idx + 1}</td>
                  <td className="p-3 border-b">{c.name}</td>
                  <td className="p-3 border-b text-center space-x-2">
                    <button
                      onClick={() => openEditModal(c)}
                      className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                    >
                      <FaEdit /> Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="text-red-600 hover:text-red-800 inline-flex items-center gap-1"
                    >
                      <FaTrash /> Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center text-gray-500 p-4">
                  Chưa có danh mục nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal popup */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              {editingCategory.id ? "Sửa danh mục" : "Thêm danh mục"}
            </h2>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-4"
              placeholder="Nhập tên danh mục..."
              value={editingCategory.name}
              onChange={(e) =>
                setEditingCategory((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm border rounded hover:bg-gray-100"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm bg-theme-600 text-white rounded hover:opacity-90"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
