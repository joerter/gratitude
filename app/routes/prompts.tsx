import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getPrompts } from "~/models/prompts.server";

export async function loader() {
  const prompts = await getPrompts();
  return json({ prompts });
}

export default function PromptsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <h3>Use this page to create prompts for your journal entries.</h3>
      <ul>
        {data.prompts.map((p, i) => (
          <li key={i}>{p.text}</li>
        ))}
      </ul>

      <hr />

      <Outlet />
    </div>
  );
}
