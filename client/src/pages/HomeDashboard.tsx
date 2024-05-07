import { useGuidQuery } from "../Api";
import { Card } from "../components/Card";

export function HomeDashboard() {
  const guidQuery = useGuidQuery();

  return (
    <Card title="Home page">
      <div className="flex flex-col gap-4">
        <p>
          You're logged in now, and you can call the API. For example, here's a GUID from the server: <span className="font-bold">{guidQuery.data}</span>
        </p>
        <button
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => guidQuery.refetch()}>
          Get a new GUID
        </button>
      </div>
    </Card>
  );
}
