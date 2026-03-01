import { RouterProvider } from 'react-router-dom';

import { AppProviders } from './providers/AppProviders';
import { router } from './router';
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary.tsx";


function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>
    </ErrorBoundary>
  );
}

export default App;
