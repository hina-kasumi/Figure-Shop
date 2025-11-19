"use client";

import { useFigureReports, useUserReports } from "@/hooks/report-hook";
import { UserStatus } from "@/types/user";

export default function AdminsPage() {
  const {
    reports: figures,
    isLoading: loadingFigures,
    error: figureError,
  } = useFigureReports();

  const {
    reports: users,
    isLoading: loadingUsers,
    error: userError,
  } = useUserReports(undefined, "spent_desc");

  // Loading & Error unified error state
  if (loadingFigures || loadingUsers) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-medium text-gray-700">
            Đang tải dữ liệu báo cáo...
          </p>
        </div>
      </div>
    );
  }

  if (figureError || userError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
          <p className="text-red-600 font-bold">Lỗi hệ thống</p>
          <p className="text-gray-600 mt-2">
            {(figureError || userError)?.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className=" font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Bảng Điều Khiển Quản Trị
          </h1>
          <p className="text-gray-600 mt-3">
            Tổng quan hoạt động cửa hàng Figure
          </p>
        </div>

        {/* Top Selling Figures */}
        <section className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
            <h2 className=" font-bold text-white flex items-center gap-3">
              Top 8 Sản Phẩm Bán Chạy Nhất
            </h2>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-6">
              {figures.slice(0, 8).map((fig, index) => (
                <div
                  key={fig.figureId}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Ranking Badge */}
                  <div
                    className={`absolute -top-3 -right-3 size-12 rounded-full flex items-center justify-center font-bold text-white shadow-xl${
                      index === 0
                        ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                        : index === 1
                        ? "bg-gradient-to-br from-gray-400 to-gray-600"
                        : index === 2
                        ? "bg-gradient-to-br from-orange-600 to-red-600"
                        : "bg-gradient-to-br from-indigo-500 to-purple-600"
                    }`}
                  >
                    {index + 1}
                  </div>

                  <div className="p-5 text-center">
                    <p className="font-semibold text-gray-800 line-clamp-2 h-12">
                      {fig.figureName}
                    </p>
                    <p className="font-bold text-indigo-600 mt-4">
                      {fig.totalQuantitySold}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">đã bán</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Top Spending Users */}
        <section className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6">
            <h2 className=" font-bold text-white flex items-center gap-3">
              Top 20 Khách Hàng Thân Thiết
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-emerald-50 to-teal-50 text-gray-700">
                  <th className="px-6 py-5 text-left font-semibold">#</th>
                  <th className="px-6 py-5 text-left font-semibold">Email</th>
                  <th className="px-6 py-5 text-center font-semibold">
                    Trạng thái
                  </th>
                  <th className="px-6 py-5 text-right font-semibold">
                    Tổng chi tiêu
                  </th>
                  <th className="px-6 py-5 text-right font-semibold">
                    Sản phẩm đã mua
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-gray-500">
                      Chưa có dữ liệu khách hàng
                    </td>
                  </tr>
                ) : (
                  users.slice(0, 20).map((user, idx) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all duration-300"
                    >
                      <td className="px-6 py-5 font-bold text-gray-600">
                        #{idx + 1}
                      </td>
                      <td className="px-6 py-5">
                        <span className="font-medium text-gray-800">
                          {user.email}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        {user.status === 1 ? (
                          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-emerald-100 text-emerald-700">
                            Hoạt động
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm">
                            {UserStatus[user.status]}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-5 text-right">
                        <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                          {user.totalSpent.toLocaleString("vi-VN")}
                        </span>
                        <span className="text-sm text-gray-500">₫</span>
                      </td>
                      <td className="px-6 py-5 text-right font-bold text-gray-700">
                        {user.totalItemsPurchased}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer note */}
          <div className="px-8 py-5 bg-gray-50 border-t border-gray-100 text-center text-sm text-gray-500">
            Hiển thị top 20 khách hàng có tổng chi tiêu cao nhất
          </div>
        </section>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>
            © 2025 Figure Shop • Được xây dựng với ❤️ dành cho cộng đồng mô hình
          </p>
        </div>
      </div>
    </div>
  );
}
