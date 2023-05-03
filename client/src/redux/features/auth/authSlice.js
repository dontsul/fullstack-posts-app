import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
};

export const registrationUser = createAsyncThunk(
  'auth/registrationUser',
  async ({ username, password }) => {
    try {
      const { data } = await axios.post('/auth/registration', {
        username,
        password,
      });

      if (data.token) {
        window.localStorage.setItem('token', data.token);
      }

      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }) => {
    try {
      const { data } = await axios.post('/auth/login', {
        username,
        password,
      });

      if (data.token) {
        window.localStorage.setItem('token', data.token);
      }

      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getMe = createAsyncThunk('auth/loginUser', async () => {
  try {
    const { data } = await axios.post('/auth/me');
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.status = null;
    },
  },
  extraReducers: {
    [registrationUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [registrationUser.pending]: (state, action) => {
      state.isLoading = true;
      state.status = null;
    },
    [registrationUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [loginUser.pending]: (state, action) => {
      state.isLoading = true;
      state.status = null;
    },
    [loginUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    },
    // проверка авторизации
    [getMe.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = null;
      state.user = action.payload?.user;
      state.token = action.payload?.token;
    },
    [getMe.pending]: (state, action) => {
      state.isLoading = true;
      state.status = null;
    },
    [getMe.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    },
  },
});

export const checkIsAuth = (state) => Boolean(state.auth.token);

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
