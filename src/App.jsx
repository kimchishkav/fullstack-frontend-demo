import { useState } from "react";
import Login from "./components/Login";
import Carlist from "./components/Carlist";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const queryClient = new QueryClient();

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Container maxWidth="xl">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Car Shop</Typography>
        </Toolbar>
      </AppBar>

      <QueryClientProvider client={queryClient}>
        {!token ? (
          <Login onLogin={handleLogin} />
        ) : (
          <Carlist onLogout={handleLogout} />
        )}
      </QueryClientProvider>
    </Container>
  );
}

export default App;
