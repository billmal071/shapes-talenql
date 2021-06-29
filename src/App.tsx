import React from 'react';
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Shapes from './components/shapes/Shapes';
import Login from './components/login/Login';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PrivateRoute from './utilties/PrivateRoute';
import LoginState from "./context/login/LoginState";

function App() {
  return (
    <LoginState>
      <Router>
        <Header />
        <Switch>
          <PrivateRoute exact={true} path="/" component={Shapes} />
          <Route exact={true} path="/login" component={Login} />
        </Switch>
        <Footer />
      </Router>
    </LoginState>
  )
}

export default App
