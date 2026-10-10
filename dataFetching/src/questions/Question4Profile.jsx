import { useState } from 'react'
import { useUserProfile, useUpdateUserProfile } from './useProfile'

// CHALLENGE 4 - UI: Profile Editor
//
// Build this from scratch without AI autocomplete!
//
// TODO 1: Keep a state for `userId` (e.g. 1, 2, or 3).
// TODO 2: Call `useUserProfile(userId)` and `useUpdateUserProfile(userId)`.
// TODO 3: Render:
//   - Buttons to switch between User 1, 2, and 3.
//   - When user data loads, display their current `name` and `phone`.
//   - An "Edit Profile" section with inputs for new name and new phone.
//   - A "Save Changes" button that calls `updateProfile.mutate({ name, phone })`.
//   - Disable the Save button while `updateProfile.isPending`.
//   - Show loading/error states cleanly.

export default function Question4Profile() {
  const [userId, setUserId] = useState(1)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  // Call your custom hooks here:
  // const { data: user, isLoading, error } = useUserProfile(userId)
  // const updateProfile = useUpdateUserProfile(userId)

  const { data: user, isLoading, error } = useUserProfile(userId)
  const updateProfile = useUpdateUserProfile(userId)

  return (
    <div>
      <h2>Question 4: Profile Editor</h2>
      <p style={{ color: '#666' }}>
        Practice: Single-item query + PATCH mutation + cache update without autocomplete help!
      </p>
      
      {<div className='flex flex-row gap-2'>
        <ul className='flex flex-row gap-2'>
        {[1,2,3].map((id) => (
          <li key={id}>
            <button className='p-2 bg-gray-700 rounded-md' onClick={() => setUserId(id)} disabled={userId === id || isLoading}>{id}</button>
          </li>
        ))}
        </ul>
      </div>
      }
      
      <div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {user && 
          <div className='flex flex-col gap-2'>
            <p>{user.name}</p>
            <p>{user.phone}</p>
          </div>}
      </div>
      {/* 3. Edit form to update name and phone */}
    </div>
  )
}
