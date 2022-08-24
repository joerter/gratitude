import { Outlet } from "@remix-run/react";

export default function Years() {
  return (
    <div>
      <h1>All years that have journal entries</h1>
      <Outlet />
    </div>
  )
}
