import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("App renders header", () => {
  render(<App />);
  expect(screen.getByText(/Car Shop/i)).toBeInTheDocument();
});
