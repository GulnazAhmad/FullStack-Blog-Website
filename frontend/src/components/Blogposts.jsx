import React from "react";
import { URL } from "../url";
const Blogposts = ({ post }) => {
  if (!post) return null; // prevent rendering if post is undefined
  const imageSrc = post.photo?.startsWith("http")
    ? post.photo
    : `${URL}/images/${post.photo}`;
  return (
    <>
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden mt-8 mx-4 hover:shadow-2xl transition-shadow duration-300">
        <div className="w-full md:w-48 h-48 md:h-48 flex-shrink-0 rounded-t-xl md:rounded-l-xl md:rounded-t-none overflow-hidden">
          <img
            src={imageSrc}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Content */}
        <div className="md:w-2/3 p-6 flex flex-col justify-between">
          <h1 className="text-xl md:text-3xl font-bold mb-2 text-gray-900">
            {post.title}
          </h1>

          <div className="flex justify-between text-sm font-semibold text-gray-500 mb-4">
            <p>@{post.username}</p>
            <div className="flex space-x-4">
              <time dateTime={post.updatedAt}>
                {new Date(post.updatedAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
              <time dateTime={post.updatedAt}>
                {new Date(post.updatedAt).toLocaleTimeString(undefined, {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
            </div>
          </div>

          <p className="text-gray-700 text-sm md:text-lg line-clamp-5">
            {post.description}
            <span className="text-indigo-600 font-semibold cursor-pointer ml-1">
              ...Read more
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Blogposts;
