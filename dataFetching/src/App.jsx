import { useState } from 'react'
import Step1Basic from './lessons/Step1Basic'
import Step2UserDetail from './lessons/Step2UserDetail'
import Step3CustomHook from './lessons/Step3CustomHook'
import Step4Query from './lessons/Step4Query'
import Step5Mutation from './lessons/Step5Mutation'
import Question1Todos from './questions/Question1Todos'
import Question2Comments from './questions/Question2Comments'
import Question3DeletePost from './questions/Question3DeletePost'
import Question4Profile from './questions/Question4Profile'
import Question5FilteredPosts from './questions/Question5FilteredPosts'
import Question6OptimisticBookmark from './questions/Question6OptimisticBookmark'

const steps = [
  { label: '1. useEffect', Component: Step1Basic },
  { label: '2. Refetch + races', Component: Step2UserDetail },
  { label: '3. Custom hook', Component: Step3CustomHook },
  { label: '4. TanStack Query', Component: Step4Query },
  { label: '5. Mutations', Component: Step5Mutation },
  { label: 'Q1: Todos Toggle', Component: Question1Todos },
  { label: 'Q2: Comments (Dependent)', Component: Question2Comments },
  { label: 'Q3: Delete Post', Component: Question3DeletePost },
  { label: 'Q4: Profile Editor', Component: Question4Profile },
  { label: 'Q5: Filtered Posts', Component: Question5FilteredPosts },
  { label: 'Q6: Optimistic Bookmark', Component: Question6OptimisticBookmark },
]

export default function App() {
  const [active, setActive] = useState(0)
  const { Component } = steps[active]

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 24, textAlign: 'left' }}>
      <h1>Data Fetching in React</h1>
      <nav style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {steps.map((s, i) => (
          <button
            key={s.label}
            onClick={() => setActive(i)}
            style={{ fontWeight: i === active ? 'bold' : 'normal' }}
          >
            {s.label}
          </button>
        ))}
      </nav>
      <Component />
    </div>
  )
}
