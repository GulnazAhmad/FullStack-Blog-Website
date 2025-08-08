import React, { useContext } from "react";
import { userContext } from "../context/userContext";
import axios from "axios";
import { URL } from "../url";
import { Link } from "react-router-dom";
const Menu = () => {
  const { user } = useContext(userContext);
  const { setUser } = useContext(userContext);
  const handleLogout = async () => {
    const res = await axios.get(URL + "/logout", { withCredentials: true });
    console.log("logout response", res.data);
    setUser(null);
  };
  return (
    <div className="absolute top-16 right-4 w-48 bg-white rounded-lg shadow-lg z-50 py-4 flex flex-col gap-3 px-4 border border-gray-200">
      {!user && (
        <Link
          to="/login"
          className="text-gray-800 hover:text-indigo-600 text-sm font-medium transition-colors"
        >
          Login
        </Link>
      )}
      {!user && (
        <Link
          to="/register"
          className="text-gray-800 hover:text-indigo-600 text-sm font-medium transition-colors"
        >
          Register
        </Link>
      )}
      {user && (
        <Link
          to={"/profile/" + user._id}
          className="text-gray-800 hover:text-indigo-600 text-sm font-medium transition-colors"
        >
          Profile
        </Link>
      )}
      {user && (
        <Link
          to="/write"
          className="text-gray-800 hover:text-indigo-600 text-sm font-medium transition-colors"
        >
          Write
        </Link>
      )}
      {user && (
        <Link
          to={"/myblogs/" + user._id}
          className="text-gray-800 hover:text-indigo-600 text-sm font-medium transition-colors"
        >
          My Blogs
        </Link>
      )}
      {user && (
        <button
          onClick={handleLogout}
          className="text-gray-800 hover:text-red-600 text-sm font-medium text-left w-full transition-colors"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Menu;
