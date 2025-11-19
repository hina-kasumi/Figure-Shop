"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import {
  FaBars,
  FaBox,
  FaBuilding,
  FaShoppingCart,
  FaUsers,
  FaUserShield,
} from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { BiSolidDiscount } from "react-icons/bi";
import { usePathname } from "next/navigation";
import { IoClose } from "react-icons/io5";

type Props = {
  children: ReactNode;
};

const menuItems = [
  { name: "Quản trị viên", icon: <FaUserShield />, href: "/admin/admins" },
  { name: "Sản phẩm", icon: <FaBox />, href: "/admin/products" },
  { name: "Voucher", icon: <BiSolidDiscount />, href: "/admin/vouchers" },
  { name: "Đơn hàng", icon: <FaShoppingCart />, href: "/admin/orders" },
  { name: "Người dùng", icon: <FaUsers />, href: "/admin/users" },
  { name: "Thương hiệu", icon: <FaBuilding />, href: "/admin/branchs" },
  { name: "Loại Mô hình", icon: <MdCategory />, href: "/admin/categories" },
];

export default function AdminLayout({ children }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-gradient-to-b from-indigo-600 via-theme-600 to-theme-600 text-white shadow-2xl transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-72" : "w-20"
        }`}
      >
        {/* Logo & Toggle */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
              <FaBox className="size-7" />
            </div>
            {isSidebarOpen && (
              <h1 className="text-2xl font-bold tracking-tight">Figure Admin</h1>
            )}
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isSidebarOpen ? <IoClose className="size-6" /> : <FaBars className="size-6" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {menuItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-white/20 shadow-lg font-bold text-white"
                    : "hover:bg-white/10 text-white/90"
                }`}
              >
                <span className={`p-2 rounded-lg ${isActive ? "bg-white/30" : "bg-white/10"}`}>
                  {item.icon}
                </span>
                {isSidebarOpen && (
                  <span className="text-sm font-medium tracking-wide">{item.name}</span>
                )}
                {!isSidebarOpen && (
                  <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-5 border-t border-white/10 text-center text-xs opacity-70">
          {isSidebarOpen && (
            <>
              <p>© 2025 Figure Shop</p>
              <p className="mt-1">Phiên bản 2.0</p>
            </>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-72" : "ml-20"}`}>
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-8 py-5">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-theme-600 bg-clip-text text-transparent">
              Trang quản trị
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-gradient-to-br from-theme-500 to-theme-500 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Xin chào,</p>
                  <p className="font-bold text-gray-900">Quản trị viên</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8 bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}