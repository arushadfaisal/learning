import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Temporal, toTemporalInstant } from 'temporal-polyfill'
import './index.css'
import App from './App.jsx'

// Ensure Temporal is available globally across all browsers (including Safari / older runtimes)
if (typeof globalThis.Temporal === 'undefined') {
  globalThis.Temporal = Temporal
  if (!Date.prototype.toTemporalInstant) {
    Date.prototype.toTemporalInstant = toTemporalInstant
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30,
      refetchOnWindowFocus: false,
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
