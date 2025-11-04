"use client";

import {
  useCategories,
  useDeleteFigure,
  useFigures,
} from "@/hooks/figure-hook";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FaEdit, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function ProductListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { nameOfCategory, data: categories } = useCategories();
  const { func: deleteFigure } = useDeleteFigure();

  // Lấy các query param hiện tại
  const keyword = searchParams.get("keyword") || "";
  const sortBy =
    (searchParams.get("sortBy") as
      | "hot_desc"
      | "price_asc"
      | "price_desc"
      | null) || undefined;
  const minPrice = searchParams.get("minPrice")
    ? Number(searchParams.get("minPrice"))
    : undefined;
  const maxPrice = searchParams.get("maxPrice")
    ? Number(searchParams.get("maxPrice"))
    : undefined;
  const branchId = searchParams.get("branchId") || undefined;
  const categoryId = searchParams.get("categoryId") || undefined;

  // Fetch data
  const { data: products, isLoading } = useFigures(
    keyword,
    minPrice,
    maxPrice,
    branchId,
    categoryId,
    sortBy
  );

  //  Cập nhật query mà không reload
  const handleChangeQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  //  Debounce keyword để tránh fetch quá nhiều khi gõ
  const [searchValue, setSearchValue] = useState(keyword);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchValue !== keyword) {
        handleChangeQuery("keyword", searchValue);
      }
    }, 500);
    return () => clearTimeout(delay);
  }, [searchValue]);

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-theme-700">
          Quản lý sản phẩm
        </h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-theme-600 text-white px-3 py-2 rounded text-sm hover:opacity-90"
        >
          <FaPlus /> Thêm sản phẩm
        </Link>
      </div>

      {/* Bộ lọc */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {/* Search */}
        <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="flex-1 outline-none text-sm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        {/* Sort */}
        <select
          className="border border-gray-300 rounded px-3 py-2 text-sm"
          value={sortBy || ""}
          onChange={(e) => handleChangeQuery("sortBy", e.target.value)}
        >
          <option value="">Sắp xếp</option>
          <option value="hot_desc">Bán chạy</option>
          <option value="price_asc">Giá tăng dần</option>
          <option value="price_desc">Giá giảm dần</option>
        </select>

        {/* Giá tối thiểu */}
        <input
          type="number"
          placeholder="Giá thấp nhất"
          className="border border-gray-300 rounded px-3 py-2 text-sm"
          value={minPrice ?? ""}
          onChange={(e) => handleChangeQuery("minPrice", e.target.value)}
        />

        {/* Giá tối đa */}
        <input
          type="number"
          placeholder="Giá cao nhất"
          className="border border-gray-300 rounded px-3 py-2 text-sm"
          value={maxPrice ?? ""}
          onChange={(e) => handleChangeQuery("maxPrice", e.target.value)}
        />

        {/* Danh mục */}
        <select
          className="border border-gray-300 rounded px-3 py-2 text-sm"
          value={categoryId || ""}
          onChange={(e) => handleChangeQuery("categoryId", e.target.value)}
        >
          <option value="">Tất cả danh mục</option>
          {categories?.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 text-sm">
          <thead className="bg-theme-100">
            <tr>
              <th className="p-3 border-b">Hình</th>
              <th className="p-3 border-b text-left">Tên</th>
              <th className="p-3 border-b">Danh mục</th>
              <th className="p-3 border-b">Giá</th>
              <th className="p-3 border-b">Giảm (%)</th>
              <th className="p-3 border-b">Vote</th>
              <th className="p-3 border-b">Số lượng</th>
              <th className="p-3 border-b text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="text-center p-4">
                  Đang tải sản phẩm...
                </td>
              </tr>
            ) : products.length > 0 ? (
              products.map((p) => (
                <tr key={p.id} className="hover:bg-theme-50 transition">
                  <td className="p-3 border-b text-center">
                    <Image
                      src={p?.imgSrc[0] || "/placeholder.png"}
                      alt={p.name}
                      width={48}
                      height={48}
                      className="rounded object-cover"
                    />
                  </td>
                  <td className="p-3 border-b">{p.name}</td>
                  <td className="p-3 border-b text-center">
                    {p.category?.name || nameOfCategory(p.categoryId)}
                  </td>
                  <td className="p-3 border-b text-center">
                    {p.price.toLocaleString()} ₫
                  </td>
                  <td className="p-3 border-b text-center">
                    {p.salePercent ?? 0}%
                  </td>
                  <td className="p-3 border-b text-center">{p.vote}</td>
                  <td className="p-3 border-b text-center">{p.quantity}</td>
                  <td className="p-3 border-b text-center">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                    >
                      <FaEdit /> Sửa
                    </Link>
                    <button
                      onClick={async () => {
                        if (
                          confirm(
                            `Bạn có chắc muốn xóa sản phẩm "${p.name}" không?`
                          )
                        ) {
                          deleteFigure(p.id).then(() => {
                            alert("Đã xóa sản phẩm!");
                            router.refresh();
                          });
                        }
                      }}
                      className="ml-4 text-red-600 hover:text-red-800 inline-flex items-center gap-1"
                    >
                      <FaTrash />
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center text-gray-500 p-4">
                  Không có sản phẩm nào phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
