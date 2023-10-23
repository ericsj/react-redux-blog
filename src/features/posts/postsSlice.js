import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

const initialState = {
  posts: [],
  status: 'idle', // idle / loading / succeeded / failed
  error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const response = await axios.get(POSTS_URL)
    return response.data
  } catch (err) {
    return err.message
  }
})
export const createPost = createAsyncThunk('posts/createPost', async (data) => {
  try {
    const response = await axios.post(POSTS_URL, data)
    return response.data
  } catch (err) {
    return err
  }
})
export const updatePost = createAsyncThunk('posts/updatePost', async (data) => {
  try {
    const response = await axios.put(POSTS_URL, data)
    return response.data
  } catch (err) {
    return err
  }
})
const postsSlice = createSlice({
  initialState,
  name: "posts",
  reducers: {
    addPost: {
      reducer: (state, action) => {
        state.posts.push(action.payload);
      },
      prepare: (title, body, userId) => {
        return {
          payload: {
            id: nanoid(),
            title,
            body,
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0
            },
            date: new Date().toISOString(),
            userId,
          },
        };
      },
    },
    setPostStatus: (state, action) => {
      state.status = action.payload
    },
    reactionAdded: (state, action) => {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find(post => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        let min = 1
        const loadedPosts = action.payload.map(post => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString()
          post.reactions = {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0
          }
          return post
        })
        state.posts = state.posts.concat(loadedPosts)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(createPost.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const { userId, title, body } = action.payload
        let min = 1
        let post = {
          title,
          body,
          userId,
          date: sub(new Date(), { minutes: min++ }).toISOString(),
          reactions: {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0
          }
        }
        state.posts.push(post)
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(updatePost.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts.filter(post => post.id !== action.payload.id)
        state.posts.push(action.payload)
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId);
export const getPostsError = (state) => state.posts.error;
export const { reactionAdded, setPostStatus } = postsSlice.actions;
export default postsSlice.reducer;
