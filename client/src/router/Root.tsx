import { Loading } from '@/components/ui/loading';
import { useAuth } from '@/auth/AuthProvider';
import { lazy, Suspense } from 'react';

const LoginPage = lazy(() => import('@/app/login'));
const Layout = lazy(() => import('@/app'));

export function Root() {
  const { user } = useAuth();

  if (!user) return (
    <Suspense fallback={<Loading />}>
      <LoginPage />
    </Suspense>
  )
  
  return (
    <Suspense fallback={<Loading />}>
      <Layout />
    </Suspense>
  )
}