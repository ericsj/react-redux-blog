import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
  {
    id: "1",
    title: "Learning Redux",
    date: sub(new Date(), {minutes: 10}).toISOString(),
    content: "I' m watch a YT tutorial about Redux with React",
  },
  {
    id: "2",
    title: "Learning React",
    date: sub(new Date(), {minutes: 10}).toISOString(),
    content: "I' m watch a YT tutorial about React",
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
  },
});

export const selectAllPosts = (state) => state.posts;
export const { addPost } = postsSlice.actions;
export default postsSlice.reducer;
