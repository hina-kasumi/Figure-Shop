import { userService } from "@/services/user-service";
import { HookCallback, HookTemplate } from "@/types/hook-template";
import { ResponseTemplate } from "@/types/response-template";
import { UserItem } from "@/types/user";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export function useUsers(): HookTemplate<UserItem[]> {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    userService
      .getListUsers()
      .then((res: UserItem[]) => {
        setUsers(res || []);
      })
      .catch((error) => {
        const axiosError = error as AxiosError<ResponseTemplate<null>>;
        setError(
          new Error(
            axiosError.response?.data.message || "Failed to fetch users"
          )
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  console.log(users);

  return {
    data: users,
    isLoading: loading,
    error: error,
  };
}

export function useBanUser(): HookCallback<string, void> {
  const [loading, setLoading] = useState<boolean>(false);

  const toggleBan = async (id: string) => {
    try {
      setLoading(true);
      await userService.toggleBanUser(id);
    } catch (error) {
      console.error("Failed to toggle ban user:", error);
    } finally {
      setLoading(false);
    }
  };

  return { func: toggleBan, isLoading: loading };
}

export function useToggleAdminUser(): HookCallback<string, void> {
  const [loading, setLoading] = useState<boolean>(false);
  const toggleAdmin = async (id: string) => {
    try {
      setLoading(true);
      await userService.toggleAdminUser(id);
    } catch (error) {
      console.error("Failed to toggle admin user:", error);
    } finally {
      setLoading(false);
    }
  };

  return { func: toggleAdmin, isLoading: loading };
}

export function useRevokeAdminUser(): HookCallback<string, void> {
  const [loading, setLoading] = useState<boolean>(false);
  const revokeAdmin = async (id: string) => {
    try {
      setLoading(true);
      await userService.revokeAdminUser(id);
    } catch (error) {
      console.error("Failed to revoke admin user:", error);
    } finally {
      setLoading(false);
    }
  };

  return { func: revokeAdmin, isLoading: loading };
}
