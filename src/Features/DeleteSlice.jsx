import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const DeletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/posts/${postId}`,

        {
          method: "DELETE",
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

const deletePost = createSlice({
  name: "deletePosts",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetDeleteState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(DeletePost.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(DeletePost.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(DeletePost.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export default deletePost.reducer;
