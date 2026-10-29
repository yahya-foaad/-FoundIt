import { Route, Routes } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HomePage from "@/pages/home/HomePage";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import NotFoundPage from "@/pages/static/NotFoundPage";
import ItemsPage from "@/pages/items/ItemsPage";
import ItemDetailsPage from "@/pages/items/ItemDetailsPage";
import ReportFormPage from "@/pages/report/ReportFormPage";
import EditFormPage from "@/pages/report/EditFormPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import MyReportsPage from "@/pages/profile/MyReportsPage";
import SettingsPage from "@/pages/profile/SettingsPage";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />

          <Route path="items">
            <Route index element={<ItemsPage />} />
            <Route path=":id" element={<ItemDetailsPage />} />
          </Route>

          <Route path="report">
            <Route index element={<ReportFormPage />} />
            <Route path="edit/:id" element={<EditFormPage />} />
          </Route>

          <Route path="profile">
            <Route index element={<ProfilePage />} />
            <Route path="my-reports" element={<MyReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
