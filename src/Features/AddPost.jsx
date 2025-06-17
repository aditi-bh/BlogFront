import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import React, { useState } from "react";

export const AddPost = createAsyncThunk(
  "posts/AddPosts",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/posts",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Add Post api response : ", response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const AddPostSlice = createSlice({
  name: "AddPost",
  initialState: {
    status: "idle",
    error: null,
    newPost: null,
  },
  reducers: {
    resetAddPostState: (state) => {
      state.status = "idle";
      state.error = null;
      state.newPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AddPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.newPost = action.payload;
      })
      .addCase(AddPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetAddPostState } = AddPostSlice.actions;
export default AddPostSlice.reducer;
