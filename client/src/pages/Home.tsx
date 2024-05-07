import { useAuthStatus } from "../Api";
import { HomeDashboard } from "./HomeDashboard";
import { HomeIndex } from "./HomeIndex";

export function Home() {
  const authStatus = useAuthStatus();
  return authStatus.isAuthenticated ? <HomeDashboard /> : <HomeIndex />;
}
