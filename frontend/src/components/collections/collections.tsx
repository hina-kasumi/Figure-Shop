"use client";

import { useBranches, useCategories, useFigures } from "@/hooks/figure-hook";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Box from "../ui/box";
import FigureCard from "../ui/figure-card";
import Pagination from "../ui/pagination";
import TickerBox from "../ui/ticker-box";

interface FilterProps {
  keyword?: string;
  sortBy?: "hot_desc" | "price_asc" | "price_desc";
  minPrice?: number;
  maxPrice?: number;
  branchId?: string;
  categoryId?: string;
}

const sortList = [
  { sort: "hot_desc" as const, name: "Phổ biến" },
  { sort: "price_asc" as const, name: "Giá: Thấp → Cao" },
  { sort: "price_desc" as const, name: "Giá: Cao → Thấp" },
];

export default function CollectionsPage({
  keyword,
  sortBy = "hot_desc",
  minPrice,
  maxPrice,
  branchId,
  categoryId,
}: FilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: figures = [] } = useFigures(
    keyword,
    minPrice,
    maxPrice,
    branchId,
    categoryId,
    sortBy
  );
  const { data: branches = [] } = useBranches();
  const { data: categories = [] } = useCategories();

  function handleChangeQuery(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === "0") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const formatPrice = (price?: number) =>
    price ? price.toLocaleString("vi-VN") + "₫" : "Không giới hạn";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 max-w-screen-2xl mx-auto px-4 py-8">
      {/* Sidebar - Bộ lọc */}
      <aside className="space-y-6">
        {/* Lọc theo giá*/}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
          <h3 className="font-bold text-lg text-gray-800 mb-5">Lọc theo giá</h3>

          <input
            type="range"
            min="0"
            max="10000000"
            step="100000"
            value={maxPrice || 10000000}
            onChange={(e) => handleChangeQuery("maxPrice", e.target.value)}
            className="w-full h-3 bg-gray-200 rounded-full cursor-pointer accent-indigo-600"
            style={{
              background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${(maxPrice || 10000000) / 100000}%, #e5e7eb ${(maxPrice || 10000000) / 100000}%, #e5e7eb 100%)`,
            }}
          />

          <div className="flex justify-between text-xs text-gray-500 mt-3">
            <span>0₫</span>
            <span>10.000.000₫</span>
          </div>

          <div className="mt-4 text-center bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl py-3">
            <span className="text-sm text-gray-600">Giá tối đa: </span>
            <span className="text-xl font-bold text-indigo-600">
              {formatPrice(maxPrice)}
            </span>
          </div>
        </div>

        <TickerBox
          title="Thương hiệu"
          curValue={branchId || ""}
          items={branches}
          handleChange={(value) =>
            handleChangeQuery("branchId", branchId === value ? "" : value)
          }
        />

        <TickerBox
          title="Loại sản phẩm"
          curValue={categoryId || ""}
          items={categories}
          handleChange={(value) =>
            handleChangeQuery("categoryId", categoryId === value ? "" : value)
          }
        />
      </aside>

      {/* Main - Danh sách sản phẩm */}
      <div className="lg:col-span-3">
        <Box
          title="Tất cả sản phẩm"
          advandedTitle={
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <span className="text-sm text-gray-600">Sắp xếp:</span>
              <div className="flex gap-2 flex-wrap">
                {sortList.map((item) => (
                  <button
                    key={item.sort}
                    onClick={() => handleChangeQuery("sortBy", item.sort)}
                    className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                      sortBy === item.sort
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                        : "bg-white text-gray-700 border border-gray-300 hover:border-indigo-400 hover:bg-indigo-50"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          }
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
        >
          {figures.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6 lg:p-8">
              {figures.map((figure, index) => (
                <div
                  key={figure.id}
                  className="group"
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100">
                    <FigureCard figure={figure} />
                    {/* Hiệu ứng phát sáng khi hover */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-gray-500 text-lg font-medium">
                Không tìm thấy sản phẩm nào
              </p>
            </div>
          )}

          <div className="px-6 pb-8 pt-4">
            <Pagination
              totalPages={20}
              currentPage={1}
              onPageChange={(page) => handleChangeQuery("page", page.toString())}
              className="justify-center"
            />
          </div>
        </Box>
      </div>
    </div>
  );
}