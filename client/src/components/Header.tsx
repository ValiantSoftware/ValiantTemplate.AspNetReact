import { Link } from "react-router-dom";

export interface HeaderProps {
  title: string;
  body: string;
}

export function Header(props: HeaderProps) {
  return (
    <div className="px-6 py-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <Link to="/">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-6xl">{props.title}</h2>
        </Link>
        <p className="text-md mt-6 leading-8 text-gray-600 md:text-lg">{props.body}</p>
      </div>
    </div>
  );
}
