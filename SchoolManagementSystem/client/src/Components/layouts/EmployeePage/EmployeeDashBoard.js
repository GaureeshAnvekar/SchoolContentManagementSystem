import React, { useEffect } from "react";
import SchoolHeader from "../SchoolHeader";
//import StudentDashBoardType from "../StudentPage/StudentDashBoardType";
import EmployeeDashBoardMenuDataContainer from "../EmployeePage/EmployeeDashBoardMenuDataContainer";
import EmployeeDashBoardType from "../EmployeePage/EmployeeDashBoardType";
import PropTypes from "prop-types";

const EmployeeDashBoard = (props) => {
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
      <EmployeeDashBoardType templateInfo={props.templateInfo} />
      <EmployeeDashBoardMenuDataContainer templateInfo={props.templateInfo} />
    </div>
  );
};

EmployeeDashBoard.propTypes = {
  templateInfo: PropTypes.object.isRequired,
};

export default EmployeeDashBoard;
