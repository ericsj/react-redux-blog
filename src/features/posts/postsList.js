import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectAllPosts } from "./postsSlice";
import PostAuthor from '../posts/PostAuthor'

function PostsList() {
  const posts = useSelector(selectAllPosts);

  const renderedPosts = posts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
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
