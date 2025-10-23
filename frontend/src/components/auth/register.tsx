"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    // Ở đây bạn có thể gọi API để đăng ký thật
    alert("Đăng ký thành công!");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-theme-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-theme-700 mb-6">
          Đăng ký tài khoản
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Họ tên */}
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-1">
              Họ và tên
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập họ và tên..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-theme-300 outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-theme-300 outline-none"
              required
            />
          </div>

          {/* Mật khẩu */}
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-theme-300 outline-none"
              required
            />
          </div>

          {/* Xác nhận mật khẩu */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 mb-1"
            >
              Xác nhận mật khẩu
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Nhập lại mật khẩu..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-theme-300 outline-none"
              required
            />
          </div>

          {/* Nút đăng ký */}
          <button
            type="submit"
            className="w-full bg-theme-400 hover:bg-theme-500 text-white font-semibold py-2 rounded-lg transition"
          >
            Đăng ký
          </button>
        </form>

        {/* Link chuyển sang đăng nhập */}
        <p className="text-center text-gray-600 mt-6 text-sm">
          Đã có tài khoản?{" "}
          <a href="/login" className="text-theme-600 hover:underline">
            Đăng nhập ngay
          </a>
        </p>
      </div>
    </div>
  );
}
