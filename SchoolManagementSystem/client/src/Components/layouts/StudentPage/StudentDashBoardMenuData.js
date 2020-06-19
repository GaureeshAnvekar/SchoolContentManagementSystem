import React from "react";
import PropTypes from "prop-types";

import AttendanceStatus from "../StudentPage/AttendanceStatus";

const StudentDashBoardMenuData = (props) => {
  const styles = {
    backgroundColor: props.templateInfo.backgroundColor,
    backgroundImage: props.templateInfo.backgroundImage,
  };

  return (
    <div className='row'>
      <div className='col-lg-3 col-md-3 col-sm-3' id='buttonMenu'>
        <div className='buttonContainer'>
          <button
            className='btn btn-primary btn-block attendanceStatus'
            style={styles}
          >
            Attendance Status
          </button>
        </div>
        <div className='buttonContainer'>
          <button
            className='btn btn-primary btn-block assignmentDetails'
            style={styles}
          >
            Assignment Details
          </button>
        </div>
        <div className='buttonContainer'>
          <button
            className='btn btn-primary btn-block parentDetails'
            style={styles}
          >
            Parent Details
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

      <AttendanceStatus styles={styles} />
    </div>
  );
};

StudentDashBoardMenuData.propTypes = {
  templateInfo: PropTypes.object.isRequired,
};

export default StudentDashBoardMenuData;
