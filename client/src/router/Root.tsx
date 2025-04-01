import { useAuth } from '@/auth/AuthProvider';
import LoginPage from '@/app/login';
import Layout from '@/app';

export function Root() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (<Layout />)
  }
  return <LoginPage />
}