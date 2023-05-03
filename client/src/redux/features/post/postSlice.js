import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

const initialState = {
  posts: [],
  popularPosts: [],
  loading: false,
  error: null,
};

export const createPost = createAsyncThunk(
  'post/createPost',
  async (params) => {
    try {
      const { data } = await axios.post('/posts', params);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
// remove post
export const removePost = createAsyncThunk('post/removePost', async (id) => {
  try {
    const { data } = await axios.delete(`/posts/${id}`, id);

    return data;
  } catch (error) {
    console.log(error);
  }
});

//update post
export const updatePost = createAsyncThunk(
  'post/updatePost',
  async (updatedPost) => {
    try {
      const { data } = await axios.put(`/posts/${updatedPost.id}`, updatedPost);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllPosts = createAsyncThunk('post/getAllPosts', async () => {
  try {
    const { data } = await axios.get('/posts');
    return data;
  } catch (error) {
    console.log(error);
  }
});

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: {
    //create post
    [createPost.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts.push(action.payload);
    },
    [createPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // get all posts
    [getAllPosts.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload.posts;
      state.popularPosts = action.payload.popularPosts;
    },
    [getAllPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // remove post
    [removePost.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [removePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload._id
      );
    },
    [removePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // updated post
    [updatePost.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.loading = false;

      const index = state.posts.findIndex(
        (post) => post._id === action.payload._id
      );

      state.posts[index] = action.payload;
    },
    [updatePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const postReducer = postSlice.reducer;
export const {} = postSlice.actions;
