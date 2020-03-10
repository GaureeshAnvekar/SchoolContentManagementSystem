import React, { Fragment } from "react";
import SchoolHeader from "../SchoolHeader";
import LoginSection from "../LoginSection";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const MainPage = props => {
  // Redirect to inner page
  if (props.isAuthenticated) {
    return <Redirect to='./dashboard' />;
  }

  return (
    <div
      style={{
        height: "100%",
        backgroundColor: "rgb(223, 224, 228)",
        margin: "0px",
        padding: "0px"
      }}
    >
      <SchoolHeader />
      <LoginSection />
    </div>
  );
};

MainPage.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(MainPage);
