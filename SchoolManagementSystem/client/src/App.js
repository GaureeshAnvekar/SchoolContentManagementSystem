import React, { Fragment } from "react";
import SchoolHeader from "./Components/layouts/SchoolHeader";
import LoginSection from "./Components/layouts/LoginSection";
import Home from "./Components/layouts/Landing/Home";
import CreateAccount from "./Components/layouts/Landing/CreateAccount";
import MainPage from "./Components/layouts/SchoolMainPage/MainPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import psl from "psl";
import PropTypes from "prop-types";
import axios from "axios";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { connect } from "react-redux";
import { setSchoolInfo } from "./actions/setSchoolInfo";
import { setTemplate } from "./actions/setTemplate";

import "./App.css";

var schoolId;
var templateNum;

// Get school information like Id, template num.
const schoolInfoApi = async (subDomain, props) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    subDomain
  });

  try {
    //Before creating action object and dispatching, make an http request.
    const res = await axios.post(
      "http://localhost:5000/api/schools/schoolInfo",
      body,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    schoolId = res.data.schoolInfo.id;
    templateNum = res.data.schoolInfo.template;

    // Dispatch "setSchoolInfo" action to store data in store.
    props.setSchoolInfo({ payload: res.data.schoolInfo });
    // Dispatch action "setTemplate" which will select appropriate colors according to the template of the school
    props.setTemplate({ template: templateNum });
  } catch (err) {
    //console.log("here" + err.response.data.errors);
    //const errors = err.response.data.errors; // This are the validation (check) errors performed at express backend
    //Not sure
  }
};

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
  console.log(props.schoolInfo.id);
  if (props.schoolInfo.id == null) {
    let url = window.location.href;
    let hostName = extractHostname(url);
    let subDomain = extractSubDomain(hostName); // This will be subdomain for a school.
    // For now avoid PSL, as it is used to validate if a domain exists and returns it if it exists or returns null

    // Call school info api, which will store the school id and template num used.
    schoolInfoApi(subDomain, props);
  }

  return (
    <Router>
      <Switch>
        <Route path='/CreateAccount' exact component={CreateAccount}></Route>
        <Route path='/' exact component={Home}></Route>
        <Route path='/School' exact component={MainPage}></Route>
      </Switch>
    </Router>
  );
};

App.propTypes = {
  schoolInfo: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  schoolInfo: state.setSchoolInfo
});

export default connect(mapStateToProps, { setSchoolInfo, setTemplate })(App);
