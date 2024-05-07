import { Card } from "../components/Card";
import { Link } from "react-router-dom";

export function HomeIndex() {
  return (
    <Card title="Home page">
      <div className="flex flex-col gap-4">
        <p>This is the public index page. To see the other pages, you must log in.</p>
        <Link
          to="/login"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Click here to log in
        </Link>
      </div>
    </Card>
  );
}
