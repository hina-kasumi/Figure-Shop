"use client";

import { tokenService } from "@/services/token";
import { useEffect, useState } from "react";

interface TokenHook {
  token: string | null;
  saveToken: (token: string) => void;
  removeToken: () => void;
  userID: string | null;
  isAdmin: boolean;
  userRole: string[] | null;
}

export function useToken(): TokenHook {
  const [token, setToken] = useState<string | null>(null);
  const userID = tokenService.getUserID();
  const isAdmin = tokenService.isAdmin();
  const userRole = tokenService.getUserRole();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = tokenService.getToken();
      setToken(storedToken);
    }
  }, []);

  function saveToken(newToken: string): void {
    if (typeof window !== "undefined") {
      tokenService.saveToken(newToken);
      setToken(newToken);
    }
  }

  function removeToken(): void {
    if (typeof window !== "undefined") {
      tokenService.removeToken();
      setToken(null);
    }
  }

  return {
    token,
    userID,
    isAdmin,
    userRole,
    saveToken,
    removeToken,
  };
}
