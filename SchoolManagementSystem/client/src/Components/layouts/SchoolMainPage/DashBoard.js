import React, { useEffect } from "react";
import SchoolHeader from "../SchoolHeader";
import DashBoardType from "../DashBoardType";
import DashBoardMenuDataContainer from "../DashBoardMenuDataContainer";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Dashboard = (props) => {
  return (
    <div
      style={{
        height: "100%",
        backgroundColor: "rgb(223, 224, 228)",
        margin: "0px",
        padding: "0px",
        width: "100%",
      }}
    >
      <SchoolHeader templateInfo={props.templateInfo} />
      <DashBoardType templateInfo={props.templateInfo} />
      <DashBoardMenuDataContainer templateInfo={props.templateInfo} />
    </div>
  );
};

Dashboard.propTypes = {
  loginType: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  loginType: state.setLoginType.loginType,
});

export default connect(mapStateToProps, {})(Dashboard);
