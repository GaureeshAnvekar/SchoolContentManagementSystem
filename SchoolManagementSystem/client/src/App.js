import React, { Fragment } from "react";
import SchoolHeader from "./Components/layouts/SchoolHeader";
import LoginSection from "./Components/layouts/LoginSection";
import Home from "./Components/layouts/Landing/Home";
import CreateAccount from "./Components/layouts/Landing/CreateAccount";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/CreateAccount' exact component={CreateAccount}></Route>
        <Route path='/' component={Home}></Route>
      </Switch>
    </Router>
  );
};

export default App;
