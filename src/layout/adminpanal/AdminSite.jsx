import { Route, Routes } from "react-router-dom";
import AdminReportsContext from "../../context/adminReportsContext.jsx";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";

import NotFoundPage from "../../pages/static/NotFoundPage";
import AdminDashboardPage from "../../pages/admin/AdminDashboardPage";
import AdminRequestsPage from "../../pages/admin/AdminRequestsPage";
import AdminUsersPage from "../../pages/admin/AdminUsersPage";

export default function AdminSite() {
  return (
    <>
    <AdminReportsContext>
      <AdminHeader />
      <main>
        <Routes>
          <Route index element={<AdminDashboardPage />} />
          <Route path="requests" element={<AdminRequestsPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <AdminFooter />
      </AdminReportsContext>
    </>
  );
}