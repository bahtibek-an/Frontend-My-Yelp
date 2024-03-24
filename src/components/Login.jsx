import { Box, Button, Container, FormControl, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import './Login.css';

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
        <Stack direction={"row"} justifyContent={"center"}>
          <Stack
            className="login-form">
            <Box mb={7}>
              <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold" }}>
                Sign in for Yelp
              </Typography>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                Sign in to continue to our platform.
              </Typography>
            </Box>
            <form onSubmit={loginHandler}>
              <FormControl fullWidth>
                <TextField
                  label="Email Address"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormControl>
              {wrongMsg && (
                <Typography variant="body2" color="error" sx={{ mb: 3 }}>
                  Your email or password is Wrong
                </Typography>
              )}
              <Typography variant="body2" sx={{ mb: 3 }}>
                Don't have an account? <Link  id = "h3" to={"/register"}>Register</Link>
              </Typography>
              <Button id="h1" type="submit" variant="contained" fullWidth>
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
