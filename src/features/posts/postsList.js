import React, { useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from "./postsSlice";
import PostAuthor from '../posts/PostAuthor'
import { sub } from 'date-fns'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { useDispatch } from "react-redux";

function PostsList() {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts);
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  const renderedPosts = orderedPosts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
        <ReactionButtons post={post} />
      </p>
    </article>
  ));
  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
}

export default PostsList;
