import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { URL_API_LOGIN, APP_NAME } from '@/utils/constants'
import { IAuthContext } from '@/types/Interfaces'
import { type User } from '@/types/User'
import axios from 'axios'

// Crear el contexto de autenticación
const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [empresa, setEmpresa] = useState<string>('Multired')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Función para validar la cookie de sesión
  const validateCookie = (): boolean => {
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${APP_NAME}=`))
    return !!cookie
  }

  // Función para obtener el perfil del usuario
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${URL_API_LOGIN}/profile`, { params: { app: APP_NAME } })
      if (response.status === 200) {
        setIsAuthenticated(true)
        setUser(response.data)
      }
    } catch (error) {
      console.log(error);
  
      /*
      if (error.response?.status === 401) {
        setIsAuthenticated(false)
        setUser(null)
      } else {
        console.error('Error al obtener el perfil del usuario:', error)
      }
        */
    }
  }

  // Efecto para validar la sesión al cargar la aplicación
  useEffect(() => {
    const initializeAuth = async () => {
      if (!validateCookie()) {
        setIsAuthenticated(false)
        setUser(null)
        return
      }
      await fetchUserProfile()
    }

    initializeAuth()
  }, []) // Dependencia vacía para ejecutar solo una vez al montar el componente

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, empresa, setEmpresa }}>
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