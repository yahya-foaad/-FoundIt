import { Route, Routes } from "react-router-dom";
import Header from "./layout/user/Header";
import Footer from "./layout/user/Footer";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import NotFoundPage from "./pages/static/NotFoundPage";
import AdminLayout from "./layout/AdminLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminRequestsPage from "./pages/admin/AdminRequestsPage";
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
    <div className="min-h-screen bg-base-100 text-base-content">
      <Routes>
        <Route path="/admin/*" element={<AdminSite />} />
        <Route path="/*" element={<PublicSite />} />
      </Routes>
    </div>
  );
}
