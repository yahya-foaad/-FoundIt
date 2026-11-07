import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="w-full h-full flex items-center justify-around p-4 bg-black">
      <div className="text-white font-bold text-xl">My App</div>

      <ul className="flex gap-4 text-white">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
