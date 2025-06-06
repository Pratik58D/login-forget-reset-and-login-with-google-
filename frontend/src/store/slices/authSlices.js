import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  accessToken : null 
};

// Axios instance to allow reuse
const api = axios.create({
  baseURL: "http://localhost:7000/api/user",
  withCredentials: true,
});


export const registerUser = createAsyncThunk(
  "/auth/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/signup",
        formData
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || "Signup failed");
    }
  }
);

export const logInUser = createAsyncThunk(
  "/auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/login",
        formData,
       
      );
      const {accessToken} = response.data;
      localStorage.setItem("accessToken", accessToken);

      return response.data;


    } catch (err) {
      return rejectWithValue(err.response.data.message || "login failed");
    }
  }
);
export const logOutUser = createAsyncThunk(
  "/auth/logout",
  async (_,{ rejectWithValue }) => {
    try {
      const response = await api.post(
        "/logout"
      );
      localStorage.removeItem("accessToken")
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || "Logout failed");
    }
  }
);

export const checkAuth = createAsyncThunk(
  "user/checkAuth",
  async(_,{rejectWithValue}) =>{
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.get(
        "/check-auth",
       {
        headers : {
          Authorization : `Bearer ${token}`
        }
       }
    );
    return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); 
    }
  } 
);




const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log(state.payload);
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })

      .addCase(logInUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        console.log("result from  login builder:",state.payload);
        state.isLoading = false;
        state.accessToken = action.payload.accessToken
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(logInUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })

      // logout builder

      .addCase(logOutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        console.log(state.payload);
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = false;
      })
      .addCase(logOutUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      });

      //Check AUTh

       builder
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("result from check auth",action.payload);
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success ? true : false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        (state.user = null), (state.error = action.payload); // This contains the error message
      });
  },
});

export default authSlice.reducer;
