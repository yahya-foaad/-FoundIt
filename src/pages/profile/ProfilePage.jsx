import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Card, Avatar, Button } from "@heroui/react";

const tab = ({ isActive }) =>
  `tab font-semibold ${isActive ? "tab-active" : ""}`;

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Header card */}
      <div dir="rtl" className="max-w-md mx-auto px-4 py-6">
        <Card className="overflow-hidden p-0 shadow-xl">
          {/* Cover banner */}
          <div className="h-32 bg-gradient-to-br from-sky-500 via-indigo-500 to-purple-600" />

          <Card.Content className="flex flex-col items-center px-6 pb-6 text-center">
            {/* Avatar overlapping the banner */}
            <Avatar className="-mt-14 size-28 ring-4 ring-background shadow-lg">
              <Avatar.Fallback className="bg-gradient-to-br from-sky-400 to-indigo-600 text-4xl font-bold text-white">
                س
              </Avatar.Fallback>
            </Avatar>

            {/* Name + faculty tag */}
            <h2 className="mt-4 text-3xl font-extrabold">سارة أحمد</h2>
            <span className="mt-2 rounded-full bg-sky-500/15 px-4 py-1 text-sm font-medium text-sky-600">
              🎓 كلية الهندسة
            </span>

            {/* Email */}
            <div className="mt-3 flex items-center gap-2 text-sm opacity-70">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span dir="ltr">sara.ahmed@campus.edu</span>
            </div>

            {/* Stats strip */}
            

           
          </Card.Content>
        </Card>
      </div>

      {/* Tabs */}
      <div role="tablist" className="tabs tabs-border mt-6 justify-center">
        <NavLink to="my-reports" role="tab" className={tab}>
          إبلاغاتي
        </NavLink>
        <NavLink to="settings" role="tab" className={tab}>
          الإعدادات
        </NavLink>
      </div>

      {/* Child route (MyReportsPage / SettingsPage) renders here */}
      <div className="mt-6">
        <Outlet />
      </div>
    </>
  );
};

export default ProfilePage;