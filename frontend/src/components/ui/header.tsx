"use client";

import Link from "next/link";
import { useState } from "react";
import { BiPhoneCall } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa6";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import Logo from "./logo";
import SearchBar from "./search-bar";
import Cart from "./cart";

export default function Header() {
  const [items] = useState(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="">
      <div className="flex justify-center items-center gap-3 py-1.5 bg-theme-400 text-background">
        <Link href="/" className="w-fit">
          <Logo />
        </Link>
        <SearchBar />
        <div className="flex gap-4">
          <div className="hidden lg:flex items-center gap-2">
            <BiPhoneCall size={30} />
            <div className="text-sm">
              <p>Hotline</p>
              <p>0123456789</p>
            </div>
          </div>
          <Link
            href="/login"
            className="flex items-center gap-2 cursor-pointer"
          >
            <FaRegUser size={30} />
            <div className="hidden lg:block text-sm">
              <p>Đăng nhập</p>
              <p className="flex items-center gap-1">
                Đăng ký
                <IoIosArrowDown />
              </p>
            </div>
          </Link>
          <div
            className="md:relative flex items-center gap-2 cursor-pointer p-2 rounded-xl border-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="relative">
              <HiOutlineShoppingCart size={30} />
              <div className="absolute flex items-center justify-center right-0 top-0 h-4 w-4 bg-red-600 p-1 text-xs rounded-full">
                {items}
              </div>
            </div>
            <div className="hidden lg:block text-xl">Giỏ hàng</div>
            <div onClick={(e) => e.stopPropagation()}>
              <Cart
                className={`absolute right-0 z-10 w-full md:top-full md:w-xl ${
                  isOpen ? "" : "hidden"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
