import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";
import { nonSecuredInstance as axiosInstance } from "@/libs/instance";
import { Response } from "@/validation/response.validation";

type Role = "ADMIN" | "USER";

interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
}

interface AuthResponse {
  token: string;
  user: User;
}

export const useAuth = () => {
  const router = useRouter();
  const { addToast } = useToast();

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post<Response<AuthResponse>>(
        "/auth/login",
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        // Store token in cookie
        document.cookie = `token=${response.data.data.token}; path=/`;
        addToast("Login successful", "success");
        router.push("/");
        return response.data.data;
      }
    } catch (error: any) {
      addToast(error.response?.data?.message || "Login failed", "error");
      return null;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await axiosInstance.post<Response<User>>(
        "/auth/register",
        {
          name,
          email,
          password,
        }
      );

      if (response.data.success) {
        addToast("Registration successful", "success");
        router.push("/login");
        return response.data.data;
      }
    } catch (error: any) {
      addToast(error.response?.data?.message || "Registration failed", "error");
      return null;
    }
  };

  const logout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    router.push("/login");
  };

  const getUser = async () => {
    try {
      const response = await axiosInstance.get<Response<User>>("/auth/me");
      return response.data.data;
    } catch (error) {
      return null;
    }
  };

  return {
    login,
    register,
    logout,
    getUser,
  };
};