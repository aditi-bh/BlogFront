import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserPosts } from "./userPostsSlice";
import AddNewPost from "./AddNewPost";
import { DeletePost } from "./DeleteSlice";

const DashBoard = () => {
  const dispatch = useDispatch();
  const {
    items: posts,
    status,
    error,
  } = useSelector((state) => state.userPosts);

  useEffect(() => {
    dispatch(fetchUserPosts());
    console.log("this is the posts : ", posts);
  }, [dispatch]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/LogIn");
  };

  const handleDelete = (postId) => {
    const confirmDelete = window.confirm(
      "are you sure you want to delete this post ? "
    );
    if (confirmDelete) {
      dispatch(DeletePost(postId));
    }
    // implemented delete post logic here
  };

  if (status === "loading") return <p>Loading your posts...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Your Posts</h2>
        <button
          onClick={handleLogout}
          className="text-red-500 border border-red-500 px-4 py-2 rounded hover:bg-red-100"
        >
          Logout
        </button>
      </div>

      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4 border-b">#</th>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Content</th>
                <th className="py-2 px-4 border-b">Delete Posts</th>
                <th className="py-2 px-4 border-b">
                  <i className="fi fi-br-pencil-ruler mr-1"></i>
                  Edit Posts
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b font-medium">
                    {post.title}
                  </td>
                  <td className="py-2 px-4 border-b">{post.content}</td>
                  <td className="py-2 px-4 border-b font-medium">
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-black"
                    >
                      Delete
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b font-medium">
                    <button className="text-black">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <section>
            <AddNewPost />
          </section>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
