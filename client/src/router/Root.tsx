import { useAuth } from '@/auth/AuthProvider';
import LoginPage from '@/app/login';
import Layout from '@/app';

export function Root() {
  const { user } = useAuth();

  if (!user) return <LoginPage />
  
  return <Layout />
}