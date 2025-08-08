import React from "react";
import { URL } from "../url";
const Blogposts = ({ post }) => {
  if (!post) return null; // prevent rendering if post is undefined
  const imageSrc = post.photo?.startsWith("http")
    ? post.photo
    : `${URL}/images/${post.photo}`;
  return (
    <>
      <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-lg overflow-hidden mt-8 mx-4 hover:shadow-2xl transition-shadow duration-300">
        {/* Image container */}
        <div className="w-full lg:w-2/5 h-60 lg:h-auto overflow-hidden rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none">
          <img
            src={imageSrc}
            alt={post.title}
            className="w-full h-full object-cover"
            style={{ aspectRatio: "16 / 9" }}
          />
        </div>

        {/* Content */}
        <div className="w-full lg:w-3/5 p-6 flex flex-col justify-between">
          <h1 className="text-xl lg:text-3xl font-bold mb-2 text-gray-900">
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
          <p className="text-gray-700 text-sm lg:text-lg line-clamp-5">
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
