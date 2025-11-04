"use client";

import { FigureCardInformation } from "@/types/figure";
import FigureCard from "../ui/figure-card";
import { FaAngleDoubleRight } from "react-icons/fa";
import Box from "../ui/box";
import Link from "next/link";

const figures: FigureCardInformation[] = [
  {
    id: "1",
    name: "Violet Evergarden 1/7 - Violet Evergarden | Apex Innovation Figure",
    imgSrc: [
      "https://cdn.hstatic.net/products/200000462939/i__character_hobby_shop__chocopuni_plushie_tv_anime_the_apothecary_dia_fec592dbbb56413e80f175d9f64f8a59_master.jpg",
    ],
    branch: "Apex Innovation",
    category: "Figure",
    status: "In Stock",
    price: 29.99,
    salePercent: 2,
    vote: 4.5,
    tags: ["anime", "manga"],
    quantity: 10,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-02T00:00:00Z",
  },
  {
    id: "2",
    name: "Violet Evergarden 1/7 - Violet Evergarden | Apex Innovation Figure",
    imgSrc: [
      "https://cdn.hstatic.net/products/200000462939/i__character_hobby_shop__chocopuni_plushie_tv_anime_the_apothecary_dia_fec592dbbb56413e80f175d9f64f8a59_master.jpg",
    ],
    branch: "Apex Innovation",
    category: "Figure",
    status: "In Stock",
    price: 29.99,
    salePercent: 0,
    vote: 4.5,
    tags: ["anime", "manga"],
    quantity: 0,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-02T00:00:00Z",
  },
  {
    id: "3",
    name: "Violet Evergarden 1/7 - Violet Evergarden | Apex Innovation Figure",
    imgSrc: [
      "https://cdn.hstatic.net/products/200000462939/i__character_hobby_shop__chocopuni_plushie_tv_anime_the_apothecary_dia_fec592dbbb56413e80f175d9f64f8a59_master.jpg",
    ],
    branch: "Apex Innovation",
    category: "Figure",
    status: "In Stock",
    price: 29.99,
    salePercent: 0,
    vote: 4.5,
    tags: ["anime", "manga"],
    quantity: 10,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-02T00:00:00Z",
  },
];

export default function HomePage() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Box
        title="HOT PRODUCTS"
        advandedTitle={
          <Link href="/" className="flex items-center gap-1 text-sm">
            Xem tất cả <FaAngleDoubleRight />
          </Link>
        }
      >
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5">
          {figures.map((figure) => (
            <FigureCard key={figure.id} figure={figure} />
          ))}
        </div>
      </Box>
      <Box
        title="CHARACTER GOODS"
        advandedTitle={
          <Link href="/" className="flex items-center gap-1 text-sm">
            Xem tất cả <FaAngleDoubleRight />
          </Link>
        }
      >
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5">
          {figures.map((figure) => (
            <FigureCard key={figure.id} figure={figure} />
          ))}
        </div>
      </Box>
      <Box
        title="IN STOCK"
        advandedTitle={
          <Link href="/" className="flex items-center gap-1 text-sm">
            Xem tất cả <FaAngleDoubleRight />
          </Link>
        }
        className="md:col-span-2"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5">
          {figures.map((figure) => (
            <FigureCard key={figure.id} figure={figure} />
          ))}
        </div>
      </Box>
    </div>
  );
}
