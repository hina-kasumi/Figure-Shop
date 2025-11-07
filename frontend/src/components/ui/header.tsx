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
import { useToken } from "@/hooks/token";
import { CgProfile } from "react-icons/cg";

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const { token, isAdmin, removeToken } = useToken();

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
          {token ? (
            <div className="relative flex items-center">
              <CgProfile
                size={30}
                className="cursor-pointer"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              />
              {isProfileOpen && (
                <div className="absolute grid text-center top-full rounded right-0 z-10 bg-white w-48 border shadow text-black overflow-hidden cursor-pointer">
                  <Link
                    href="/profile"
                    className="px-4 py-2 hover:bg-theme-100"
                  >
                    Quản lý tài khoản
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin/admins"
                      className="px-4 py-2 hover:bg-theme-100"
                    >
                      Quản trị viên
                    </Link>
                  )}
                  <button
                    onClick={removeToken}
                    className="px-4 py-2 hover:bg-theme-100 cursor-pointer"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
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
          )}
          <div
            className="md:relative flex items-center gap-2 cursor-pointer p-2 rounded-xl border-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="relative">
              <HiOutlineShoppingCart size={30} />
            </div>
            <div className="hidden lg:block text-xl">Giỏ hàng</div>
            <div onClick={(e) => e.stopPropagation()}>
              <Cart
                className={`absolute right-0 z-10 w-full md:top-full md:w-xl cursor-default ${
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
