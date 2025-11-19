"use client";

import Link from "next/link";
import { useState } from "react";
import { BiPhoneCall } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa6";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import Logo from "./logo";
import SearchBar from "./search-bar";
import Cart from "./cart";
import { useToken } from "@/hooks/token";

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { token, isAdmin, removeToken } = useToken();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">

          {/* Left: Logo */}
          <Link href="/" className="flex-shrink-0">
            <Logo className="h-12 w-auto transition-transform hover:scale-105" />
          </Link>

          {/* Center: Search Bar */}
          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <SearchBar />
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-6">

            <div className="hidden lg:flex items-center gap-3 text-sm font-medium">
              <div className="p-3 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl">
                <BiPhoneCall className="size-6 text-rose-600" />
              </div>
              <div>
                <p className="text-gray-500">Hotline đặt hàng</p>
                <p className="text-lg font-bold text-gray-900">0123.456.789</p>
              </div>
            </div>

            {/* User Profile / Login */}
            <div className="relative">
              {token ? (
                <div
                  className="flex items-center gap-3 cursor-pointer group"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl transition-all group-hover:scale-110">
                    <CgProfile className="size-6 text-indigo-600" />
                  </div>
                  <div className="hidden lg:block text-right">
                    <p className="text-xs text-gray-500">Xin chào</p>
                    <p className="font-semibold text-gray-900">Tài khoản</p>
                  </div>
                  <IoIosArrowDown className={`size-4 transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-3 group transition-all hover:scale-105"
                >
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl">
                    <FaRegUser className="size-6 text-blue-600" />
                  </div>
                  <div className="hidden lg:block text-right">
                    <p className="text-xs text-gray-500">Chưa đăng nhập</p>
                    <p className="font-semibold text-gray-900 flex items-center gap-1">
                      Đăng nhập <IoIosArrowDown className="size-4" />
                    </p>
                  </div>
                </Link>
              )}

              {/* Dropdown Profile */}
              {isProfileOpen && token && (
                <div className="absolute right-0 top-full mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-5 py-4 hover:bg-rose-50 text-rose-600 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <span className="font-medium">Quản lý tài khoản</span>
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin/admins"
                      className="flex items-center gap-3 px-5 py-4 hover:bg-rose-50 text-rose-600 transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <span className="">Quản trị viên</span>
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      removeToken();
                      setIsProfileOpen(false);
                    }}
                    className="w-full text-left px-5 py-4 hover:bg-red-50 text-red-600 font-medium transition-colors flex items-center gap-3"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>

            {/* Cart */}
            <div className="relative">
              <div
                className="relative flex items-center gap-3 cursor-pointer group transition-all hover:scale-110"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <div className="relative p-3 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl">
                  <HiOutlineShoppingCart className="size-7 text-emerald-600" />
                  {/* Badge số lượng (nếu có) */}
                  <span className="absolute -top-1 -right-1 size-6 bg-rose-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    3
                  </span>
                </div>
                <div className="hidden lg:block">
                  <p className="text-xs text-gray-500">Giỏ hàng</p>
                  <p className="font-bold text-gray-900">2.450.000₫</p>
                </div>
              </div>

              {/* Cart Dropdown */}
              <div
                className={`absolute right-0 top-full mt-4 w-96 ${isCartOpen ? "block" : "hidden"}`}
                onClick={(e) => e.stopPropagation()}
              >
                <Cart className="shadow-2xl rounded-2xl border border-gray-100" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search - hiện khi dưới md */}
        <div className="md:hidden py-4 border-t border-gray-100">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}