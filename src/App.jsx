import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Routes } from '~/routes/index.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const router = createBrowserRouter(Routes, {
  future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true,
    v7_startTransition: true,
  },
});

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  )
}

export default App