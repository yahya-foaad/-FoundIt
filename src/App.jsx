import { Route, Routes } from "react-router-dom";
import AdminSite from "./layout/adminpanal/AdminSite";
import PublicSite from "./layout/user/PublicSite";
import { AuthProvider } from "./pages/auth/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-base-100 text-base-content">
        <Routes>
          <Route path="/admin/*" element={<AdminSite />} />
          <Route path="/*" element={<PublicSite />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}
