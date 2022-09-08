import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { requireUserId } from "~/session.server";
import { getNoteListItems } from "~/models/note.server";
import { Link, useLoaderData } from "@remix-run/react";

const formatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

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
          <div className="card card-bordered border-dashed border-black w-full bg-base-100 my-4">
            <div className="card-body">
              <div className="card-title">
                <h2>
                  {formatter.format(new Date())}
                </h2>
              </div>
              <div className="card-actions">
                <Link to="new" className="btn btn-primary w-full">
                  Create
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      {data.noteListItems.map((n, i) => (
        <div className="card my-4 w-full bg-base-100 shadow-xl" key={i}>
          <div className="card-body">
            <h2 className="card-title">
              {formatter.format(new Date(n.createdAt))}
            </h2>
            <div className="card-actions">
              <Link className="btn btn-secondary btn-block" to={`${n.id}`}>
                View
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
