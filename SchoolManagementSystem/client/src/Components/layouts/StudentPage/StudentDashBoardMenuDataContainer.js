// Contains the DashBoardMenu and DashBoardMenuData components
import React from "react";
import StudentDashBoardMenuData from "./StudentDashBoardMenuData";
import PropTypes from "prop-types";

const StudentDashBoardMenuDataContainer = (props) => {
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
      <div
        className='offset-xl-1 col-xl-10'
        id='DashBoardContainer'
        style={{ padding: "20px", paddingRight: "0px" }}
      >
        <StudentDashBoardMenuData templateInfo={props.templateInfo} />
      </div>
    </div>
  );
};

StudentDashBoardMenuDataContainer.propTypes = {
  templateInfo: PropTypes.object.isRequired,
};

export default StudentDashBoardMenuDataContainer;
