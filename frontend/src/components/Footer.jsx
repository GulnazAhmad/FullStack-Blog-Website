import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <div className="bg-gray-900 text-gray-300 px-8 py-10 md:px-32 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm md:text-base">
        <div className="space-y-3">
          <Link
            to="/featured"
            className="hover:text-indigo-400 transition-colors"
          >
            Featured Blogs
          </Link>
          <p>Most Viewed</p>
          <p>Readers Choice</p>
        </div>
        <div className="space-y-3">
          <p>Forum</p>
          <p>Support</p>
          <p>Recent Posts</p>
        </div>
        <div className="space-y-3">
          <p>Privacy Policy</p>
          <p>About Us</p>
          <p>Terms & Conditions</p>
          <p>Terms of Service</p>
        </div>
      </div>
      <p className="bg-gray-900 text-gray-400 text-center text-sm py-4">
        All rights reserved by BlogMarket @ 2025
      </p>
    </>
  );
};

export default Footer;
