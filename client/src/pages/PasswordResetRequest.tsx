import { requestPasswordReset } from "../Api";
import { Card } from "../components/Card";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export function PasswordResetRequest() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const canSubmit = email;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await requestPasswordReset(email);
    navigate("/password-reset-requested");
  }

  return (
    <Card title="Reset your password">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled={!canSubmit}>
            Request a password reset
          </button>
        </div>
      </form>
    </Card>
  );
}
