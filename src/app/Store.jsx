import { configureStore } from "@reduxjs/toolkit";
import postreducer from "../Features/postsSlice";
import Authreducer from "../Features/AuthSlice";
import userReducer from "../Features/userPostsSlice";

export const Store = configureStore({
  //the store is the central place where all the data is stored
  reducer: {
    auth: Authreducer, //this is the reducer for the auth
    posts: postreducer,
    userPosts: userReducer,
    //the reducer we created in the postsSlice
  },
});
