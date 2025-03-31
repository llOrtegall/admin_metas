import { createRoot } from 'react-dom/client'
import Dashboard from '@/app/dashboard'
import { StrictMode } from 'react'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Dashboard />
  </StrictMode>,
)
