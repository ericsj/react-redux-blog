import React from 'react'
import { useSelector } from 'react-redux'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { selectPostById } from './postsSlice'
import { useParams } from 'react-router-dom'

function SinglePostPage() {

    const { postId } = useParams()
    const post = useSelector(state => selectPostById(state, postId))
    return post ? (
        <article >
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 100)}</p>
            <p className="postCredit">
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
                <ReactionButtons post={post} />
            </p>
        </article>)
        : (<h3>Post not found!</h3>)
}

export default SinglePostPage