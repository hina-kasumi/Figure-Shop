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
  {
    sort: "hot_desc",
    name: "Phổ biến",
  },
  {
    sort: "price_asc",
    name: "Giá: Tăng dần",
  },
  {
    sort: "price_desc",
    name: "Giá: Giảm dần",
  },
];

export default function CollectionsPage({
  keyword,
  sortBy,
  minPrice,
  maxPrice,
  branchId,
  categoryId,
}: FilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: figures } = useFigures(
    keyword,
    minPrice,
    maxPrice,
    branchId,
    categoryId,
    sortBy
  );
  const { data: branches } = useBranches();
  const { data: categories } = useCategories();

  function handleChangeQuery(key: string, value: string) {
    // Tạo object mới từ URLSearchParams cũ
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);

    // Điều hướng tới URL mới mà không reload trang
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="md:col-span-1 space-y-4">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="font-semibold text-gray-700 mb-3 text-lg">
            Lọc theo giá
          </h3>

          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>0₫</span>
            <span>10.000.000₫</span>
          </div>

          <input
            type="range"
            min="0"
            max="10000000"
            step="500000"
            onChange={(e) => {
              handleChangeQuery("maxPrice", e.target.value);
            }}
            className="w-full accent-theme-400 cursor-pointer"
          />

          <div className="text-center mt-2">
            <span className="text-sm text-gray-600">Giá hiện tại:</span>{" "}
            <span className="font-semibold text-theme-600">
              {maxPrice?.toLocaleString("vi-VN")}₫
            </span>
          </div>
        </div>
        <TickerBox
          title="Thương hiệu"
          curValue={branchId || ""}
          items={branches}
          handleChange={(value) =>
            handleChangeQuery("branchId", value == branchId ? "" : value)
          }
        />
        <TickerBox
          title="Loại"
          curValue={categoryId || ""}
          items={categories}
          handleChange={(value) =>
            handleChangeQuery("categoryId", value == categoryId ? "" : value)
          }
        />
      </div>
      <Box
        className="md:col-span-3 mx-4"
        title="Tât cả sản phẩm"
        advandedTitle={
          <div className="flex items-center gap-4">
            <div>Sắp xếp:</div>
            <div className="flex items-center justify-start gap-2 w-3xs overflow-x-auto p-1">
              {sortList.map((sortItem) => (
                <button
                  key={sortItem.sort}
                  className={`whitespace-nowrap border px-2 py-1 border-gray-200 rounded w-fit cursor-pointer text-gray-700 ${
                    sortBy === sortItem.sort
                      ? "bg-theme-300"
                      : "bg-white hover:bg-gray-100"
                  }`}
                  onClick={() => handleChangeQuery("sortBy", sortItem.sort)}
                >
                  {sortItem.name}
                </button>
              ))}
            </div>
          </div>
        }
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5">
          {figures.map((figure) => (
            <FigureCard key={figure.id} figure={figure} />
          ))}
        </div>
        <Pagination
          className="mt-4"
          totalPages={20}
          currentPage={1}
          onPageChange={(page) => handleChangeQuery("page", page.toString())}
        />
      </Box>
    </div>
  );
}
