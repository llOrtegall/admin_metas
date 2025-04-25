import { URL_API_LOGIN } from '@/utils/constants'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/auth/AuthProvider'
import { FormEvent } from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import { useState } from 'react'
import { Button } from './ui/button'

export const LoginForm = () => {
  const { setIsAuthenticated } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const username = form.username.value.trim()
    const password = form.password.value.trim()

    if (!username || !password) {
      toast.error('Por favor, completa todos los campos')
      return
    }

    setLoading(true)

    try {
      const res = await axios.post(`${URL_API_LOGIN}/login`, { username, password })
      if (res.status === 200) {
        setIsAuthenticated(true)
        toast.success('Inicio de sesión exitoso')
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
      toast.error('Usuario o contraseña incorrectos', { description: 'Por favor, intenta de nuevo' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
      <div className='grid gap-6'>
        <div className='grid gap-3'>
          <Label htmlFor='username'>Usuario</Label>
          <Input
            id='username'
            name='username'
            type='text'
            placeholder='CP1118******'
            required
          />
        </div>
        <div className='grid gap-3'>
          <div className='flex items-center'>
            <Label htmlFor='password'>Password</Label>
            <a
              href='#'
              className='ml-auto text-sm underline-offset-4 hover:underline'
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <Input
            id='password'
            name='password'
            type='password'
            placeholder='*********'
            required
          />
        </div>
        <Button
          disabled={loading}
          className='cursor-pointer'
          type='submit'
        >
          {
            loading ? <div className='flex items-center justify-center gap-2'>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"></path>
              </svg>
              Iniciando ...</div> : 'Iniciar Sesion'
          }
        </Button>
      </div>
    </form>
  )
}