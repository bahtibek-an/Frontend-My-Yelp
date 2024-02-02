
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wrongMsg, setWrongMsg] = useState(false);

  const loginHandler = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(getAuth(), email, password)
      .then(() => setWrongMsg(false))
      .catch(() => setWrongMsg(true));
  };

  return (
    <Box className="login-container">
      <Container>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100vh" }}
        >
          <Stack
            className="login-form"
            spacing={4}
            maxWidth="400px"
            width="100%"
          >
            <Typography variant="h5" textAlign="center" fontWeight="bold">
              Sign in
            </Typography>
            <Typography variant="body1" textAlign="center"></Typography>
            <form onSubmit={loginHandler}>
              <FormControl fullWidth>
                <TextField
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              {wrongMsg && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{ mb: 3, textAlign: "center" }}
                >
                  Your email or password is incorrect
                </Typography>
              )}
              <Typography variant="body2" sx={{ mb: 3, textAlign: "center" }}>
                Don't have an account? <Link to="/register">Register</Link>
              </Typography>
              <Button type="submit" variant="contained" fullWidth>
                Sign in
              </Button>
            </form>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Login;
