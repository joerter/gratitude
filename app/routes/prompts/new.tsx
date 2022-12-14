import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { createPrompt } from "~/models/prompts.server";
import { requireUserId } from "~/session.server";

export async function action({ request }: ActionArgs) {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const promptText = formData.get("prompt") as string;
  await createPrompt({ userId, promptText });
  return redirect("/prompts/new");
}

export default function NewPromptPage() {
  return (
    <Form method="post">
      <label htmlFor="prompt">Prompt</label>
      <input type="text" name="prompt" id="prompt" autoFocus />
      <button
        type="submit"
        className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
      >
        Save
      </button>
    </Form>
  );
}
