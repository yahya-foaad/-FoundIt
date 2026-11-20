import { useState } from "react";
import AuraCard from "./AuraCard";
import NavRight from "./NavRight";
import { NavLink, useNavigate, Link } from "react-router-dom";
import Them from "./Them";
import {
  HiOutlineBell,
  HiOutlinePaperAirplane,
  HiChevronDown,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineUser,
} from "react-icons/hi";
import { useAuth } from "../../pages/auth/AuthContext";

const links = [
  { to: "/", label: "الرئيسية", end: true },
  { to: "/items", label: "المفقودات والمعثرات" },
];

const profileLinks = [
  { to: "/profile/MyReportPage", label: "إبلاغاتي" },
  { to: "/profile/settings", label: "الإعدادات" },
];

const linkCls = ({ isActive }) =>
  `px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${
    isActive ? "bg-[#0b1f3a] text-white" : "text-slate-800 hover:bg-slate-100"
  }`;

const Nav = () => {
  const navigate = useNavigate();
  const { user, logout: authLogout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  // رسايل تجريبية - بدّلها بالرسايل الحقيقية من الـ API
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "تم العثور على غرضك",
      text: "حد لقى المحفظة اللي أبلغت عنها",
      time: "قبل 5 دقائق",
      read: false,
    },
    {
      id: 2,
      title: "تم قبول بلاغك",
      text: "بلاغك عن الموبايل اتراجع واتنشر",
      time: "قبل ساعة",
      read: false,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) =>
    setNotifications((list) =>
      list.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );

  const markAllAsRead = () =>
    setNotifications((list) => list.map((n) => ({ ...n, read: true })));

  const closeAll = () => {
    setMenuOpen(false);
    setUserOpen(false);
    setNotifOpen(false);
  };

  const logout = () => {
    closeAll();
    authLogout(); // يفضل في نفس الصفحة
  };

  return (
    <header className="main-header sticky top-0 z-40 w-full border-b">
      <nav
        dir="ltr"
        className=" flex w-full items-center justify-between gap-4 px-4 py-3 text-base-content/80 hover:text-base-content md:px-8 text-theme-text">
        {/* آخر الناف: إبلاغ جديد + إشعارات + الصورة */}
        <div className="flex items-center gap-3 md:gap-5">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex flex-col items-end leading-tight">
              <AuraCard />
            </div>
          </Link>

          <Them />

          {/* الإشعارات: للمسجل دخوله بس */}
          {user && (
            <div className="relative text-2xl theme-text">
              <button
                type="button"
                aria-label="الإشعارات"
                aria-expanded={notifOpen}
                onClick={() => {
                  setNotifOpen((o) => !o);
                  setUserOpen(false);
                }}
                className="relative text-2xl text-theme-text">
                <HiOutlineBell />
                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-blue-700 text-[10px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setNotifOpen(false)}
                  />
                  <div
                    dir="rtl"
                    className="theme-card absolute right-0 top-full z-30 mt-3 w-80 max-w-[90vw] overflow-hidden rounded-xl border shadow-lg">
                    <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                      <span className="text-sm font-bold text-theme-text">
                        الإشعارات
                      </span>
                      {unreadCount > 0 && (
                        <button
                          type="button"
                          onClick={markAllAsRead}
                          className="text-xs text-blue-700 hover:underline">
                          تحديد الكل كمقروء
                        </button>
                      )}
                    </div>

                    {notifications.length === 0 ? (
                      <p className="px-4 py-8 text-center text-sm text-slate-500">
                        مفيش رسايل جديدة
                      </p>
                    ) : (
                      <ul className="max-h-80 overflow-y-auto">
                        {notifications.map((n) => (
                          <li key={n.id}>
                            <button
                              type="button"
                              onClick={() => markAsRead(n.id)}
                              className={`block w-full px-4 py-3 text-right hover:bg-slate-50 ${
                                n.read ? "" : "bg-blue-50"
                              }`}>
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-sm font-bold text-theme-text">
                                  {n.title}
                                </span>
                                {!n.read && (
                                  <span className="size-2 shrink-0 rounded-full bg-blue-700" />
                                )}
                              </div>
                              <p className="mt-0.5 text-xs text-slate-600">
                                {n.text}
                              </p>
                              <span className="mt-1 block text-[11px] text-theme-muted">
                                {n.time}
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* الصورة / الكاركتر */}
          {!user ? (
            // مفيش حد داخل: كاركتر عادي بيودي لصفحة تسجيل الدخول
            <button
              type="button"
              aria-label="تسجيل الدخول"
              onClick={() => {
                closeAll();
                navigate("/login");
              }}
              className="flex size-11 items-center justify-center rounded-full bg-slate-200 text-2xl text-slate-500 transition-colors hover:bg-slate-300">
              <HiOutlineUser />
            </button>
          ) : (
            // في حد داخل: الاسم والصورة والقايمة
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setUserOpen((o) => !o);
                  setNotifOpen(false);
                }}
                aria-expanded={userOpen}
                className="flex items-center gap-3">
                <HiChevronDown
                  className={`text-slate-600 transition-transform ${
                    userOpen ? "rotate-180" : ""
                  }`}
                />
                <div className="hidden flex-col items-end leading-tight sm:flex">
                  <span className="text-sm font-bold text-theme-text">
                    {user.name}
                  </span>
                  <span className="text-xs text-theme-muted">{user.role}</span>
                </div>
                <img
                  src={user.image}
                  alt={user.name}
                  className="size-11 rounded-full object-cover"
                />
              </button>

              {userOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setUserOpen(false)}
                  />
                  <div
                    dir="rtl"
                    className="absolute right-0 top-full z-30 mt-2 w-48 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                    {profileLinks.map((p) => (
                      <NavLink
                        key={p.to}
                        to={p.to}
                        onClick={closeAll}
                        className={({ isActive }) =>
                          `block px-4 py-2.5 text-sm hover:bg-slate-100 ${
                            isActive
                              ? "font-bold text-theme-text"
                              : "text-slate-800"
                          }`
                        }>
                        {p.label}
                      </NavLink>
                    ))}
                    <button
                      type="button"
                      onClick={logout}
                      className="block w-full px-4 py-2.5 text-right text-sm text-red-600 hover:bg-red-50">
                      تسجيل الخروج
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* زرار الموبايل */}
          <button
            type="button"
            aria-label="القائمة"
            onClick={() => setMenuOpen((o) => !o)}
            className="text-2xl text-theme-text md:hidden">
            {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
          </button>
        </div>
        <NavRight />
      </nav>

      {/* قايمة الموبايل */}
      {menuOpen && (
        <div
          dir="rtl"
          className="flex flex-col gap-2 border-t border-gray-100 p-4 md:hidden">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={closeAll}
              className={linkCls}>
              {l.label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={() => {
              closeAll();
              navigate("/report");
            }}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-bold text-white sm:hidden">
            إبلاغ جديد
            <HiOutlinePaperAirplane className="rotate-45 text-lg" />
          </button>
        </div>
      )}
    </header>
  );
};

export default Nav;
