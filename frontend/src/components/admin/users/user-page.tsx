"use client";

import {
  useBanUser,
  useRevokeAdminUser,
  useToggleAdminUser,
  useUsers,
} from "@/hooks/user-hook";
import { UserRole } from "@/types/user";
import { isAdmin, isBanned } from "@/utils/user-utils";
import { FaBan, FaUserMinus, FaUserShield } from "react-icons/fa";

export default function UserPage() {
  const { data: usersData, error: usersError } = useUsers();
  const users = usersData || [];

  const { func: toggleBan, isLoading: banLoading } = useBanUser();
  const { func: toggleAdmin, isLoading: adminLoading } = useToggleAdminUser();
  const { func: revokeAdmin, isLoading: revokeLoading } = useRevokeAdminUser();

  if (usersError) {
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <h1 className="text-xl font-semibold mb-4 text-theme-700">
          Quản lý người dùng
        </h1>
        <p className="text-red-600">Lỗi: {usersError.message}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-xl font-semibold mb-4 text-theme-700">
        Quản lý người dùng
      </h1>

      <table className="w-full border border-gray-200 text-sm">
        <thead className="bg-theme-100">
          <tr>
            <th className="text-left p-3 border-b">#</th>
            <th className="text-left p-3 border-b">Email</th>
            <th className="text-center p-3 border-b">Trạng thái</th>
            <th className="text-center p-3 border-b">Quyền</th>
            <th className="text-center p-3 border-b">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, index) => (
            <tr
              key={u.id}
              className={`hover:bg-theme-50 transition ${
                isBanned(u) ? "opacity-60" : ""
              }`}
            >
              <td className="p-3 border-b">{index + 1}</td>
              <td className="p-3 border-b">{u.email}</td>
              <td className="p-3 border-b text-center">
                {isBanned(u) ? (
                  <span className="text-red-600 font-medium">Banned</span>
                ) : (
                  <span className="text-green-600 font-medium">Active</span>
                )}
              </td>
              <td className="p-3 border-b text-center">
                {isAdmin(u) ? (
                  <span className="text-theme-700 font-medium">Admin</span>
                ) : (
                  <span className="text-gray-600">User</span>
                )}
              </td>
              <td className="p-3 border-b text-center space-x-2">
                {!isBanned(u) && (
                  <button
                    onClick={() => {
                      toggleBan(u.id).then(() => {
                        u.status = 3;
                      });
                    }}
                    disabled={banLoading}
                    className={`px-3 py-1 rounded text-white text-xs ${
                      isBanned(u) ? "bg-green-500" : "bg-red-500"
                    } hover:opacity-80`}
                  >
                    <FaBan className="inline mr-1" />
                    {isBanned(u) ? "" : "Ban"}
                  </button>
                )}

                <button
                  onClick={() => {
                    if (isAdmin(u)) {
                      revokeAdmin(u.id).then(() => {
                        u.roles = u.roles.filter(
                          (r) => r.name !== UserRole.ADMIN
                        );
                      });
                    } else {
                      toggleAdmin(u.id).then(() => {
                        u.roles.push({ name: UserRole.ADMIN });
                      });
                    }
                  }}
                  disabled={adminLoading || revokeLoading}
                  className={`px-3 py-1 rounded text-white text-xs ${
                    isAdmin(u) ? "bg-gray-500" : "bg-theme-600"
                  } hover:opacity-80`}
                >
                  {isAdmin(u) ? (
                    <>
                      <FaUserMinus className="inline mr-1" />
                      Gỡ admin
                    </>
                  ) : (
                    <>
                      <FaUserShield className="inline mr-1" />
                      Cấp admin
                    </>
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
