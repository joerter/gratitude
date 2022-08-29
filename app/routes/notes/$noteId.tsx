import type { LoaderArgs } from "@remix-run/node";
import { marked } from "marked";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getNote } from "~/models/note.server";
import { requireUserId } from "~/session.server";

type LoaderData = {
  date: string;
  answers: { prompt: string; answerHtml: string }[];
};

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);
  invariant(params.noteId, "noteId not found");

  const note = await getNote({ userId, id: params.noteId });
  if (!note) {
    throw new Response("Not Found", { status: 404 });
  }

  const date = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(note.createdAt));

  const data: LoaderData = {
    date,
    answers: note.answers.map((a) => ({
      prompt: a.prompt.text,
      answerHtml: marked(a.markdown),
    })),
  };
  return json<LoaderData>(data);
}

export default function NoteDetailsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="prose prose-slate lg:prose-xl">
      <h1>{data.date}</h1>
      {data.answers.map((a, i) => (
        <div key={i} className="rounded-box">
          <h2 className="my-2">{a.prompt}</h2>
          <div dangerouslySetInnerHTML={{ __html: a.answerHtml }} />
          <div className="divider"></div>
        </div>
      ))}
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Note not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
