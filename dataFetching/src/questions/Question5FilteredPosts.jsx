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
  const [body, setBody] = useState('')

  // Call your custom hooks here:
  const { data: posts, isLoading, error } = useFilteredPosts(filterUserId)
  const createPost = useCreatePost(filterUserId)

  const handleSubmit = (e) => {
    e.preventDefault()
    createPost.mutate({ title, body })
    setTitle('')
    setBody('')
  }

  return (
    <div>
      <h2>Question 5: Filter-Aware Query & Mutation</h2>
      

      {<div className='flex flex-row gap-2'>
        <ul className='flex flex-row gap-2'>
        {['ALL',1,2,3].map((id) => (
          <li key={id}>
            <button className='p-2 bg-gray-700 rounded-md' onClick={() => setFilterUserId(id)} disabled={filterUserId === id || isLoading}>{id}</button>
          </li>
        ))}
        </ul>
      </div>
      }

      {
      <form className='flex flex-col gap-4 bg-gray-700 p-4 my-2 rounded-xl' onSubmit={handleSubmit}>
        <h2 className='text-gray-200'>Add Post</h2>
        <input type="text" className='bg-gray-800 rounded-xl p-2' placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)}></input>
        <input type="text" className='bg-gray-800 rounded-xl p-2' placeholder="Post Text" value={body} onChange={(e)=>setBody(e.target.value)}></input>
        <button type="submit" disabled={createPost.isPending} className='bg-blue-500 max-w-20 rounded-md p-1 text-gray-100'>{createPost.isPending ? 'Saving...' : 'Add'}</button>       
      </form>
      }
      
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!isLoading && posts?.length === 0 && <p>No comments found</p>}
      {posts && posts?.map((post) => 
        <ul key={post.id}>
          <li className='font-bold text-lg'>{post.title}</li>
          <li className='text-md'>{post.body}</li>
        </ul>
      )}
    </div>
  )
}
