import React, { useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from "./postsSlice";
import PostAuthor from '../posts/PostAuthor'
import { sub } from 'date-fns'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { useDispatch } from "react-redux";
import PostExcerpt from './PostsExcerpt'

function PostsList() {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postsStatus, dispatch])

  const renderedPosts = orderedPosts.map((post) => <PostExcerpt post={post} />);
  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
}

export default PostsList;
