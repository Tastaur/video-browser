import { createBrowserRouter, Navigate } from 'react-router-dom';

import { HomePage } from '../pages/HomePage';
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';


export const router = createBrowserRouter([
  {
    path: '/app',
    element: (
      <ErrorBoundary>
        <HomePage />
      </ErrorBoundary>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/app" replace />,
  },
]);
