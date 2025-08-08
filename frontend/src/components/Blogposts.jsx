import React from "react";
import { URL } from "../url";

const Blogposts = ({ post }) => {
  if (!post) return null; // Prevent rendering if post is undefined

  // Construct the image source safely
  const imageSrc = post.photo?.startsWith("http")
    ? post.photo
    : `${URL}/images/${post.photo}`;

  return (
    <div className="flex bg-white rounded-xl shadow-md overflow-hidden my-8 mx-auto max-w-4xl hover:shadow-xl transition-shadow duration-300">
      {/* --- Image Section (Left) --- */}
      {/* 'flex-none' prevents this container from shrinking. */}
      {/* Adjusted widths for better balance on all screens. */}
      <div className="flex-none w-1/3 md:w-2/5 relative">
        <img
          src={imageSrc}
          alt={post.title}
          className="absolute h-full w-full object-cover"
        />
      </div>

      {/* --- Content Section (Right) --- */}
      <div className="p-6 md:p-8 flex flex-col justify-between w-2/3 md:w-3/5">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-col sm:flex-row justify-between text-sm font-semibold text-gray-500 mb-4">
            <p className="mb-1 sm:mb-0">@{post.username}</p>
            <div className="flex space-x-3">
              <time dateTime={post.updatedAt}>
                {new Date(post.updatedAt).toLocaleDateString()}
              </time>
              <time dateTime={post.updatedAt}>
                {new Date(post.updatedAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
            </div>
          </div>
          <p className="text-gray-700 text-sm md:text-base line-clamp-4">
            {post.description}
          </p>
        </div>
        <div className="mt-4">
          <span className="text-indigo-600 font-semibold cursor-pointer hover:text-indigo-800 transition-colors">
            Read more →
          </span>
        </div>
      </div>
    </div>
  );
};

export default Blogposts;
