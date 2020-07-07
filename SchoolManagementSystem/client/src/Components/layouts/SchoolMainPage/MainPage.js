import React, { useEffect } from "react";
import SchoolHeader from "../SchoolHeader";
import LoginSection from "../LoginSection";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { decodeJWT } from "../../../actions/decodeJWT";
import { studentAuth } from "../../../actions/Student/studentAuth";
import { libraryAuth } from "../../../actions/Library/libraryAuth";

const MainPage = (props) => {
  useEffect(() => {
    // Redirect to dashboard if correct JWT is present OR isAuth is true;
    if (props.loginType == null && localStorage.getItem("token")) {
      props.decodeJWT();
    }
  }, []);

  if (props.loginType == "student") {
    props.studentAuth();
    return <Redirect to='./dashBoard' />;
  } else if (props.loginType == "library") {
    props.libraryAuth();
    return <Redirect to='./libraryDashBoard' />;
  }

  return (
    <div
      style={{
        height: "100%",
        backgroundColor: "rgb(223, 224, 228)",
        margin: "0px",
        padding: "0px",
      }}
    >
      <SchoolHeader templateInfo={props.templateInfo} />
      <LoginSection
        schoolInfo={props.schoolInfo}
        templateInfo={props.templateInfo}
      />
    </div>
  );
};

MainPage.propTypes = {
  schoolInfo: PropTypes.object.isRequired,
  templateInfo: PropTypes.object.isRequired,
  loginType: PropTypes.string.isRequired,
  studentAuth: PropTypes.func.isRequired,
  libraryAuth: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loginType: state.setLoginType.loginType,
});
export default connect(mapStateToProps, {
  decodeJWT,
  studentAuth,
  libraryAuth,
})(MainPage);
