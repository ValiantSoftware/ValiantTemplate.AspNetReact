import { signOut, useAuthStatus } from "./Api";
import clsx from "clsx";
import { NavLink, useNavigate } from "react-router-dom";

export function NavBar() {
  const authStatus = useAuthStatus();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    await authStatus.refresh();
    navigate("/login");
  }

  return (
    <div>
      <nav className="isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Tabs">
        <NavLink
          to="/"
          className={(active) =>
            clsx(
              "group relative min-w-0 flex-1 overflow-hidden bg-white px-4 py-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10",
              active ? "text-gray-900" : "text-gray-500 hover:text-gray-700",
              "rounded-l-lg"
            )
          }>
          Home
        </NavLink>
        <NavLink
          to="/page1"
          className={(active) =>
            clsx(
              "group relative min-w-0 flex-1 overflow-hidden bg-white px-4 py-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10",
              active ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
            )
          }>
          Page one
        </NavLink>
        <NavLink
          to="/page2"
          className={(active) =>
            clsx(
              "group relative min-w-0 flex-1 overflow-hidden bg-white px-4 py-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10",
              active ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
            )
          }>
          Page two
        </NavLink>
        <button
          onClick={handleSignOut}
          className={clsx("group relative min-w-0 flex-1 overflow-hidden bg-white px-4 py-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10", "rounded-r-lg")}>
          Sign out
        </button>
      </nav>
    </div>
  );
}
