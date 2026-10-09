# React Data Fetching - Practice Challenges

Master the **Production Gold Standard**: combining **Custom Domain Hooks** with **TanStack Query (`useQuery` & `useMutation`)**.

---

## The Rule of Best Practice:
> **UI components must NOT call `useQuery` or `useMutation` directly.**
>
> 1. All network logic, query keys, and cache manipulations belong in **Custom Hooks**.
> 2. The UI component should only import and call your custom hooks, keeping the UI 100% focused on presentation.

---

## Round 1 Challenges (Completed! 🎉)
- **Challenge 1: The Todo Toggle** (`useTodos.js` & `Question1Todos.jsx`)
  - Status: Completed! Mastered `setQueryData` mapping.
- **Challenge 2: Dependent Comments Explorer** (`useComments.js` & `Question2Comments.jsx`)
  - Status: Completed! Mastered `enabled: !!postId` and Rules of Hooks.
- **Challenge 3: Delete Post & Item-Level Pending State** (`usePostsDelete.js` & `Question3DeletePost.jsx`)
  - Status: Completed! Mastered `filter` eviction and `mutation.variables === post.id`.

---

## Round 2 Challenges (Build from Scratch without Autocomplete! 🚀)

### Challenge 4: Profile Editor (Single-Item Mutation)
- **Files**: `src/questions/useProfile.js` & `src/questions/Question4Profile.jsx`
- **Concept**: Query a single user by ID (`['user', userId]`), provide edit inputs, and send a `PATCH` request to update `name` and `phone`.
- **Target**: Update the single-item cache locker `['user', userId]` cleanly on success.

### Challenge 5: Filter-Aware Query & Mutation (Dynamic Keys)
- **Files**: `src/questions/useFilteredPosts.js` & `src/questions/Question5FilteredPosts.jsx`
- **Concept**: Complex query keys with objects: `['posts', { userId: selectedUserId }]`.
- **Target**: Switching filters ('ALL', 1, 2, 3) caches each view independently. Creating a post adds it directly into the currently active filter's cache!

### Challenge 6: Optimistic Bookmark (Instant Feedback)
- **Files**: `src/questions/useOptimisticBookmark.js` & `src/questions/Question6OptimisticBookmark.jsx`
- **Concept**: The crown jewel of modern frontend engineering: **Optimistic Updates** using `onMutate` and `onError` rollback.
- **Target**: The UI updates *before* the server responds. If network fails or is set to Offline, it automatically rolls back!
