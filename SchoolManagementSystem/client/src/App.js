import React, { Fragment, useState } from "react";
import SchoolHeader from "./Components/layouts/SchoolHeader";
import LoginSection from "./Components/layouts/LoginSection";
import Home from "./Components/layouts/Landing/Home";
import CreateAccount from "./Components/layouts/Landing/CreateAccount";
//import DashBoard from "./Components/layouts/SchoolMainPage/DashBoard";
import StudentDashBoard from "./Components/layouts/StudentPage/StudentDashBoard";
import EmployeeDashBoard from "./Components/layouts/EmployeePage/EmployeeDashBoard";
import LibraryDashBoard from "./Components/layouts/LibraryPage/LibraryDashBoard";
import MainPage from "./Components/layouts/SchoolMainPage/MainPage";
import AttendanceStatus from "./Components/layouts/StudentPage/AttendanceStatus";
import EmployeeBeginLecture from "./Components/layouts/EmployeePage/EmployeeBeginLecture";
import StudentBeginLecture from "./Components/layouts/StudentPage/StudentBeginLecture";
import PrivateRoute from "./Components/Routing/PrivateRoute";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import psl from "psl";
import PropTypes from "prop-types";
import axios from "axios";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { connect } from "react-redux";
import { setSchoolInfo } from "./actions/setSchoolInfo";
import { setTemplate } from "./actions/setTemplate";
import { auth } from "./actions/auth";
import { studentAuth } from "./actions/Student/studentAuth";
import { decodeJWT } from "./actions/decodeJWT";

import "./App.css";

var schoolId;
var templateNum;

// Get school information like Id, template num.
const schoolInfoApi = async (subDomain, props) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    subDomain,
  });

  try {
    //Before creating action object and dispatching, make an https request.

    const res = await axios.post(
      //"https://easyschool.academy/api/schools/schoolInfo",
      "httpss://easyschool.academy/api/schools/schoolInfo",
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    schoolId = res.data.schoolInfo.id;
    templateNum = res.data.schoolInfo.template;

    // Dispatch "setSchoolInfo" action to store data in store.

    // console.log("App set school action " + props.schoolInfo.id);
    props.setSchoolInfo({ payload: res.data.schoolInfo });
    //console.log("App set school action " + props.schoolInfo.id);
    // Dispatch action "setTemplate" which will select appropriate colors according to the template of the school
    props.setTemplate({ template: templateNum });
    return schoolId;
  } catch (err) {
    //console.log("here" + err.response.data.errors);
    //const errors = err.response.data.errors; // This are the validation (check) errors performed at express backend
    //Not sure
  }
};

function extractHostname(url) {
  var hostname;
  //find & remove protocol (https, ftp, etc.) and get hostname

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

const App = (props) => {
  var url = window.location.href;
  console.log(url);
  //Check if url is easyschool.com OR some school main page like pauls.easyschool.com
  if (url.split(".").length >= 3) {
    if (props.schoolInfo.id == null) {
      let hostName = extractHostname(url);
      let subDomain = extractSubDomain(hostName); // This will be subdomain for a school.
      // For now avoid PSL, as it is used to validate if a domain exists and returns it if it exists or returns null

      // Dispatch "schoolInfo" action & "templateInfo" action
      let id = schoolInfoApi(subDomain, props);
    }
  }
  return (
    <Router>
      <Switch>
        <Route path='/CreateAccount' exact component={CreateAccount}></Route>
        <Route path='/ads' exact component={Home}></Route> 
        <Route
          path='/'
          exact
          render={() => (
            <MainPage
              schoolInfo={props.schoolInfo}
              templateInfo={props.templateInfo}
            />
          )}
        />
        <PrivateRoute
          path='/studentDashBoard'
          exact
          schoolInfo={props.schoolInfo}
          templateInfo={props.templateInfo}
          component={StudentDashBoard}
        />
        <PrivateRoute
          path='/libraryDashBoard'
          exact
          schoolInfo={props.schoolInfo}
          templateInfo={props.templateInfo}
          component={LibraryDashBoard}
        />
        <PrivateRoute
          path='/employeeDashBoard'
          exact
          schoolInfo={props.schoolInfo}
          templateInfo={props.templateInfo}
          component={EmployeeDashBoard}
        />
        <PrivateRoute
          path='/employeeBeginLecture'
          exact
          schoolInfo={props.schoolInfo}
          templateInfo={props.templateInfo}
          component={EmployeeBeginLecture}
        />
        <PrivateRoute
          path='/studentBeginLecture'
          exact
          schoolInfo={props.schoolInfo}
          templateInfo={props.templateInfo}
          component={StudentBeginLecture}
        />
      </Switch>
    </Router>
  );
};

App.propTypes = {
  setSchoolInfo: PropTypes.func.isRequired,
  setTemplate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  schoolInfo: state.setSchoolInfo,
  templateInfo: state.setTemplate,
});
export default connect(mapStateToProps, {
  setSchoolInfo,
  setTemplate,
})(App);
