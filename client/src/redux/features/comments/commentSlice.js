import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';
const initialState = {
  comments: [],
  loading: false,
  error: null,
};

export const createComment = createAsyncThunk(
  'comment/createComment',
  async ({ postId, comment }) => {
    try {
      const { data } = await axios.post(`/comments/${postId}`, {
        postId,
        comment,
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getPostComments = createAsyncThunk(
  'comment/getPostComments',
  async (postId) => {
    try {
      const { data } = await axios.get(`/posts/comments/${postId}`);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: {
    //create comment
    [createComment.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createComment.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments.push(action.payload);
    },
    [createComment.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //get comments
    [getPostComments.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getPostComments.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    },
    [getPostComments.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const commentReducer = commentSlice.reducer;
