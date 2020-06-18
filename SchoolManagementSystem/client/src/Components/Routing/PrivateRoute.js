import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  loginType: loginType,
  schoolInfo,
  templateInfo,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      loginType == null ? (
        <Redirect to='/school' />
      ) : (
        <Component
          {...props}
          schoolInfo={schoolInfo}
          templateInfo={templateInfo}
        />
      )
    }
  />
);

// !studentAuth.isAuthenticated ? localStorage.removeItem("token")  <Redirect to='/school' /> : <Component /> }

PrivateRoute.propTypes = {
  loginType: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  loginType: state.setLoginType.loginType,
});

export default connect(mapStateToProps, {})(PrivateRoute);
