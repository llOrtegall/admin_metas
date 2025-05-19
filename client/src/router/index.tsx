import { createBrowserRouter } from 'react-router';
import { Root } from '@/router/Root';

// Pages
import LogueadosPage from '@/app/logueados';
import SugeridosPage from '@/app/sugeridos';
import SucursalesPage from '@/app/sucursales';
import InfoSucursal from '@/app/sucursales/info-sucursal';
import Transacciones from '@/app/transacciones';
import Dashboard from '@/app/dashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: '/logueados',
        element: <LogueadosPage />
      },
      {
        path: '/sugeridos',
        element: <SugeridosPage />
      },
      {
        path: '/sucursales',
        element: <SucursalesPage />
      },
      {
        path: '/sucursales/:id',
        element: <InfoSucursal />
      },
      {
        path: '/transacciones',
        element: <Transacciones />
      }
    ]
  }
])