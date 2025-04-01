import { useAuth } from '@/auth/AuthProvider';
import LoginPage from '@/app/login';
import Layout from '@/app';

export function Root() {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated || user) {
    return (<Layout />)
  }
  return <LoginPage />
}