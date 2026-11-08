import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@heroui/react";

const links = [
  { to: "/admin", label: "لوحة التحكم", end: true },
  { to: "/admin/requests", label: "الطلبات" },
  { to: "/admin/users", label: "المستخدمون" },
];

const linkClass = ({ isActive }) =>
  `transition-colors pb-1 border-b-2 ${
    isActive
      ? "border-sky-400 font-semibold text-sky-400"
      : "border-transparent text-slate-300 hover:text-white"
  }`;

export default function AdminHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      dir="rtl"
      className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-900 text-slate-200 shadow-md"
    >
      <header className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        {/* Right side in RTL: menu button + logo */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-slate-200 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <NavLink to="/admin" className="flex items-center gap-3">
  <p className="font-bold text-white">لوحة الإدارة</p>
</NavLink>
        </div>

        {/* Desktop links: dashboard on the right, users on the left */}
        <ul className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.end} className={linkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Left side in RTL: logout */}
        <div className="hidden items-center gap-4 md:flex">
<Button className="border border-red-500 bg-transparent text-red-400 hover:bg-red-500 hover:text-white">
  تسجيل الخروج
</Button>        </div>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-slate-800 bg-slate-900 md:hidden">
          <ul className="flex flex-col gap-2 p-4">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  onClick={() => setIsMenuOpen(false)}
                 className={({ isActive }) =>
  `block rounded-lg px-3 py-2 ${
    isActive
      ? "bg-slate-800 font-semibold text-sky-400"
      : "text-slate-300 hover:bg-slate-800 hover:text-white"
  }`
}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
<li className="mt-4 flex flex-col gap-2 border-t border-slate-800 pt-4">              <Button className="w-full border border-red-500 bg-transparent text-red-400 hover:bg-red-500 hover:text-white">
  تسجيل الخروج
</Button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}