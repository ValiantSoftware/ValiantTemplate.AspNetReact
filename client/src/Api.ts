import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useAuthStatusQuery = () =>
  useQuery({
    queryKey: ["user", "authStatus"],
    queryFn: async () => {
      const response = await fetch("/api/auth/status");
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        return { isAuthenticated: false, email: null };
      }
    },
    retry: false,
  });

export const useUserInfoQuery = () =>
  useQuery({
    queryKey: ["user", "info"],
    queryFn: async () => {
      const response = await fetch("/api/auth/manage/info");
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        return null;
      }
    },
  });

export const useGuidQuery = () =>
  useQuery({
    queryKey: ["guid"],
    queryFn: async () => {
      const response = await fetch("/api/example/guid");
      if (response.ok) {
        const guid = await response.text();
        return guid;
      } else {
        return null;
      }
    },
  });

export function useAuthStatus() {
  const queryClient = useQueryClient();
  const authStatusQuery = useAuthStatusQuery();
  return {
    isLoading: authStatusQuery.isLoading,
    isAuthenticated: authStatusQuery.data?.isAuthenticated,
    email: authStatusQuery.data?.email,
    refresh: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  };
}

export async function register(email: string, password: string): Promise<void> {
  await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
}

export async function signIn(email: string, password: string, remember: boolean): Promise<void> {
  const loginUrl = remember ? "/api/auth/login?useCookies=true" : "/api/auth/login?useSessionCookies=true";

  await fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
}

export async function requestPasswordReset(email: string): Promise<void> {
  await fetch("/api/auth/forgotPassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
}

export async function resetPassword(email: string, password: string, code: string): Promise<void> {
  await fetch("/api/auth/resetPassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, newPassword: password, resetCode: code }),
  });
}

export async function signOut(): Promise<void> {
  await fetch("/api/auth/logout", {
    method: "POST",
  });
}
