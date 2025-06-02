import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//Async thunk for the registering user
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (formData, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const text = await res.text();
      if (!res.ok) throw new Error(text);
      return text;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

//async thunk for login user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      return data; // { accessToken, tokenType }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

//Slice for auth which will handle the state of the auth
const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle",
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Signup flow
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.message = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Login flow
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.message = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        localStorage.setItem("token", action.payload.accessToken); // Save token
        state.message = "Login successful!";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default AuthSlice.reducer;
