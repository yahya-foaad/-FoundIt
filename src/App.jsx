import { Route, Routes } from "react-router-dom";
import AdminSite from "./layout/adminpanal/AdminSite";
import PublicSite from "./layout/user/PublicSite";

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
