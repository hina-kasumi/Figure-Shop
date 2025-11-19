"use client";

import { useFigures } from "@/hooks/figure-hook";
import Link from "next/link";
import { FaAngleDoubleRight } from "react-icons/fa";
import Box from "../ui/box";
import FigureCard from "../ui/figure-card";

export default function HomePage() {
  const { data: figures } = useFigures();

  return (
    <div className="space-y-8 lg:space-y-12">
      {/* HOT PRODUCTS */}
      <Box
        title="HOT PRODUCTS"
        advandedTitle={
          <Link
            href="/collections/hot"
            className="group flex items-center gap-1.5 text-sm font-medium text-rose-600 hover:text-rose-500 transition-colors"
          >
            Xem tất cả
            <FaAngleDoubleRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        }
        className="bg-gradient-to-br from-rose-50 to-pink-50/50 border-rose-200/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
      >
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 p-4 lg:p-6">
          {figures
            ?.filter((_, index) => index < 3)
            .map((figure) => (
              <div
                key={figure.id}
                className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <FigureCard figure={figure} />
                <div className="absolute inset-0 ring-2 ring-rose-400/20 ring-inset opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl" />
              </div>
            ))}
        </div>
      </Box>

      {/* CHARACTER GOODS */}
      <Box
        title="CHARACTER GOODS"
        advandedTitle={
          <Link
            href="/collections/characters"
            className="group flex items-center gap-1.5 text-sm font-medium text-emerald-600 hover:text-emerald-500 transition-colors"
          >
            Xem tất cả
            <FaAngleDoubleRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        }
        className="bg-gradient-to-br from-emerald-50 to-teal-50/50 border-emerald-200/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
      >
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 p-4 lg:p-6">
          {figures
            ?.filter((_, index) => index < 3)
            .map((figure) => (
              <div
                key={figure.id}
                className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <FigureCard figure={figure} />
                <div className="absolute inset-0 ring-2 ring-emerald-400/20 ring-inset opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl" />
              </div>
            ))}
        </div>
      </Box>

      {/* IN STOCK – Full width */}
      <Box
        title="IN STOCK"
        advandedTitle={
          <Link
            href="/collections/all"
            className="group flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            Xem tất cả
            <FaAngleDoubleRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        }
        className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-indigo-200/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 p-5 lg:p-8">
          {figures
            ?.filter((_, index) => index < 10)
            .map((figure, idx) => (
              <div
                key={figure.id}
                className="group relative animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${idx * 70}ms` }}
              >
                <div className="overflow-hidden rounded-xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <FigureCard figure={figure} />
                </div>
                {/* Hiệu ứng viền phát sáng khi hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 rounded-xl" />
              </div>
            ))}
        </div>
      </Box>
    </div>
  );
}