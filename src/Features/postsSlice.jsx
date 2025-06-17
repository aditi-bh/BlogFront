import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//asyncthunk has three action types. that are pending, fulfilled and rejected.
//asyncthunk takes a function as an argument which returns a promise. This promise is used to determine the three action types.
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({ pagenum = 0, pagesize = 3 }) => {
    //here we are creating a thunk that will be used to fetch posts from the server
    try {
      const response = await axios.get(
        ` http://localhost:8080/api/posts?pagenum=${pagenum}&pagesize=${pagesize}`
      );
      console.log("api response : ", response.data);
      return response.data;
    } catch (error) {
      console.log("error");
      throw error.response?.data || error;
    }
  }
);

export const AddPosts = createAsyncThunk(
  "posts/AddPosts",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/posts",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log("api response : ", response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

//Slices are used to manage state in the store. They take an initial state and a reducer function as arguments.
const postsSlice = createSlice({
  // createSlice is a function that creates a slice of the state which means it creates a reducer function and an initial state.
  name: "posts",
  initialState: {
    items: [],
    status: "idle", // the initial status of the post can be idle, pending, fulfilled or rejected
    error: null,
    currentPage: 0,
    pageSize: 4,
    totalPages: 0,
    totalElements: 0,
    isLastPage: false,
  },
  reducers: {}, // The reducer is used to handle the state changes when the asyncthunk is not used.
  extraReducers: (builder) => {
    //Extra reducers are used to handle the state changes when the asyncthunk is used.
    builder // builder is a function that is used to add the extra reducers to the slice. It takes a function as an argument.
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        //here the state is updated with the data returned by the server
        state.status = "succeeded";
        state.items = action.payload.cont;
        state.currentPage = action.payload.pageno;
        state.pageSize = action.payload.pagesiz;
        state.totalPages = action.payload.totalpages;
        state.totalElements = action.payload.totalEl;
        state.isLastPage = action.payload.last; //here the action came from the thunk we created earlier
        console.log("fetched posts : ", action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.log("error", action.error.message);
      });
  },
});

export default postsSlice.reducer;
