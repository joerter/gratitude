import { Link } from "@remix-run/react";

export default function PromptsIndex() {
  return (
    <Link to="new" prefetch="render">
      Create New Prompt
    </Link>
  );
}
