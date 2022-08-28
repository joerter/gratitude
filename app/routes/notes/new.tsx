import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import { getPrompts } from "~/models/prompts.server";
import { createNote } from "~/models/note.server";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const prompts = await getPrompts({ userId });
  return json({ prompts });
}

export async function action({ request }: ActionArgs) {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const promptIds = formData.get("prompts") as string;
  const answers = promptIds.split(",").map((id) => ({
    markdown: formData.get(id)?.toString() ?? "",
    promptId: id,
  }));

  const note = await createNote({ userId, answers });
  console.log("created note", note);

  return redirect(`/notes`);
}

export default function NewNotePage() {
  const data = useLoaderData<typeof loader>();

  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      {data.prompts.map((p, i) => (
        <div key={i}>
          <label className="flex w-full flex-col gap-1" htmlFor={p.id}>
            {p.text}
          </label>
          <textarea id={p.id} name={p.id} cols={30} rows={10}></textarea>
        </div>
      ))}
      <input
        type="hidden"
        name="prompts"
        value={data.prompts.map((p) => p.id).join()}
      />

      <div className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Save
        </button>
      </div>
    </Form>
  );
}
