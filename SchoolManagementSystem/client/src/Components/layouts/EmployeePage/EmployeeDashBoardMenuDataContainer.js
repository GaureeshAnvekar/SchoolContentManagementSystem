// Contains the DashBoardMenu and DashBoardMenuData components
import React from "react";
import EmployeeDashBoardMenuData from "./EmployeeDashBoardMenuData";
import PropTypes from "prop-types";

const EmployeeDashBoardMenuDataContainer = (props) => {
  return (
    <div
      className='row'
      style={{
        backgroundColor: "rgb(223, 224, 228)",
        width: "100%",
        marginLeft: "0px",
        marginRight: "0px",
      }}
    >
      <div className='offset-xl-1 col-xl-10' id='DashBoardContainer'>
        <EmployeeDashBoardMenuData templateInfo={props.templateInfo} />
      </div>
    </div>
  );
};

EmployeeDashBoardMenuDataContainer.propTypes = {
  templateInfo: PropTypes.object.isRequired,
};

export default EmployeeDashBoardMenuDataContainer;
