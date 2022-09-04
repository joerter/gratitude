import { Form, Outlet } from "@remix-run/react";
import { useUser } from "~/utils";

export default function NotesPage() {
  const user = useUser();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between navbar bg-primary text-primary-content">
        <a className="btn btn-ghost normal-case text-xl">Gratitude</a>
        <p>{user.email}</p>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="py-2 px-4 btn btn-accent"
          >
            Logout
          </button>
        </Form>
      </header>

      <main className="flex h-full bg-white p-4">
        <Outlet />
      </main>
    </div>
  );
}
