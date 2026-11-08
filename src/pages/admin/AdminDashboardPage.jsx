import { Outlet } from "react-router-dom";

export default function AdminDashboardPage() {
  return (
    <div dir="rtl" className="max-w-6xl mx-auto px-4 py-6">
      {/* dashboard content: stats, summary cards, ... */}

      <Outlet />
    </div>
  );
}