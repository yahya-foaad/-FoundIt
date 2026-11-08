import { Route, Routes } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

import HomePage from "../../pages/home/HomePage";
import LoginPage from "../../pages/auth/LoginPage";
import SignupPage from "../../pages/auth/SignupPage";
import Forgetpassword from "../../pages/auth/Forgetpassword";
import NotFoundPage from "../../pages/static/NotFoundPage";
import ItemsPage from "../../pages/items/ItemsPage";
import ItemDetailsPage from "../../pages/items/ItemDetailsPage";
import ReportFormPage from "../../pages/report/ReportFormPage";
import EditFormPage from "../../pages/profile/EditFormPage";
import ProfilePage from "../../pages/profile/ProfilePage";

export default function PublicSite() {
  return (
    <>
      <Header />
      <main>
        <Routes>
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

<Route path="/profile/*" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}