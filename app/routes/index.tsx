import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Gratitude</h1>
          <p className="py-2">A journaling app for couples</p>
          {user ? (
            <Link className="btn btn-primary" to="/notes">
              View your notes
            </Link>
          ) : (
            <div>
              <div className="mt-6">
                <Link className="btn btn-primary" to="/login">
                  Login
                </Link>
              </div>
              <div className="mt-4">
                <Link className="btn btn-secondary" to="/join">
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
