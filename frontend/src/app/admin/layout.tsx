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

type Props = {
  children: ReactNode;
};

const menuItems = [
  { name: "Sản phẩm", icon: <FaBox />, href: "/admin/products" },
  { name: "Đơn hàng", icon: <FaShoppingCart />, href: "/admin/orders" },
  { name: "Người dùng", icon: <FaUsers />, href: "/admin/users" },
  { name: "Thương hiệu", icon: <FaBuilding />, href: "/admin/branchs" },
  { name: "Loại Mô hình", icon: <MdCategory />, href: "/admin/categories" },
  { name: "Quản trị viên", icon: <FaUserShield />, href: "/admin/admins" },
];

export default function AdminLayout({ children }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-theme-50 text-gray-900">
      {/* Sidebar */}
      <aside
        className={`
          'bg-theme-600 text-black flex flex-col transition-all duration-300',
          ${isSidebarOpen ? "w-64" : "w-20"}`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-theme-400">
          {isSidebarOpen && <h1 className="text-lg font-bold">Figure Admin</h1>}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-xl"
          >
            <FaBars />
          </button>
        </div>

        <nav className="flex-1 mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center px-4 py-3 hover:bg-theme-500 transition-all"
            >
              <span className="text-lg">{item.icon}</span>
              {isSidebarOpen && (
                <span className="ml-3 text-sm font-medium">{item.name}</span>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-theme-400 text-sm">
          {isSidebarOpen && <p>© 2025 Figure Admin</p>}
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col">
        <header className="flex items-center justify-between bg-white px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-theme-700">
            Trang quản trị
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Xin chào, Admin!</span>
          </div>
        </header>

        <section className="flex-1 p-6">{children}</section>
      </main>
    </div>
  );
}
