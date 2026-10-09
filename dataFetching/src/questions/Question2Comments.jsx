import { useState } from 'react'
import { useComments, useAddComment } from './useComments'

// CHALLENGE 2 - UI: Dependent Comments Explorer
//
// TODO 1: Add state for `postId` (starts at null or 1) and `commentText`.
// TODO 2: Call `useComments(postId)` and `useAddComment(postId)`.
// TODO 3: Render:
//   - Buttons for posts 1 to 5 to select the active `postId`.
//   - A form or input to type a new comment and a button to submit it.
//   - The comments list for the currently selected post.
//   - Clear the input after successfully adding a comment.

export default function Question2Comments() {
  const [postId, setPostId] = useState(1)
  const [body, setBody] = useState('')

  // Call your custom hooks here:
  // const { data: comments, isLoading, error } = useComments(postId)
  // const addComment = useAddComment(postId)

  const { data: comments, isLoading, error } = useComments(postId)
  const addComment = useAddComment(postId)

  return (
    <div>
      <h2>Question 2: Comments Explorer (Dependent Query)</h2>
      <p style={{ color: '#666' }}>
        Rule: Comments should only load when a post is selected. Cache should update per-postId!
      </p>
      
      {<div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}><ul>
        {[1, 2, 3, 4, 5].map((id) => (
          <li key={id}>
            <button onClick={() => setPostId(id)} disabled={postId === id || isLoading}>{id}</button>
          </li>
        ))}
      </ul></div>}
      {postId && <form>
        <input type="text" value={body} onChange={(e) => setBody(e.target.value)} />
        <button type="submit" disabled={addComment.isPending} onClick={(e) => {
          e.preventDefault();
          addComment.mutate({ body });
          setBody('');
        }}>Add Comment</button>
      </form>}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!isLoading && comments?.length === 0 && <p>No comments found</p>}
      {comments && comments.map((comment) => <li key={comment.id}>{comment.body}</li>)}
    </div>
  )
}
