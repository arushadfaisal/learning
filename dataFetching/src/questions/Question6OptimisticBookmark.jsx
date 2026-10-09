import { useBookmarkablePost, useToggleBookmark } from './useOptimisticBookmark'

// CHALLENGE 6 - UI: Optimistic Bookmark UI
//
// TODO 1: Call `useBookmarkablePost()` and `useToggleBookmark()`.
// TODO 2: Render:
//   - Post title and body.
//   - A "Bookmark" button that toggles between "🔖 Bookmarked" and "📑 Add Bookmark".
//   - Notice that when you click, it toggles INSTANTLY with zero delay!
//   - (Experiment): In DevTools -> Network, set "Offline", click the button, and watch it roll back!

export default function Question6OptimisticBookmark() {
  // Call your custom hooks here:
  // const { data: post, isLoading, error } = useBookmarkablePost()
  // const toggleBookmark = useToggleBookmark()

  return (
    <div>
      <h2>Question 6: Optimistic UI Updates</h2>
      <p style={{ color: '#666' }}>
        Practice: Instant feedback with onMutate + rollback on error!
      </p>

      {/* Render the post and instant-response bookmark toggle button */}
    </div>
  )
}
