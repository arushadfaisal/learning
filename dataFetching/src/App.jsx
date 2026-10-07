import { useState } from 'react'
import Step1Basic from './lessons/Step1Basic'
import Step2UserDetail from './lessons/Step2UserDetail'
import Step3CustomHook from './lessons/Step3CustomHook'
import Step4Query from './lessons/Step4Query'
import Step5Mutation from './lessons/Step5Mutation'

const steps = [
  { label: '1. useEffect', Component: Step1Basic },
  { label: '2. Refetch + races', Component: Step2UserDetail },
  { label: '3. Custom hook', Component: Step3CustomHook },
  { label: '4. TanStack Query', Component: Step4Query },
  { label: '5. Mutations', Component: Step5Mutation },
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
