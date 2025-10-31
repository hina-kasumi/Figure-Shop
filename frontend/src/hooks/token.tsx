"use client";

import { tokenService } from "@/services/token";
import { useEffect, useState } from "react";

interface TokenHook {
  token: string | null;
  saveToken: (token: string) => void;
  removeToken: () => void;
}

export function useToken(): TokenHook {
  const [token, setToken] = useState<string | null>(null);

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
    saveToken,
    removeToken,
  };
}
