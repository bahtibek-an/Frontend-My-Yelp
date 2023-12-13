import React from "react";
import './style/style.css';
import { PulseLoader } from "react-spinners";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Dashboard = React.lazy(() => import("./Dashboard"));
const Private = React.lazy(() => import("./private/Private"));
const NotFound = React.lazy(() => import("./private/NotFound"));
const Login = React.lazy(() => (import("./SignupAndLogin/Login")));
const Signup = React.lazy(() => import("./SignupAndLogin/Signup"));
const ForgotPass = React.lazy(() => import("./SignupAndLogin/ResetPassword"));

function App() {
  return (
    <Router>
      <React.Suspense fallback={(<PulseLoader className="loading d-flex justify-content-center align-items-center position-absolute" size={40} color={"#198754"} />)}>
        <AuthProvider>
            <Switch>
              <Private exact path="/" component={Dashboard} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/reset" component={ForgotPass} />
              <Route path="/:pageName" component={NotFound} />
            </Switch>
        </AuthProvider>
      </React.Suspense>
    </Router>
  );
}

export default App;
