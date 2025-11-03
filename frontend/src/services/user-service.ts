import apiClient from "@/libs/http";
import { UserItem, UserRole } from "@/types/user";
import { AxiosResponse } from "axios";

class UserService {
  async getListUsers(): Promise<UserItem[]> {
    const response: AxiosResponse<UserItem[]> =
      await apiClient.get<UserItem[]>("/admin/users");

    return response.data;
  }

  async toggleBanUser(id: string): Promise<void> {
    await apiClient.post(`/admin/users/${id}/ban`);
  }

  async toggleAdminUser(id: string): Promise<void> {
    await apiClient.post(`/admin/users/${id}/grant-role`, {
        roleName: UserRole.ADMIN
    });
  }

  async revokeAdminUser(id: string): Promise<void> {
    await apiClient.post(`/admin/users/${id}/revoke-role`, {
        roleName: UserRole.ADMIN
    });
  }
}

export const userService = new UserService();
