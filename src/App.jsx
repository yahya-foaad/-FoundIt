import { Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import AdminLayout from "./layout/AdminLayout";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import NotFoundPage from "./pages/static/NotFoundPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminRequestsPage from "./pages/admin/AdminRequestsPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import ItemsPage from "./pages/items/ItemsPage";
import ItemDetailsPage from "./pages/items/ItemDetailsPage";
import ReportFormPage from "./pages/report/ReportFormPage";
import EditFormPage from "./pages/profile/EditFormPage";
import ProfilePage from "./pages/profile/ProfilePage";
import MyReportsPage from "./pages/profile/MyReportsPage";
import SettingsPage from "./pages/profile/SettingsPage";
import Forgetpassword from "./pages/auth/Forgetpassword";

export default function App() {
  return (
    <Routes>
      {/* Public site: Header + Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgetpassword" element={<Forgetpassword />} />

        <Route path="/items">
          <Route index element={<ItemsPage />} />
          <Route path=":id" element={<ItemDetailsPage />} />
        </Route>

        <Route path="/report">
          <Route index element={<ReportFormPage />} />
          <Route path="edit/:id" element={<EditFormPage />} />
        </Route>

        <Route path="/profile" element={<ProfilePage />}>
          <Route index element={<Navigate to="my-reports" replace />} />
          <Route path="my-reports" element={<MyReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
  <Route index element={<AdminDashboardPage />} />
  <Route path="requests" element={<AdminRequestsPage />} />
  <Route path="users" element={<AdminUsersPage />} />
</Route>
    </Routes>
  );
}