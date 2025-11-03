import apiClient from "@/libs/http";
import { tokenService } from "./token";
import { ResponseTemplate } from "@/types/response-template";
import { AxiosResponse } from "axios";

class AuthService {
  isAuthenticated(): boolean {
    const token = tokenService.getToken();
    return !!token;
  }

  logout(): void {
    tokenService.removeToken();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }

  async login(
    email: string,
    password: string
  ): Promise<ResponseTemplate<string>> {
    if (email === "") {
      throw new Error("Email is required");
    }
    if (password === "") {
      throw new Error("Password is required");
    }

    const response: AxiosResponse<ResponseTemplate<string>> =
      await apiClient.post("/auth/login", {
        email,
        password,
      });

    const { data } = response;
    if (data.status === 200 && data.data) {
      tokenService.saveToken(data.data);
    }

    return {
      status: data.status,
      message: data.message,
      data: null,
    };
  }

  async register(
    email: string,
    password: string,
    confirmPassoword: string
  ): Promise<ResponseTemplate<string>> {
    if (email === "") {
      throw new Error("Email is required");
    }
    if (password === "") {
      throw new Error("Password is required");
    }
    if (password !== confirmPassoword) {
      throw new Error("Passwords do not match");
    }
    const response: AxiosResponse<ResponseTemplate<string>> =
      await apiClient.post("/auth/register", {
        email,
        password,
      });
    const { data } = response;
    if ((data.status === 200 || data.status === 201) && data.data) {
      tokenService.saveToken(data.data);
    }
    return {
      status: data.status,
      message: data.message,
      data: null,
    };
  }
}

export const authService = new AuthService();
