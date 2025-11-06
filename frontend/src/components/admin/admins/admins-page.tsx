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

  if (loadingFigures || loadingUsers)
    return (
      <div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>
    );

  if (figureError || userError)
    return (
      <div className="p-8 text-center text-red-600">
        Lỗi tải dữ liệu: {(figureError || userError)?.message}
      </div>
    );

  return (
    <div className="p-8 space-y-10">
      {/* Tiêu đề */}
      <h1 className="text-3xl font-semibold text-[var(--color-theme-700)]">
        Bảng điều khiển quản trị
      </h1>

      {/* Thống kê figure */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-[var(--color-theme-800)]">
          Mặt hàng bán chạy
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {figures
            .filter((_, index) => index < 8)
            .map((fig) => (
              <div
                key={fig.figureId}
                className="bg-[var(--color-theme-50)] border border-[var(--color-theme-200)] rounded-xl p-4 shadow-sm"
              >
                <p className="text-sm text-gray-600">{fig.figureName}</p>
                <p className="text-2xl font-bold text-[var(--color-theme-700)]">
                  {fig.totalQuantitySold}
                </p>
                <p className="text-xs text-gray-400 mt-1">Đã bán</p>
              </div>
            ))}
        </div>
      </section>

      {/* Danh sách user */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-[var(--color-theme-800)]">
          Báo cáo người dùng
        </h2>
        <div className="overflow-x-auto border border-[var(--color-theme-200)] rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[var(--color-theme-100)] text-[var(--color-theme-900)]">
              <tr>
                <th className="p-3">Email</th>
                <th className="p-3 text-center">Trạng thái</th>
                <th className="p-3 text-right">Tổng chi tiêu (₫)</th>
                <th className="p-3 text-right">Sản phẩm đã mua</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center p-4 text-gray-500">
                    Không có dữ liệu người dùng
                  </td>
                </tr>
              )}
              {users
                .filter((_, index) => index < 20)
                .map((u) => (
                  <tr
                    key={u.id}
                    className="border-b border-[var(--color-theme-200)] hover:bg-[var(--color-theme-50)] transition"
                  >
                    <td className="p-3">{u.email}</td>
                    <td className="p-3 text-center">
                      {u.status === 1 ? (
                        <span className="text-green-600 font-medium">
                          Hoạt động
                        </span>
                      ) : (
                        <span className="text-gray-500">{UserStatus[u.status]}</span>
                      )}
                    </td>
                    <td className="p-3 text-right font-medium text-[var(--color-theme-700)]">
                      {u.totalSpent.toLocaleString("vi-VN")}
                    </td>
                    <td className="p-3 text-right">{u.totalItemsPurchased}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
