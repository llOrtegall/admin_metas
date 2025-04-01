import { AuthProvider } from '@/auth/AuthProvider'
import { RouterProvider } from 'react-router'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { router } from '@/router'
import axios from 'axios'
import './index.css'

axios.defaults.withCredentials = true

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
