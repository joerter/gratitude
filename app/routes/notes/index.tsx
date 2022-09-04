import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { requireUserId } from "~/session.server";
import { getNoteListItems } from "~/models/note.server";
import { Link, useLoaderData } from "@remix-run/react";

const formatter = new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const noteListItems = await getNoteListItems({ userId });

  const lastNote = noteListItems.slice(-1)[0];
  const todayHasNote = new Date(lastNote.createdAt) >= new Date();

  return json({ noteListItems, todayHasNote });
}

export default function NoteIndexPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto max-w-sm px-4 flex flex-col justify-start content-center">
      <div>
        {!data.todayHasNote && (
        <Link to="new" className="btn btn-secondary w-full">
          Add today's entry
        </Link>
        )}
      </div>
      {data.noteListItems.map((n, i) => (
        <div className="card my-4 w-full bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{formatter.format(new Date(n.createdAt))}</h2>
            <div className="card-actions justify-end">
              <Link className="btn btn-accent" to={`${n.id}`}>View</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
