"use client";

import { FigureCardInformation } from "@/types/figure";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Box from "../ui/box";
import FigureCard from "../ui/figure-card";
import Pagination from "../ui/pagination";
import TickerBox from "../ui/ticker-box";

const branchs = [
  {
    id: "1",
    name: "Bandai",
  },
  {
    id: "2",
    name: "Good Smile Company",
  },
  {
    id: "3",
    name: "Kotobukiya",
  },
  {
    id: "4",
    name: "Max Factory",
  },
  {
    id: "5",
    name: "Aniplex",
  },
  {
    id: "6",
    name: "Alter",
  },
];

const figures: FigureCardInformation[] = [
  {
    id: "1",
    name: "Violet Evergarden 1/7 - Violet Evergarden | Apex Innovation Figure",
    images: [
      "https://cdn.hstatic.net/products/200000462939/i__character_hobby_shop__chocopuni_plushie_tv_anime_the_apothecary_dia_fec592dbbb56413e80f175d9f64f8a59_master.jpg",
    ],
    status: "In Stock",
    branch: "Apex Innovation",
    category: "Figure",
    price: 29.99,
    salePercent: 2,
    rating: 4.5,
    tags: ["anime", "manga"],
    quantity: 10,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-02T00:00:00Z",
  },
  {
    id: "2",
    name: "Violet Evergarden 1/7 - Violet Evergarden | Apex Innovation Figure",
    images: [
      "https://cdn.hstatic.net/products/200000462939/i__character_hobby_shop__chocopuni_plushie_tv_anime_the_apothecary_dia_fec592dbbb56413e80f175d9f64f8a59_master.jpg",
    ],
    status: "In Stock",
    branch: "Apex Innovation",
    category: "Figure",
    price: 29.99,
    salePercent: 0,
    rating: 4.5,
    tags: ["anime", "manga"],
    quantity: 0,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-02T00:00:00Z",
  },
  {
    id: "3",
    name: "Violet Evergarden 1/7 - Violet Evergarden | Apex Innovation Figure",
    images: [
      "https://cdn.hstatic.net/products/200000462939/i__character_hobby_shop__chocopuni_plushie_tv_anime_the_apothecary_dia_fec592dbbb56413e80f175d9f64f8a59_master.jpg",
    ],
    status: "In Stock",
    branch: "Apex Innovation",
    category: "Figure",
    price: 29.99,
    salePercent: 0,
    rating: 4.5,
    tags: ["anime", "manga"],
    quantity: 10,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-02T00:00:00Z",
  },
];

const sortList = [
  {
    sort: "hot",
    name: "Phổ biến",
  },
  {
    sort: "newest",
    name: "Mới nhất",
  },
  {
    sort: "price_asc",
    name: "Giá: Tăng dần",
  },
  {
    sort: "price_desc",
    name: "Giá: Giảm dần",
  },
  {
    sort: "a_z",
    name: "A-Z",
  },
  {
    sort: "z_a",
    name: "Z-A",
  },
];

export default function CollectionsPage() {
  const [ticked, setTicked] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const page = parseInt(searchParams.get("page") || "1", 10);

  function handlePageChange(newPage: number) {
    // Tạo object mới từ URLSearchParams cũ
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());    

    // Điều hướng tới URL mới mà không reload trang
    router.push(`${pathname}?${params.toString()}`);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    if (checked) {
      setTicked([...ticked, value]);
    } else {
      setTicked(ticked.filter((tick) => tick !== value));
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="md:col-span-1 space-y-4">
        <TickerBox title="Nhãn" items={branchs} handleChange={handleChange} />
        <TickerBox
          title="Thương hiệu"
          items={branchs}
          handleChange={handleChange}
        />
        <TickerBox
          title="Lọc giá"
          items={branchs}
          handleChange={handleChange}
        />
        <TickerBox title="Loại " items={branchs} handleChange={handleChange} />
      </div>
      <Box
        className="md:col-span-3 mx-4"
        title="Tât cả sản phẩm"
        advandedTitle={
          <div className="flex items-center gap-4">
            <div>Sắp xếp:</div>
            <div className="flex items-center justify-start gap-2 w-3xs overflow-x-auto p-1">
              {sortList.map((sortItem) => (
                <div
                  key={sortItem.sort}
                  className="whitespace-nowrap border px-2 py-1 border-gray-200 rounded w-fit"
                >
                  {sortItem.name}
                </div>
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
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </Box>
    </div>
  );
}
