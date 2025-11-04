"use client";

import { useBranch, useBranches } from "@/hooks/figure-hook";
import { useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

export default function BranchsPage() {
  const { data: branches, isLoading, reload } = useBranches();
  const { createBranch, deleteBranch, updateBranch } = useBranch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<{
    id?: string;
    name: string;
  }>({ name: "" });

  // Mở popup thêm mới
  const openAddModal = () => {
    setEditingBranch({ name: "" });
    setIsModalOpen(true);
  };

  // Mở popup sửa
  const openEditModal = (branch: { id: string; name: string }) => {
    setEditingBranch({ id: branch.id, name: branch.name });
    setIsModalOpen(true);
  };

  // Đóng modal
  const closeModal = () => setIsModalOpen(false);

  // Xử lý lưu (thêm hoặc sửa)
  const handleSave = async () => {
    if (!editingBranch.name.trim())
      return alert("Vui lòng nhập tên thương hiệu!");

    try {
      if (editingBranch.id) {
        await updateBranch(editingBranch.id, editingBranch.name);
      } else {
        await createBranch(editingBranch.name);
      }
      alert("Lưu thành công!");
      setIsModalOpen(false);
      reload();
    } catch {
      alert("Có lỗi xảy ra khi lưu thương hiệu.");
    }
  };

  // Xóa thương hiệu
  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc muốn xóa thương hiệu này không?")) {
      try {
        await deleteBranch(id);
        alert("Đã xóa thành công!");
        reload();
      } catch {
        alert("Lỗi khi xóa thương hiệu!");
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-theme-700">
          Quản lý thương hiệu
        </h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-theme-600 text-white px-3 py-2 rounded text-sm hover:opacity-90"
        >
          <FaPlus /> Thêm thương hiệu
        </button>
      </div>

      {/* Danh sách */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 text-sm">
          <thead className="bg-theme-100">
            <tr>
              <th className="p-3 border-b text-center w-16">#</th>
              <th className="p-3 border-b text-left">Tên thương hiệu</th>
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
            ) : branches.length > 0 ? (
              branches.map((b, idx) => (
                <tr key={b.id} className="hover:bg-theme-50 transition">
                  <td className="p-3 border-b text-center">{idx + 1}</td>
                  <td className="p-3 border-b">{b.name}</td>
                  <td className="p-3 border-b text-center space-x-2">
                    <button
                      onClick={() => openEditModal(b)}
                      className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                    >
                      <FaEdit /> Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(b.id)}
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
                  Chưa có thương hiệu nào.
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
              {editingBranch.id ? "Sửa thương hiệu" : "Thêm thương hiệu"}
            </h2>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-4"
              placeholder="Nhập tên thương hiệu..."
              value={editingBranch.name}
              onChange={(e) =>
                setEditingBranch((prev) => ({ ...prev, name: e.target.value }))
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
