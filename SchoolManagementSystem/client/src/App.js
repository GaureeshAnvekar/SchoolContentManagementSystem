import React, { Fragment } from "react";
import SchoolHeader from "./Components/layouts/SchoolHeader";
import LoginSection from "./Components/layouts/LoginSection";
import Home from "./Components/layouts/Landing/Home";
import CreateAccount from "./Components/layouts/Landing/CreateAccount";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import psl from "psl";
import PropTypes from "prop-types";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { connect } from "react-redux";
import { getSchoolInfo } from "./actions/getSchoolInfo";

import "./App.css";

function extractHostname(url) {
  var hostname;
  //find & remove protocol (http, ftp, etc.) and get hostname

  if (url.indexOf("//") > -1) {
    hostname = url.split("/")[2];
  } else {
    hostname = url.split("/")[0];
  }

  // find & remove www
  if (url.indexOf("www.") > -1) {
    hostname = url.split("www.")[1];
  }

  //find & remove port number
  hostname = hostname.split(":")[0];
  //find & remove "?"
  hostname = hostname.split("?")[0];

  return hostname;
}

function extractSubDomain(hostName) {
  var subDomain = hostName.split(".");

  if (subDomain.length > 2) {
    return hostName.split(".")[0];
  } else {
    return null;
  }
}

const App = props => {
  if (props.schoolInfo.id == null) {
    let url = "www.pauls.easyschool.com";
    let hostName = extractHostname(url);
    let subDomain = extractSubDomain(hostName); // This will be subdomain for a school.
    // For now avoid PSL, as it is used to validate if a domain exists and returns it if it exists or returns null

    // Dispatch action "getSchoolInfo" to get school details, id and template
    console.log(subDomain);
    getSchoolInfo({ subDomain });

    // check if subdomain exists. Because it can also be a request from the main page i.e. www.easyschool.com
    if (subDomain) {
      console.log(subDomain);
    }
  }

  return (
    <Router>
      <Switch>
        <Route path='/CreateAccount' exact component={CreateAccount}></Route>
        <Route path='/' component={Home}></Route>
      </Switch>
    </Router>
  );
};

App.propTypes = {
  schoolInfo: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  schoolInfo: state.getSchoolInfo
});

export default connect(mapStateToProps, { getSchoolInfo })(App);
