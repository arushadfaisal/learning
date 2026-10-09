import { useState } from 'react'
import { useFilteredPosts, useCreatePost } from './useFilteredPosts'

// CHALLENGE 5 - UI: Filtered Posts & Filter-Aware Mutations
//
// TODO 1: Keep a state for `filterUserId`: 'ALL', 1, 2, or 3.
// TODO 2: Call `useFilteredPosts(filterUserId)` and `useCreatePost(filterUserId)`.
// TODO 3: Render:
//   - Filter buttons: [All Posts], [User 1], [User 2], [User 3].
//   - Notice that switching filters caches each view independently!
//   - A form to create a new post with a title.
//   - When submitting, call `createPost.mutate({ title, body: '' })`.
//   - Verify that the new post immediately appears in the currently viewed filter list!

export default function Question5FilteredPosts() {
  const [filterUserId, setFilterUserId] = useState('ALL')
  const [title, setTitle] = useState('')

  // Call your custom hooks here:
  // const { data: posts, isLoading, error } = useFilteredPosts(filterUserId)
  // const createPost = useCreatePost(filterUserId)

  return (
    <div>
      <h2>Question 5: Filter-Aware Query & Mutation</h2>
      <p style={{ color: '#666' }}>
        Practice: Complex query keys `['posts', { userId }]` with independent cache entries.
      </p>

      {/* 1. Filter buttons: ALL, 1, 2, 3 */}
      {/* 2. New post input and submit button */}
      {/* 3. List of posts for the active filter */}
    </div>
  )
}
