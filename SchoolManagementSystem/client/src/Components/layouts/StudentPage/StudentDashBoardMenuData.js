import React, { useState } from "react";
import PropTypes from "prop-types";

import AttendanceStatus from "../StudentPage/AttendanceStatus";
import Assignments from "../StudentPage/Assignments";
import VirtualLibrary from "../StudentPage/VirtualLibrary";

const StudentDashBoardMenuData = (props) => {
  const [menuData, setMenuData] = useState(1);

  const styles = {
    backgroundColor: props.templateInfo.backgroundColor,
    backgroundImage: props.templateInfo.backgroundImage,
  };

  const onclick = (e) => {
    if (e.target.name == "Attendance") {
      setMenuData(1);
    } else if (e.target.name == "Assignments") {
      setMenuData(2);
    } else if (e.target.name == "Library") {
      setMenuData(3);
    }
  };

  function renderSwitch(menuData) {
    switch (menuData) {
      case 1:
        return <AttendanceStatus styles={styles} />;
      case 2:
        return <Assignments />;
      case 3:
        return <VirtualLibrary styles={styles} />;
    }
  }

  return (
    <div className='row' style={{ marginLeft: "0px", marginRight: "0px" }}>
      <div className='col-lg-3 col-md-3 col-sm-3' id='buttonMenu'>
        <div className='buttonContainer'>
          <button
            className='btn btn-primary btn-block attendanceStatus'
            style={styles}
            onClick={(e) => onclick(e)}
            name='Attendance'
          >
            Attendance Status
          </button>
        </div>
        <div className='buttonContainer'>
          <button
            className='btn btn-primary btn-block assignmentDetails'
            style={styles}
            onClick={(e) => onclick(e)}
            name='Assignments'
          >
            Assignment Details
          </button>
        </div>
        <div className='buttonContainer'>
          <button
            className='btn btn-primary btn-block parentDetails'
            style={styles}
            onClick={(e) => onclick(e)}
            name='Library'
          >
            Virtual Library
          </button>
        </div>
        <div className='buttonContainer'>
          <button
            className='btn btn-primary btn-block feesDetails'
            style={styles}
          >
            Fees Details
          </button>
        </div>
        <div className='buttonContainer'>
          <button
            className='btn btn-primary btn-block resultDetails'
            style={styles}
          >
            Result Details
          </button>
        </div>
        <div className='buttonContainer'>
          <button
            className='btn btn-primary btn-block schoolEvents'
            style={styles}
          >
            School Events
          </button>
        </div>
        <div className='buttonContainer'>
          <button
            className='btn btn-primary btn-block transportDetails'
            style={styles}
          >
            Transport Details
          </button>
        </div>
        <div className='buttonContainer'>
          <button
            className='btn btn-primary btn-block libraryBooks'
            style={styles}
          >
            Library Books
          </button>
        </div>
        <div className='buttonContainer'>
          <button
            className='btn btn-primary btn-block addressDetails'
            style={styles}
          >
            Address Details
          </button>
        </div>
        <div className='buttonContainer'>
          <button
            className='btn btn-primary btn-block contactDetails'
            style={styles}
          >
            Contact Details
          </button>
        </div>
      </div>

      {renderSwitch(menuData)}
    </div>
  );
};

StudentDashBoardMenuData.propTypes = {
  templateInfo: PropTypes.object.isRequired,
};

export default StudentDashBoardMenuData;
