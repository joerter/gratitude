import { Form, Outlet, Link } from "@remix-run/react";
import { useUser } from "~/utils";

export default function NotesPage() {
  const user = useUser();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between navbar bg-secondary text-primary-content">
        <Link to="/notes" className="btn btn-ghost normal-case text-xl">Gratitude</Link>
        <p>{user.email}</p>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="py-2 px-4 btn btn-outline"
          >
            Logout
          </button>
        </Form>
      </header>

      <main className="h-full w-full bg-white p-5 mt-5">
        <Outlet />
      </main>
    </div>
  );
}
