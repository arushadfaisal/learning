import { usePosts, useDeletePost } from './usePostsDelete'

// CHALLENGE 3 - UI: Delete Post & Item-Level Pending State
//
// TODO 1: Call `usePosts()` and `useDeletePost()`.
// TODO 2: Render the posts list with a "Delete" button next to each item.
// TODO 3: When clicking "Delete", call `deletePost.mutate(post.id)`.
// TODO 4: (The UX Pro Challenge):
//   Look at `deletePost.variables`!
//   When a mutation is pending, `deletePost.variables` holds the `postId` of the item currently being deleted.
//   Make only THAT specific post's button say "Deleting..." and disable it, while keeping all other buttons clickable!

export default function Question3DeletePost() {
  // Call your custom hooks here:
  // const { data: posts, isLoading, error } = usePosts()
  // const deletePost = useDeletePost()

  const { data: posts, isLoading, error } = usePosts()
  const deletePost = useDeletePost()

  return (
    <div>
      <h2>Question 3: Delete Post (Cache Eviction & Item-level Pending)</h2>
      <p style={{ color: '#666' }}>
        Rule: Evict the item from the cache on success. Make only the clicked button show "Deleting..."!
      </p>

      {/* Render list of posts with individual Delete buttons */}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {posts && posts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <button onClick={() => deletePost.mutate(post.id)} disabled={deletePost.isPending && deletePost.variables === post.id}>
            {deletePost.isPending && deletePost.variables === post.id ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      ))}
    </div>
  )
}
