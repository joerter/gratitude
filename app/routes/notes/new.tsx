import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import { getPrompts } from "~/models/prompts.server";
import { createNote } from "~/models/note.server";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const prompts = await getPrompts({ userId });

  const date = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return json({ prompts, date });
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
        className="h-full w-full py-5 flex flex-col justify-between"
      >
        <h2 className="text-center">{data.date}</h2>
        <div className="grow">
          {data.prompts.map((p, i) => (
            <div>
              <div key={i} className="form-control my-5">
                <label className="label text-lg font-bold text-center justify-center underline decoration-primary decoration-4" htmlFor={p.id}>
                  {p.text}
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  id={p.id}
                  name={p.id}
                  rows={20}
                ></textarea>
              </div>
              <div className="divider"></div>
            </div>
          ))}
          <input
            type="hidden"
            name="prompts"
            value={data.prompts.map((p) => p.id).join()}
          />
        </div>
        
        <button
          type="submit"
          className="btn btn-primary btn-block mt-5"
        >
          Save
        </button>
      </Form>
  );
}
