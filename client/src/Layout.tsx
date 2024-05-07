import { useAuthStatus } from "./Api";
import { NavBar } from "./NavBar";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Outlet } from "react-router-dom";

export function Layout() {
  const authStatus = useAuthStatus();
  return (
    <div className="flex h-screen flex-col justify-between bg-stone-100">
      <Header title="Valiant Template" body="A web app template using React for the UI, and ASP.NET Core for the backend." />
      <div className="mx-auto flex h-full w-full max-w-xl flex-col gap-2 px-4 sm:px-0 md:gap-4">
        {authStatus.isAuthenticated && <NavBar />}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
