// src/redux/userPostsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserPosts = createAsyncThunk(
  "userPosts/fetchUserPosts",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    console.log(token);

    try {
      const response = await axios.get(
        "http://localhost:8080/api/posts/user/posts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const userPostsSlice = createSlice({
  name: "userPosts",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default userPostsSlice.reducer;
