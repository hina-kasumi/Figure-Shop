"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@example.com" && password === "123456") {
      alert("Đăng nhập thành công!");
      router.push("/");
    } else {
      alert("Sai email hoặc mật khẩu!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-theme-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-theme-700 mb-6">
          Đăng nhập
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
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

          <div className="text-right">
            <a href="#" className="text-sm text-theme-600 hover:underline">
              Quên mật khẩu?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-theme-400 hover:bg-theme-500 text-white font-semibold py-2 rounded-lg transition"
          >
            Đăng nhập
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Chưa có tài khoản?{" "}
          <a href="/register" className="text-theme-600 hover:underline">
            Đăng ký ngay
          </a>
        </p>
      </div>
    </div>
  );
}
