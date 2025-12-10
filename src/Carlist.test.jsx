import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Carlist from "./components/Carlist";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

test("Carlist shows loading text", () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <Carlist />
    </QueryClientProvider>
  );

  expect(screen.getByText(/Loading cars/i)).toBeInTheDocument();
});
