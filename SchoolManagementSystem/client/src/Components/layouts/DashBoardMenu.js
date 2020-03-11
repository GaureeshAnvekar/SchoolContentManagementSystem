import React from "react";

const DashBoardMenu = () => {
  return (
    <div>
      <div id='buttonMenu'>
        <div class='buttonContainer'>
          <button class='btn btn-primary btn-block attendanceStatus'>
            Attendance Status
          </button>
        </div>
        <div class='buttonContainer'>
          <button class='btn btn-primary btn-block assignmentDetails'>
            Assignment Details
          </button>
        </div>
        <div class='buttonContainer'>
          <button class='btn btn-primary btn-block parentDetails'>
            Parent Details
          </button>
        </div>
        <div class='buttonContainer'>
          <button class='btn btn-primary btn-block feesDetails'>
            Fees Details
          </button>
        </div>
        <div class='buttonContainer'>
          <button class='btn btn-primary btn-block resultDetails'>
            Result Details
          </button>
        </div>
        <div class='buttonContainer'>
          <button class='btn btn-primary btn-block schoolEvents'>
            School Events
          </button>
        </div>
        <div class='buttonContainer'>
          <button class='btn btn-primary btn-block transportDetails'>
            Transport Details
          </button>
        </div>
        <div class='buttonContainer'>
          <button class='btn btn-primary btn-block libraryBooks'>
            Library Books
          </button>
        </div>
        <div class='buttonContainer'>
          <button class='btn btn-primary btn-block addressDetails'>
            Address Details
          </button>
        </div>
        <div class='buttonContainer'>
          <button class='btn btn-primary btn-block contactDetails'>
            Contact Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashBoardMenu;
