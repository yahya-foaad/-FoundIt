import { Link, NavLink } from "react-router-dom";
import AuraCard from "./AuraCard";

const links = [
  { to: "/", label: "الرئيسية", end: true },
  { to: "/items", label: "المفقودات والمعثرات" },
];

const linkCls = ({ isActive }) =>
  `px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${
    isActive
      ? "bg-primary text-primary-content"
      : "text-base-content hover:bg-base-content/10"
  }`;

const NavRight = () => {
  return (
    <div className="flex items-center gap-6">
      <Link to="/" className="flex items-center gap-2">
        <div className="flex flex-col items-end leading-tight">
          <AuraCard />
        </div>
      </Link>

      <div className="hidden items-center gap-2 md:flex">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.end} className={linkCls}>
            {l.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default NavRight;
