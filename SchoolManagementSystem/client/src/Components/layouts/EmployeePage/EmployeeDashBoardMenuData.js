import React, { useState } from "react";
import PropTypes from "prop-types";

import OnlineLecture from "../EmployeePage/OnlineLecture";
import Assignments from "../StudentPage/Assignments";
import VirtualLibrary from "../StudentPage/VirtualLibrary";
import { UnmountClosed } from "react-collapse";

const EmployeeDashBoardMenuData = (props) => {
  const [menuData, setMenuData] = useState(1);

  const [openMenu, setOpenMenu] = useState(true);

  const [colSize, setColSize] = useState(9);

  const styles = {
    backgroundColor: props.templateInfo.backgroundColor,
    backgroundImage: props.templateInfo.backgroundImage,
  };

  const defaultStyle = {
    transition: `opacity ${200}ms ease-in-out`,
    opacity: 0,
  };

  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
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
        return <OnlineLecture styles={styles} />;
      case 2:
        return <Assignments />;
      case 3:
        return <VirtualLibrary styles={styles} />;
    }
  }

  return (
    <div className='row' style={{ marginLeft: "0px", marginRight: "0px" }}>
      {/*
      <div
        className='col-lg-3'
        style={{
          textAlign: "center",
          backgroundColor: "white",
          borderRadius: "10px",
          border: "2px solid",
          borderColor: "rgb(229,230,233)",
          padding: "5px",
        }}
      >
        <div
          className='menuIconDiv'
          style={{
            padding: "0px",
            textAlign: "center",
            backgroundColor: styles.backgroundColor,
            backgroundImage: styles.backgroundImage,
          }}
          onClick={(e) => {
            openMenu ? setColSize(12) : setColSize(8);
            setOpenMenu(!openMenu);
          }}
        >
          <i class='fa fa-bars' aria-hidden='true'></i>
        </div>
      </div>
      <div className='col-lg-9'></div>
        */}
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
              className='btn btn-primary btn-block attendanceStatus '
              style={styles}
              onClick={(e) => onclick(e)}
              name='Attendance'
            >
              Online Lecture
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
            >
              Fees Details
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

EmployeeDashBoardMenuData.propTypes = {
  templateInfo: PropTypes.object.isRequired,
};

export default EmployeeDashBoardMenuData;
