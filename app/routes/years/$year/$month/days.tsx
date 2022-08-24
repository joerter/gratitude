import { Outlet } from "@remix-run/react";

export default function Days() {
  return (
    <div>
      <h3>All days in a month</h3>
      <Outlet />
    </div>
  )
}
