import React, { useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { URL } from "../url";
import { IF } from "../url";
import { userContext } from "../context/userContext";
import Loader from "../components/Loader";

const Postdetails = () => {
  const postId = useParams().id;
  const [post, setPost] = useState(null);
  const [loader, setLoader] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const { user } = useContext(userContext);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/getpost/" + postId);
      setPost(res.data);
      setLoader(false);
    } catch (e) {
      setLoader(true);
      console.error("Error fetching post:", e.message);
    }
  };

  const fetchpostComment = async () => {
    try {
      const res = await axios.get(URL + "/getcomments/" + postId);
      setComments(res.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const createpostComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        URL + "/createcomment/",
        {
          comment: commentText,
          author: user.user.username,
          postId: postId,
          userId: user.user._id,
        },
        {
          withCredentials: true,
        }
      );
      setCommentText("");
      fetchpostComment();
    } catch (e) {
      console.log(e.message);
    }
  };

  const handledelete = async () => {
    try {
      await axios.delete(URL + "/deletepost/" + postId, {
        withCredentials: true,
      });
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchpostComment();
  }, [postId]);

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="min-h-[80vh] flex justify-center items-center">
          <Loader />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      {loader ? (
        <div className="min-h-[80vh] flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        // Main content container with increased vertical padding for better spacing
        <div className="px-6 md:px-8 lg:px-12 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col justify-between">
              <h1 className="text-left font-extrabold text-4xl">
                {post.title}
              </h1>
              {user?.user?._id === post.userId && (
                <div className="flex items-center gap-4 my-4">
                  <p
                    className="cursor-pointer hover:text-blue-500"
                    onClick={() => navigate("/edit/" + postId)}
                  >
                    <CiEdit size={24} />
                  </p>
                  <p
                    className="cursor-pointer hover:text-red-500"
                    onClick={handledelete}
                  >
                    <MdDeleteForever size={24} />
                  </p>
                </div>
              )}

              <div className="mt-4 mb-8 flex justify-between text-sm font-semibold text-gray-500">
                <p>@{post.username}</p>
                <div className="flex space-x-2 ">
                  <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
                  <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
                </div>
              </div>
            </div>

            {post.photo ? (
              <div className="mt-6">
                <img
                  src={
                    post.photo?.startsWith("http")
                      ? post.photo
                      : URL + `/images/${encodeURIComponent(post.photo)}`
                  }
                  alt="post"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            ) : (
              <p className="text-red-500">No image available for this post.</p>
            )}

            <div className="w-full mt-8 text-lg text-gray-700 leading-relaxed">
              {post.description}
            </div>

            <div className="mt-8 flex items-center">
              <p className="font-bold">Categories: </p>
              <div className="flex items-center space-x-2 font-semibold ml-2">
                {post.categories?.map((c, i) => (
                  <div
                    key={i}
                    className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm"
                  >
                    {c}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6">Comments:</h3>
              <div className="space-y-4">
                {comments?.map((c) => (
                  <div key={c._id} className="bg-gray-100 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <p className="font-bold">@{c.author}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        {c.updatedAt ? (
                          <>
                            <p>{new Date(c.updatedAt).toLocaleDateString()}</p>
                            <p>
                              {new Date(c.updatedAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </>
                        ) : (
                          <p>Date not available</p>
                        )}
                      </div>
                    </div>
                    <p className="mt-2">{c.comment}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Comment input section with cleaner and more deliberate spacing */}
            <div className="flex flex-col md:flex-row gap-4 mt-8">
              <input
                onChange={(e) => setCommentText(e.target.value)}
                value={commentText}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                type="text"
                placeholder="Write a comment..."
              />
              <button
                onClick={createpostComment}
                className="bg-black text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Postdetails;
