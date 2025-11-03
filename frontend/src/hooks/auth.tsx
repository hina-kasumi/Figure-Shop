import { authService } from "@/services/auth-service";
import { LoginRequest, RegisterRequest } from "@/types/auth";
import { HookCallback } from "@/types/hook-template";
import { ResponseTemplate } from "@/types/response-template";
import { AxiosError } from "axios";
import { useState } from "react";

export function useLogin(): HookCallback<LoginRequest, string> {
  const [loading, setLoading] = useState<boolean>(false);

  async function login({ email, password }: LoginRequest): Promise<string> {
    setLoading(true);

    try {
      const response = await authService.login(email, password);
      return response.message;
    } catch (error) {
      const axiosError = error as AxiosError<ResponseTemplate<null>>;
      throw new Error(axiosError.response?.data.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  }

  return {
    func: login,
    isLoading: loading,
  };
}

export function useRegister(): HookCallback<RegisterRequest, string> {
  const [loading, setLoading] = useState<boolean>(false);
  async function register({
    email,
    password,
    confirmPassword,
  }: RegisterRequest): Promise<string> {
    setLoading(true);
    try {
      const response = await authService.register(email, password, confirmPassword);
      return response.message;
    } catch (error) {
      const axiosError = error as AxiosError<ResponseTemplate<null>>;
      throw new Error(
        axiosError.response?.data.message || "Failed to register"
      );
    } finally {
      setLoading(false);
    }
  }
  return {
    func: register,
    isLoading: loading,
  };
}
