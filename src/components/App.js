import React from "react";
import "./style/style.css";
import { PulseLoader } from "react-spinners";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Dashboard = React.lazy(() => import("./Dashboard.jsx"));
const Private = React.lazy(() => import("./private/Private"));
const NotFound = React.lazy(() => import("./private/NotFound.jsx"));
const Login = React.lazy(() => (import("./SignupAndLogin/Login.jsx")));
const Signup = React.lazy(() => import("./SignupAndLogin/Signup.jsx"));
const ResetPassword = React.lazy(() => import("./SignupAndLogin/ResetPassword.jsx"));

function App() {
  return (
    <>
      <main className="main">
        <Router>
          <React.Suspense fallback={(<PulseLoader className="loading d-flex justify-content-center align-items-center position-absolute" size={40} color={"#198754"} />)}>
            <AuthProvider>
                <Switch>
                  <Private exact path="/" component={Dashboard} />
                  <Route path="/signup" component={Signup} />
                  <Route path="/login" component={Login} />
                  <Route path="/reset" component={ResetPassword} />
                  <Route path="/:pageName" component={NotFound} />
                </Switch>
            </AuthProvider>
          </React.Suspense>
        </Router>
      </main>
    </>
  );
};

export default App;