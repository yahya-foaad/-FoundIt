import { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "الصفحة الرئيسية", end: true },
  { to: "/items", label: "البلاغات" },
  { to: "/report", label: "إبلاغ" },
];

const profileLinks = [
  { to: "/profile/MyReportPage", label: "إبلاغاتي" },
  { to: "/profile/settings", label: "الإعدادات" },
];

const linkClass = ({ isActive }) =>
  isActive ? "font-medium text-accent" : "";

const Chevron = ({ open }) => (
  <svg
    className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { pathname } = useLocation();
  const inProfile = pathname.startsWith("/profile");

  // close the desktop dropdown when clicking outside it
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const closeAll = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
    setIsMobileProfileOpen(false);
  };

  return (
    <nav
      dir="rtl"
      className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg"
    >
      <header className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        {/* Right side in RTL: menu button + logo */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
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
          <NavLink to="/" className="font-bold">
            اسم الموقع
          </NavLink>
        </div>

        {/* Desktop links */}
        <ul className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.end} className={linkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}

          {/* Profile dropdown */}
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              aria-expanded={isProfileOpen}
              className={`flex items-center gap-1 ${
                inProfile ? "font-medium text-accent" : ""
              }`}
            >
              الصفحة الشخصية
              <Chevron open={isProfileOpen} />
            </button>

            {isProfileOpen && (
              <ul className="absolute start-0 top-full mt-3 w-44 rounded-xl border border-separator bg-background p-2 shadow-lg">
                {profileLinks.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      onClick={closeAll}
                      className={({ isActive }) =>
                        `block rounded-lg px-3 py-2 hover:bg-default/10 ${
                          isActive ? "font-medium text-accent" : ""
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>

        {/* keeps the links centered on desktop */}
        <div className="hidden w-24 md:block" />
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  onClick={closeAll}
                  className={({ isActive }) =>
                    `block py-2 ${isActive ? "font-medium text-accent" : ""}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}

            {/* Mobile profile dropdown */}
            <li>
              <button
                onClick={() => setIsMobileProfileOpen(!isMobileProfileOpen)}
                aria-expanded={isMobileProfileOpen}
                className={`flex w-full items-center justify-between py-2 ${
                  inProfile ? "font-medium text-accent" : ""
                }`}
              >
                الصفحة الشخصية
                <Chevron open={isMobileProfileOpen} />
              </button>

              {isMobileProfileOpen && (
                <ul className="mr-4 border-r border-separator pr-4">
                  {profileLinks.map((link) => (
                    <li key={link.to}>
                      <NavLink
                        to={link.to}
                        onClick={closeAll}
                        className={({ isActive }) =>
                          `block py-2 ${
                            isActive ? "font-medium text-accent" : ""
                          }`
                        }
                      >
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}