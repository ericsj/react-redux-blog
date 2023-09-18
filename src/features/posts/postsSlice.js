import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
  {
    id: "1",
    title: "Learning Redux",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    content: "I' m watch a YT tutorial about Redux with React",
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffe: 0
    }
  },
  {
    id: "2",
    title: "Learning React",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    content: "I' m watch a YT tutorial about React",
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffe: 0
    }
  },
];

const postsSlice = createSlice({
  initialState,
  name: "posts",
  reducers: {
    addPost: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (title, content, userId) => {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
          },
        };
      },
    },
    reactionAdded: (state, action) => {
      const { postId, reaction } = action.payload
      const existingPost = state.find(post => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    }
  },
});

export const selectAllPosts = (state) => state.posts;
export const { addPost, reactionAdded } = postsSlice.actions;
export default postsSlice.reducer;
