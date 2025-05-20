import { createBrowserRouter } from 'react-router';
import { Loading } from '@/components/ui/loading';
import { lazy, Suspense } from 'react';
import { Root } from '@/router/Root';

const Dashboard = lazy(() => import('@/app/dashboard'));
const LogueadosPage = lazy(() => import('@/app/logueados'));
const SugeridosPage = lazy(() => import('@/app/sugeridos'));
const SucursalesPage = lazy(() => import('@/app/sucursales'));
const InfoSucursal = lazy(() => import('@/app/sucursales/info-sucursal'));
const Transacciones = lazy(() => import('@/app/transacciones'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Dashboard />
          </Suspense>
        )
      },
      {
        path: '/logueados',
        element: (
          <Suspense fallback={<Loading />}>
            <LogueadosPage />
          </Suspense>
        )
      },
      {
        path: '/sugeridos',
        element: (
          <Suspense fallback={<Loading />}>
            <SugeridosPage />
          </Suspense>
        )
      },
      {
        path: '/sucursales',
        element: (
          <Suspense fallback={<Loading />}>
            <SucursalesPage />
          </Suspense>
        )
      },
      {
        path: '/sucursales/:id',
        element: (
          <Suspense fallback={<Loading />}>
            <InfoSucursal />
          </Suspense>
        )
      },
      {
        path: '/transacciones',
        element: (
          <Suspense fallback={<Loading />}>
            <Transacciones />
          </Suspense>
        )
      }
    ]
  }
])