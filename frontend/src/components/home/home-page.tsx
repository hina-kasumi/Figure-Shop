"use client";

import { useFigures } from "@/hooks/figure-hook";
import Link from "next/link";
import { FaAngleDoubleRight } from "react-icons/fa";
import Box from "../ui/box";
import FigureCard from "../ui/figure-card";

export default function HomePage() {
  const { data: figures } = useFigures();

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
          {figures
            .filter((_, index) => index < 3)
            .map((figure) => (
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
          {figures
            .filter((_, index) => index < 3)
            .map((figure) => (
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
          {figures
            .filter((_, index) => index < 10)
            .map((figure) => (
              <FigureCard key={figure.id} figure={figure} />
            ))}
        </div>
      </Box>
    </div>
  );
}
