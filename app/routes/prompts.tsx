import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getPrompts } from "~/models/prompts.server";
import { requireUserId } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const prompts = await getPrompts({ userId });
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
