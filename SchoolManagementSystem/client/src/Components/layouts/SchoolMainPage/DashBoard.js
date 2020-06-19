import React, { useEffect } from "react";
import SchoolHeader from "../SchoolHeader";
import StudentDashBoardType from "../StudentPage/StudentDashBoardType";
import StudentDashBoardMenuDataContainer from "../StudentPage/StudentDashBoardMenuDataContainer";
import PropTypes from "prop-types";
import { connect } from "react-redux";

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
      <StudentDashBoardType templateInfo={props.templateInfo} />
      <StudentDashBoardMenuDataContainer templateInfo={props.templateInfo} />
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
