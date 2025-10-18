"use client";

import Link from "next/link";
import { AiOutlineProduct } from "react-icons/ai";
import { CiGift } from "react-icons/ci";
import { MdOutlineLocalPolice } from "react-icons/md";
import ImagesScroll from "./images-scroll";

const size = 24;
const items = [
  {
    icon: <CiGift size={size} />,
    name: "NEW RELEASES !!!",
    link: "/collections",
  },
  {
    icon: <AiOutlineProduct size={size} />,
    name: "ALL PRODUCTS",
    link: "/collections",
  },
  {
    icon: <MdOutlineLocalPolice size={size} />,
    name: "Khách hàng thân thiết",
    link: "/",
  },
];

const banners = [
  "https://file.hstatic.net/200000462939/file/freeshipping.jpg",
  "https://file.hstatic.net/200000462939/file/figure_san_ship_ngay.jpg",
];

interface SliderProps {
  className?: string;
}

export default function Slider({ className }: SliderProps) {
  return (
    <div className={`${className} pb-4 flex`}>
      <div className="hidden md:block w-[20vw] min-w-16 border bg-background border-gray-300 shadow-md">
        {items.map((item) => (
          <Link
            href={item.link}
            key={item.name}
            className="flex items-center gap-2 p-2 hover:text-theme-400 hover:text-background transition-all"
          >
            <div>{item.icon}</div>
            <div>{item.name}</div>
          </Link>
        ))}
      </div>
      <ImagesScroll
        className="flex-1 ml-4 mt-4"
        images={banners}
      />
    </div>
  );
}
