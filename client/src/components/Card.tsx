import { ReactNode } from "react";

export interface CardProps {
  title: string;
  children: ReactNode;
}

export function Card(props: CardProps) {
  return (
    <div className="w-full divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="px-4 py-5 sm:px-6">
        <div className="font-semibold">{props.title}</div>
      </div>
      <div className="px-4 py-5 sm:p-6">{props.children}</div>
    </div>
  );
}
