import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios"

const initialState = {
  isAuthenticated: false,
  isLoading : true,
  user : null
};

export const registerUser = createAsyncThunk(
  "/auth/signup",
  async (formData, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        "http://localhost:7000/api/user/signup",
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || "Signup failed");
    }
  }
);

export const logInUser = createAsyncThunk (
  "/auth/login",
  async( formData,{rejectWithValue} ) => {
    try {
        const response = await axios.post(
        "http://localhost:7000/api/user/login",
      formData,
        {
          withCredentials: true,
        }
        );
        return response.data;

    }catch(err){
      return rejectWithValue(err.response.data.message || "login failed");
    }
  

  }
  
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        console.log(state.payload)
        state.isLoading = false;
        state.user = null;
        state.isAuth = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuth = false;
        (state.user = null)
      })

      .addCase(logInUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logInUser.fulfilled, (state) => {
        console.log(state.payload)
        state.isLoading = false;
        state.user = null;
        state.isAuth = false;
      })
      .addCase(logInUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuth = false;
        state.user = state.payload.user
      })
    }
});


export default authSlice.reducer;
