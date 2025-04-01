import { createContext, useContext, useEffect, useState, Dispatch, ReactNode, SetStateAction } from 'react'
import { URL_API_LOGIN, APP_NAME } from '@/utils/constants';
import { type User } from '@/types/User'
import axios from 'axios'

interface IAuthContext {
  isAuthenticated: boolean
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
  empresa: string
  setEmpresa: Dispatch<SetStateAction<string>>
}

const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [empresa, setEmpresa] = useState<string>('Mulited')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const cookie = document.cookie

    if (!cookie && cookie.split('=')[0] !== APP_NAME) {
      setIsAuthenticated(false)
      setUser(null)
      return
    }

    axios.get(`${URL_API_LOGIN}/profile`, { params: { app: APP_NAME } })
      .then(res => {
        if (res.status === 200) {
          setIsAuthenticated(true)
          setUser(res.data)
        }
      })
      .catch(error => {
        if (error.response.status === 401) {
          setIsAuthenticated(false)
          setUser(null)
        }
      })
  }, [isAuthenticated])

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, empresa, setEmpresa }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}