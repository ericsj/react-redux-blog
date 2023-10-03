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

const postsSlice = createSlice({
  initialState,
  name: "posts",
  reducers: {
    addPost: {
      reducer: (state, action) => {
        state.posts.push(action.payload);
      },
      prepare: (title, content, userId) => {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
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
        const { userId, title, content } = action
        let min = 1
        let post = {
          title,
          content,
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
  }
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const { reactionAdded } = postsSlice.actions;
export default postsSlice.reducer;
