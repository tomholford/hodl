import { QueryClientProvider, QueryClient } from "react-query";

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
