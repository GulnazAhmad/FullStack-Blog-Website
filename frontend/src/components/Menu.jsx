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
    <div>
      <div className="bg-black w-[200px] flex flex-col items-start absolute top-16 right-8 rounded-md p-4 gap-3.5 shadow-lg z-50">
        {!user && (
          <Link to="/login">
            <h3 className="text-white hover:text-gray-500 text-sm cursor-pointer">
              Login
            </h3>
          </Link>
        )}
        {!user && (
          <Link to="/register">
            <h3 className="text-white hover:text-gray-500 text-sm cursor-pointer">
              Register
            </h3>
          </Link>
        )}
        {user && (
          <Link to={"/profile/" + user._id}>
            <h3 className="text-white hover:text-gray-500 text-sm cursor-pointer">
              Profile
            </h3>
          </Link>
        )}
        {user && (
          <Link to="/write">
            <h3 className="text-white hover:text-gray-500 text-sm cursor-pointer">
              Write
            </h3>
          </Link>
        )}
        {user && (
          <Link to={"/myblogs/" + user._id}>
            <h3 className="text-white hover:text-gray-500 text-sm cursor-pointer">
              My Blogs
            </h3>
          </Link>
        )}
        {user && (
          <h3
            onClick={handleLogout}
            className="text-white hover:text-gray-500 text-sm cursor-pointer"
          >
            Logout
          </h3>
        )}
      </div>
    </div>
  );
};

export default Menu;
