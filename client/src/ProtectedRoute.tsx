import { useAuthStatus } from "./Api";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const authStatus = useAuthStatus();

  if (authStatus.isLoading) {
    return null;
  }

  if (authStatus.isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
}
