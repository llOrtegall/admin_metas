import { LoginForm } from '@/components/login-form'
import { GalleryVerticalEnd } from 'lucide-react'
import { Toaster } from 'sonner'

export default function LoginPage() {

  return (
    <main className='grid lg:grid-cols-2'>
      <div className='flex flex-col gap-4 p-6 md:p-10 h-screen'>
        <div className='flex justify-center gap-2 md:justify-start'>
          <article className='flex items-center gap-2 font-medium'>
            <div className='flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground'>
              <GalleryVerticalEnd className='size-4' />
            </div>
            Grupo Empresarial Multired / Servired - Metas Administrativo
          </article>
        </div>
        <div className='flex flex-1 items-center justify-center pb-12'>
          <div className='w-full max-w-xs'>
            <LoginForm />
          </div>
        </div>
      </div>
      <div className='relative hidden bg-muted lg:block h-screen'>
        <img
          src='/seguimento.webp'
          alt='Image'
          className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
        />
      </div>
      <Toaster richColors position='top-right' duration={5000} visibleToasts={3} />
    </main>
  )
}
