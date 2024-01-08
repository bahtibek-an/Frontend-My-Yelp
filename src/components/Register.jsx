import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import '../firebase/config'
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import { addDoc } from "firebase/firestore";

const Register = ({itemCollectionAccount}) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showConfirmMassage, setShowConfirmMassage] = useState(false)
  const [errorMsg, setErrorMsg] = useState(false)

  const confirmPass = () => {
    if (confirmPassword == password) {
      return true
    }
    return false
  }

  const submitForm = (e) => {
    e.preventDefault()
    const confirm = confirmPass()
    if (confirm) {
      createUserWithEmailAndPassword(getAuth(), email, password)
        .catch(() => setErrorMsg(true))
      addDoc(itemCollectionAccount, {
        userName,
        email,
      } )
    }else{
      setShowConfirmMassage(true)
    }
  }

  return (
    <Box sx={{ background: "#f3f4f6" }} height={"100vh"}>
      <Container>
        <Stack direction={"row"} justifyContent={"center"}>
          <Stack
            width={"500px"}
            sx={{
              background: "white",
              mt: "100px",
              p: "10px 20px",
              borderRadius: "10px",
            }}
          >
            <Box mb={7}>
              <Typography
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "25px",
                }}
              >
                Sign up for Yelp
              </Typography>
              <Typography fontSize={15} sx={{ textAlign: "center" }}>
                Sign up to continue to our platform.
              </Typography>
            </Box>
            <form onSubmit={submitForm}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box mb={2}>
                    <label htmlFor="user" className="form-label">
                      User Name
                    </label>
                    <input
                      type="text"
                      name="user"
                      className="form-control"
                      onChange={(e) => setUserName(e.target.value)}
                      value={userName}
                      required
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box mb={2}>
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      onChange={e => setPassword(e.target.value)}
                      value={password}
                      required
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box mb={2}>
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      onChange={e => setEmail(e.target.value)}
                      value={email}
                      required
                    />
                  </Box>  
                </Grid>
                <Grid item xs={6}>
                  <Box mb={2}>
                    <label htmlFor="password" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      onChange={e => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                      required
                    />
                    {showConfirmMassage && <Typography fontSize={14} color={'red'}>Please Confirm your password</Typography>}
                  </Box>
                </Grid>
              </Grid>
              {errorMsg && <Typography color={'red'} fontSize={14} >Change you Email or Password</Typography>}
              <Typography mb={3}>
                You have an account? <Link to={"/login"}>Login</Link>
              </Typography>
              <Stack direction={"row"} justifyContent={"center"}>
                <Button type="submit" variant="contained" sx={{ mt: "10px", width: "250px" }}>
                  Sign up
                </Button>
              </Stack>
            </form>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Register;
