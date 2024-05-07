import { Card } from "../components/Card";

export function NotFound() {
  return (
    <Card title="Nothing is here">
      <div className="flex flex-col gap-4">
        <p>Nothing is here.</p>
      </div>
    </Card>
  );
}
