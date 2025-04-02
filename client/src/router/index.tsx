import { createBrowserRouter } from 'react-router';
import { Root } from '@/router/Root';

// Pages
import LogueadosPage from '@/app/logueados';
import SugeridosPage from '@/app/sugeridos';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <div>Welcome to the home page!</div>
      },
      {
        path: '/logueados',
        element: <LogueadosPage />
      },
      {
        path: '/sugeridos',
        element: <SugeridosPage />
      }
    ]
  }
])