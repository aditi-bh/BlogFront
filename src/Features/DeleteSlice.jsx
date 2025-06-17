import { createAsyncThunk } from "@reduxjs/toolkit";
import { data } from "autoprefixer";

export const DeletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return postId;
    } catch (err) {
      return rejectWithValue(err.response?.data || "error deleting post");
    }
  }
);
