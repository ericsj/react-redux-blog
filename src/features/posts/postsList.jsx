import React, { useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts, setPostStatus } from "./postsSlice";
import PostAuthor from '../posts/PostAuthor'
import { sub } from 'date-fns'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { useDispatch } from "react-redux";
import PostExcerpt from './PostsExcerpt'
import PostsExcerpt from "./PostsExcerpt";

function PostsList() {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts())
      dispatch(setPostStatus('idle'))
    }
  }, [postsStatus, dispatch])

  let content;
  switch (postsStatus) {
    case 'loading':
      content = <p>Loading...</p>
      break;
    case 'succeeded':
      const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
      content = orderedPosts.map(post => <PostsExcerpt key={post.id} post={post} />)
      break;
    case 'failed':
      content = <p>{error}</p>
      break;
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
}

export default PostsList;
