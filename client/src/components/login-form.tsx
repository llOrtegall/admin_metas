import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/auth/AuthProvider'
import { FormEvent } from 'react'
import axios from 'axios'
import { APP_NAME, URL_API_LOGIN } from '@/utils/constants'
import { toast } from 'sonner'

export const LoginForm = () => {
  const { setIsAuthenticated } = useAuth()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const username = form.username.value.trim()
    const password = form.password.value.trim()

    if (!username || !password) {
      toast.error('Por favor, completa todos los campos')
      return
    }

    try {
      const res = await axios.post(`${URL_API_LOGIN}/login`, { username, password, app: APP_NAME })
      if (res.status === 200) {
        setIsAuthenticated(true)
        toast.success('Inicio de sesión exitoso')
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
      toast.error('Usuario o contraseña incorrectos', { description: 'Por favor, intenta de nuevo' })
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
        <Button type='submit' className='w-full cursor-pointer'>
          Iniciar Sesión
        </Button>
      </div>
    </form>
  )
}