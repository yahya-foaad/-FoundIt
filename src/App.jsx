import { Route, Routes } from "react-router-dom";
import PublicSite from "./layout/user/PublicSite";
import AdminSite from "./layout/adminpanal/AdminSite";

export default function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminSite />} />
      <Route path="/*" element={<PublicSite />} />
    </Routes>
  );
}