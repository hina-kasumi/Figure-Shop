import apiClient from "@/libs/http";
import { UserItem, UserRole } from "@/types/user";
import { AxiosResponse } from "axios";

class UserService {
  async getListUsers(): Promise<UserItem[]> {
    const response: AxiosResponse<UserItem[]> = await apiClient.get<UserItem[]>(
      "/admin/users"
    );

    const responseDetails: AxiosResponse<UserItem[]> = await apiClient.get<
      UserItem[]
    >("/admin/users/report");

    const detailsMap: Record<
      string,
      { totalSpent: number; totalItemsPurchased: number }
    > = {};
    responseDetails.data.forEach((detail) => {
      detailsMap[detail.id] = {
        totalSpent: detail.totalSpent || 0,
        totalItemsPurchased: detail.totalItemsPurchased || 0,
      };
    });

    const usersWithDetails = response.data.map((user) => ({
      ...user,
      totalSpent: detailsMap[user.id]?.totalSpent || 0,
      totalItemsPurchased: detailsMap[user.id]?.totalItemsPurchased || 0,
    }));

    return usersWithDetails;
  }

  async toggleBanUser(id: string): Promise<void> {
    await apiClient.post(`/admin/users/${id}/ban`);
  }

  async toggleAdminUser(id: string): Promise<void> {
    await apiClient.post(`/admin/users/${id}/grant-role`, {
      roleName: UserRole.ADMIN,
    });
  }

  async revokeAdminUser(id: string): Promise<void> {
    await apiClient.post(`/admin/users/${id}/revoke-role`, {
      roleName: UserRole.ADMIN,
    });
  }
}

export const userService = new UserService();
