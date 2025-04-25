import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { URL_API_LOGIN } from '@/utils/constants'
import { IAuthContext } from '@/types/Interfaces'
import { type User } from '@/types/User'
import axios from 'axios'

const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [empresa, setEmpresa] = useState<string>('Multired')
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    axios.get<User>(`${URL_API_LOGIN}/profile`)
     .then( res => {
        if (res.status === 200) {
          setUser(res.data)
        } else {
          setUser(null)
        }
     })
  }, [isAuthenticated])

  return (
    <AuthContext.Provider value={{ user, setUser, empresa, setEmpresa, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook personalizado para usar el contexto de autenticación
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context
}