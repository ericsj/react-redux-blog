import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import { addPost, createPost, fetchPosts, getPostsStatus, setPostStatus } from "./postsSlice";
import { selectAllUsers, selectUsersStatus } from "../users/usersSlice";

function AddPostForm() {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const users = useSelector(selectAllUsers);
  const usersStatus = useSelector(selectUsersStatus);
  const [addRequestStatus, setAddRequestStatus] = useState('idle');
  const [userId, setUserId] = useState();
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setBody(e.target.value);
  const onUserChanged = (e) => setUserId(e.target.value);
  const dispatch = useDispatch();
  const canSave = [title, body, userId].every(v => v !== undefined) && addRequestStatus === 'idle';
  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        dispatch(createPost({ title, body, userId }));
        setTitle("");
        setBody("");
        setUserId("");
      } catch (err) {
        console.error(err)
      } finally {
        setAddRequestStatus('idle');
      }
    }
  };
  if (usersStatus === 'idle') {
    dispatch(fetchPosts())
    dispatch(setPostStatus('idle'))
  }
  let userOptions = []
  useEffect(() => {
    setUserId(users[0].id)
  }, [users])
  if (usersStatus === 'completed') {
    userOptions = users.map((user) => (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    ));
  }

  return usersStatus === 'completed' ? (
    <section>
      <h2>Add a new post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        ></input>
        <label htmlFor="postAuthor">Author:</label>
        <select
          type="text"
          id="postAuthor"
          name="postAuthor"
          value={userOptions[0].id}
          onChange={onUserChanged}
        >
          {userOptions}
        </select>
        <label htmlFor="postContent">Post Content:</label>
        <input
          type="text"
          id="postContent"
          name="postContent"
          value={body}
          onChange={onContentChanged}
        ></input>
        <button disabled={!canSave} type="button" onClick={onSavePostClicked}>
          Save Post
        </button>
      </form>
    </section>
  ) : <p>Loading...</p>;
}

export default AddPostForm;
