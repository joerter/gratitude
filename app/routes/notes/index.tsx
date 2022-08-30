import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { requireUserId } from "~/session.server";
import { getNoteListItems } from "~/models/note.server";
import { Link, useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const noteListItems = await getNoteListItems({ userId });
  return json({ noteListItems });
}

export default function NoteIndexPage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      <p>
        No note selected. Select a note below, or{" "}
        <Link to="new" className="text-blue-500 underline">
          create a new note.
        </Link>
      </p>
      <ul>
        {data.noteListItems.map((n, i) => (
          <li key={i}>
            <Link to={`${n.id}`}>{n.createdAt}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
