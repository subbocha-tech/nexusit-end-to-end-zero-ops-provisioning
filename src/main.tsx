import '@/lib/errorReporter';
import '@/lib/i18n';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
import { CatalogPage } from '@/pages/CatalogPage'
import { BillingPage } from '@/pages/BillingPage'
import { RequestsPage } from '@/pages/RequestsPage'
import { LicensesPage } from '@/pages/LicensesPage'
import { AppLayout } from '@/components/layout/AppLayout'
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout container><HomePage /></AppLayout>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/catalog",
    element: <AppLayout container><CatalogPage /></AppLayout>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/billing",
    element: <AppLayout container><BillingPage /></AppLayout>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/requests",
    element: <AppLayout container><RequestsPage /></AppLayout>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/approvals",
    element: <AppLayout container><RequestsPage /></AppLayout>, // Defaults to logic in RequestsPage handling approvals
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/licenses",
    element: <AppLayout container><LicensesPage /></AppLayout>,
    errorElement: <RouteErrorBoundary />,
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
)