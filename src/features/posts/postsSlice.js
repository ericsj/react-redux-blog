import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    title: "Learning Redux",
    content: "I' m watch a YT tutorial about Redux with React",
  },
  {
    id: "2",
    title: "Learning React",
    content: "I' m watch a YT tutorial about React",
  },
];

const postsSlice = createSlice({
  initialState,
  name: "posts",
  reducers: {
    addPost: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const selectAllPosts = (state) => state.posts;
export const { addPost } = postsSlice.actions;
export default postsSlice.reducer;
