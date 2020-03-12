import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const DashBoardMenu = props => {
  const styles = {
    backgroundColor: props.template.backgroundColor,
    backgroundImage: props.template.backgroundImage
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
    </div>
  );
};

DashBoardMenu.propTypes = {
  template: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  template: state.setTemplate
});

export default connect(mapStateToProps, null)(DashBoardMenu);
