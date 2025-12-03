import { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Carlist from "./Carlist";

function Login() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [isAuthenticated, setAuth] = useState(!!sessionStorage.getItem("jwt"));
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    axios
      .post("http://localhost:8080/login", user)
      .then((res) => {
        const token = res.data.token;
        if (token) {
          sessionStorage.setItem("jwt", token);
          setAuth(true);
        }
      })
      .catch(() => setOpen(true));
  };

  const handleLogout = () => {
    sessionStorage.removeItem("jwt");
    setAuth(false);
  };

  if (isAuthenticated) {
    return <Carlist logOut={handleLogout} />;
  }

  return (
    <Stack spacing={2} alignItems="center" mt={4}>
      <TextField label="Username" name="username" onChange={handleChange} />
      <TextField
        label="Password"
        name="password"
        type="password"
        onChange={handleChange}
      />
      <Button variant="outlined" onClick={handleLogin}>
        Login
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        message="Login failed: check username or password"
        onClose={() => setOpen(false)}
      />
    </Stack>
  );
}

export default Login;
