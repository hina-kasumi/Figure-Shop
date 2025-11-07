"use client";

import { tokenService } from "@/services/token";
import { useEffect, useState } from "react";


export function useToken() {
  const [token, setToken] = useState<string | null>(null);
  const [userID, setUserID] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string[] | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = tokenService.getToken();
      setToken(storedToken);
      setUserID(tokenService.getUserID());
      setIsAdmin(tokenService.isAdmin());
      setUserRole(tokenService.getUserRole());
      setEmail(tokenService.getUserEmail());
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
    email,
    saveToken,
    removeToken,
  };
}
