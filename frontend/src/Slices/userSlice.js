import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: {},
  isAuthenticated: false,
  loading: true,
  error: null,
  message: '',
  success: false,
};

// Create an async thunk for user login
export const loginUser = createAsyncThunk('user/login', async ({email, password}, { rejectWithValue }) => {
  try {
    console.log(email);
    console.log(password);
    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await axios.post(`/api/v1/login`, {email,password}, config);
    return data.user;
  } catch (error) {
    console.log(error.response.data);
    return rejectWithValue(error.response.data.message);
  }
});

// Create an async thunk for user registration
export const registerUser = createAsyncThunk('user/register', async ({userData}, { rejectWithValue }) => {
  try {
    console.log(userData);
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const { data } = await axios.post(`/api/v1/register`, userData, config);
    return data.user;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

// Create an async thunk for loading user
export const loadUser = createAsyncThunk('user/loadUser', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/v1/me`);
    return data.user;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

// Create an async thunk for user logout
export const logoutUser = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
  try {
    await axios.get(`/api/v1/logout`);
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

// Create an async thunk for updating user profile
export const updateProfileUser = createAsyncThunk('user/updateProfile', async (userData, { rejectWithValue }) => {
  try {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const { data } = await axios.put(`/api/v1/me/update`, userData, config);
    return data.success;
  } catch (error) {
    console.log("user");
    console.log(error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
});

// Create an async thunk for updating user password
export const updatePasswordUser = createAsyncThunk('user/updatePassword', async (passwords, { rejectWithValue }) => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await axios.put(`/api/v1/password/update`, passwords, config);
    return data.success;
  } catch (error) {
    console.log("user");
    console.log(error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
});

// Create an async thunk for sending forgot password email
export const forgotPasswordUser = createAsyncThunk('user/forgotPassword', async (email, { rejectWithValue }) => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await axios.post(`/api/v1/password/forgot`, email, config);
    return data.message;
  } catch (error) {
    console.log("user");
    console.log(error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
});

// Create an async thunk for resetting password
export const resetPasswordUser = createAsyncThunk('user/resetPassword', async (params, { rejectWithValue }) => {
  try {
    const { token, passwords } = params;
    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await axios.put(`/api/v1/password/reset/${token}`, passwords, config);
    return data.success;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

// Create an async thunk for fetching all users (admin)
export const fetchAllUsers = createAsyncThunk('user/fetchAllUsers', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/v1/admin/users`);
    return data.users;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

// Create an async thunk for fetching user details (admin)
export const fetchUserDetails = createAsyncThunk('user/fetchUserDetails', async (id, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/v1/admin/user/${id}`);
    return data.user;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

// Create the user slice using createSlice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfileUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfileUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateProfileUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePasswordUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePasswordUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(updatePasswordUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(forgotPasswordUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPasswordUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(forgotPasswordUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPasswordUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPasswordUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(resetPasswordUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the user slice and its actions
export const { clearUserErrors } = userSlice.actions;

// Export the user reducer
export default userSlice.reducer;
