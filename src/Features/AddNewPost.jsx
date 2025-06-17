import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddPost, resetAddPostState } from "./AddPost";
import { useNavigate } from "react-router-dom";

const AddNewPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.addPost);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      title: title.trim(),
      description: description.trim(),
      content: content.trim(),
    };

    if (!postData.title || !postData.description || !postData.content) {
      alert("Please fill in all fields");
      return;
    }

    console.log("Submitting:", postData); // optional debug
    dispatch(AddPost(postData));
  };

  useEffect(() => {
    if (status === "succeeded") {
      setTitle("");
      setDescription("");
      setContent("");

      setTimeout(() => {
        dispatch(resetAddPostState());
        navigate("/dashboard");
      }, 1000);
    }
  }, [status, dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="mx-15 bg-white p-3 rounded-full shadow-lg">
        <h2 className="text-3xl font-bold text-gray-700 p-5 text-center">
          Add your thoughts here with ease 📝
        </h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="p-6 max-w-xl mx-auto mt-10 border rounded-lg shadow bg-white"
      >
        <h2 className="text-2xl font-bold mb-4">Add New Post</h2>

        {status === "loading" && <p className="text-blue-600">Submitting...</p>}

        {status === "succeeded" && (
          <p className="text-green-600 mb-2">Post added successfully!</p>
        )}

        {status === "failed" && (
          <div className="text-red-600 mb-2">
            <p>
              <strong>Error:</strong>
            </p>
            <pre className="whitespace-pre-wrap text-sm">
              {typeof error === "string"
                ? error
                : JSON.stringify(error, null, 2)}
            </pre>
          </div>
        )}

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          rows={6}
          required
        ></textarea>

        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
        >
          {status === "loading" ? "Posting..." : "Add Post"}
        </button>
      </form>
    </div>
  );
};

export default AddNewPost;
