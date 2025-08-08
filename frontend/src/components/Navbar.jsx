import { Link, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import Menu from "../components/Menu";
import { userContext } from "../context/userContext";
//import axios from "axios";
//import URL from "../url";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();

  //imagine there is a user then you dont want to show login and register but rather wanna see create and profile so
  const { user } = useContext(userContext);
  //console.log(user);
  const [menu, setMenu] = useState(false);
  const showMenu = () => setMenu(!menu);
  const [prompt, setPrompt] = useState("");
  //seLocation().pathname gives you the current URL path of your app.
  const path = useLocation().pathname;
  //console.log(prompt);

  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md sticky top-0 z-50">
        <h1 className="text-2xl font-extrabold text-indigo-600 hover:text-indigo-700 transition-colors">
          <Link to="/">Blog Market</Link>
        </h1>

        {path === "/" && (
          <div className="ml-4 flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-1 shadow-inner">
            <button
              onClick={() => navigate("/?title=" + prompt.trim())}
              className="text-indigo-600 hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded"
              aria-label="Search posts"
            >
              <FaSearch size={18} />
            </button>
            <input
              onChange={(e) => setPrompt(e.target.value)}
              type="text"
              placeholder="Search a post"
              className="bg-transparent outline-none text-gray-700 placeholder-gray-400 w-48 md:w-72"
            />
          </div>
        )}

        <div className="hidden md:flex items-center space-x-6 text-gray-700 font-semibold">
          {user ? (
            <Link
              to="/write"
              className="hover:text-indigo-600 transition-colors"
            >
              Write
            </Link>
          ) : (
            <Link
              to="/login"
              className="hover:text-indigo-600 transition-colors"
            >
              Login
            </Link>
          )}

          {user ? (
            <div
              onClick={showMenu}
              className="cursor-pointer text-gray-600 hover:text-indigo-600"
            >
              <FaBars size={20} />
              {menu && <Menu />}
            </div>
          ) : (
            <Link
              to="/register"
              className="hover:text-indigo-600 transition-colors"
            >
              Register
            </Link>
          )}
        </div>

        <div
          className="md:hidden cursor-pointer text-gray-600 hover:text-indigo-600"
          onClick={showMenu}
        >
          <FaBars size={22} />
          {menu && <Menu />}
        </div>
      </div>
    </>
  );
};

export default Navbar;
