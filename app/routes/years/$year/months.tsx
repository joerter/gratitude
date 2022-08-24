import { Outlet } from "@remix-run/react";

export default function Months() {
  return (
    <div>
      <h2>All months in year</h2>
      <Outlet />
    </div>
  )
}
