import { useAuth } from '@/auth/AuthProvider';
import LoginPage from '@/app/login';
import Dashboard from '@/app/dashboard';

export function Root() {
  const { isAuthenticated } = useAuth();

  console.log(isAuthenticated);

  if (isAuthenticated) {
    return (<Dashboard />)
  }
  return <LoginPage />
}