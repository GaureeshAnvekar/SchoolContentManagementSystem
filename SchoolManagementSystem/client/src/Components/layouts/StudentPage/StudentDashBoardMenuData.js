import React, { useState } from "react";
import PropTypes from "prop-types";

import AttendanceStatus from "../StudentPage/AttendanceStatus";
import Assignments from "../StudentPage/Assignments";
import VirtualLibrary from "../StudentPage/VirtualLibrary";
import OnlineLecture from "../StudentPage/OnlineLecture";
import { UnmountClosed } from "react-collapse";

const StudentDashBoardMenuData = (props) => {
  const [menuData, setMenuData] = useState(1);
  const [colSize, setColSize] = useState(9);
  const [openMenu, setOpenMenu] = useState(true);

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
    } else if (e.target.name == "Lecture") {
      setMenuData(4);
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
      case 4:
        return <OnlineLecture styles={styles} />;
    }
  }

  return (
    <div className='row' style={{ marginLeft: "0px", marginRight: "0px" }}>
      <div className='col-lg-3 col-md-3 col-sm-3' id='buttonMenu'>
      <div className='buttonContainer'>
          <div
            className='menuIconDiv'
            style={{
              padding: "0px",
              textAlign: "center",
              backgroundColor: styles.backgroundColor,
              backgroundImage: styles.backgroundImage,
            }}
            onClick={(e) => {
              openMenu ? setColSize(12) : setColSize(9);

              setOpenMenu(!openMenu);

              window.scrollTo(0, document.body.scrollHeight);
            }}
          >
            <i className='fa fa-bars' aria-hidden='true'></i>
          </div>
        </div>
      <UnmountClosed isOpened={openMenu}>
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
        </UnmountClosed>
        <UnmountClosed isOpened={openMenu}>
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
        </UnmountClosed>
        <UnmountClosed isOpened={openMenu}>
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
        </UnmountClosed>
        <UnmountClosed isOpened={openMenu}>
        <div className='buttonContainer'>
          <button
            className='btn btn-primary btn-block feesDetails'
            style={styles}
            onClick={(e) => onclick(e)}
            name='Lecture'
          >
            Online Lecture
          </button>
        </div>
        </UnmountClosed>
        <UnmountClosed isOpened={openMenu}>
        <div className='buttonContainer'>
          <button
            className='btn btn-primary btn-block resultDetails'
            style={styles}
          >
            Result Details
          </button>
        </div>
        </UnmountClosed>
        <UnmountClosed isOpened={openMenu}>
        <div className='buttonContainer'>
          <button
            className='btn btn-primary btn-block schoolEvents'
            style={styles}
          >
            School Events
          </button>
        </div>
        </UnmountClosed>
        <UnmountClosed isOpened={openMenu}>
        <div className='buttonContainer'>
          <button
            className='btn btn-primary btn-block transportDetails'
            style={styles}
          >
            Transport Details
          </button>
        </div>
        </UnmountClosed>
        <UnmountClosed isOpened={openMenu}>
        <div className='buttonContainer'>
          <button
            className='btn btn-primary btn-block libraryBooks'
            style={styles}
          >
            Library Books
          </button>
        </div>
        </UnmountClosed>
        <UnmountClosed isOpened={openMenu}>
        <div className='buttonContainer'>
          <button
            className='btn btn-primary btn-block addressDetails'
            style={styles}
          >
            Address Details
          </button>
        </div>
        </UnmountClosed>
        <UnmountClosed isOpened={openMenu}>
        <div className='buttonContainer'>
          <button
            className='btn btn-primary btn-block contactDetails'
            style={styles}
          >
            Contact Details
          </button>
        </div>
        </UnmountClosed>
      </div>
      <div
        className={`col-lg-${colSize} col-md-${colSize} col-sm-${colSize}`}
        id='queryResultContainer'
      >
      {renderSwitch(menuData)}
      </div>
    </div>
  );
};

StudentDashBoardMenuData.propTypes = {
  templateInfo: PropTypes.object.isRequired,
};

export default StudentDashBoardMenuData;
