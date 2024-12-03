import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AppointmentDetailsPage } from "./pages";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchInterval: Infinity,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppointmentDetailsPage />
    </QueryClientProvider>
  );
}

export default App;
