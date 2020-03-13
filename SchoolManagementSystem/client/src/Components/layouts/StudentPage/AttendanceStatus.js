import React from "react";

const AttendanceStatus = () => {
  return (
    <div id='queryResultContainer'>
      <h5 style={{ margin: "0 auto", width: "20%" }}>
        <b>Attendance Status</b>
      </h5>
      <hr
        style={{
          height: "1px",
          backgroundColor: "black",
          color: "black",
          marginTop: "5px",
          marginBottom: "5px"
        }}
      />
      <label>
        1.) For month wise attendance status, please select a month and year:
      </label>
      <br />
      <select
        className='form-control'
        id='months'
        style={{ width: "170px", display: "inline-block" }}
      >
        <option value='0'>SELECT MONTH</option>
        <option value='1'>January</option>
        <option value='2'>February</option>
        <option value='3'>March</option>
        <option value='4'>April</option>
        <option value='5'>May</option>
        <option value='6'>June</option>
        <option value='7'>July</option>
        <option value='8'>August</option>
        <option value='9'>September</option>
        <option value='10'>October</option>
        <option value='11'>November</option>
        <option value='12'>December</option>
      </select>
      <select
        className='form-control'
        id='year'
        style={{ width: "170px", display: "inline-block" }}
      >
        <option value='0'>SELECT YEAR</option>
        <option value='2015'>2015</option>
        <option value='2016'>2016</option>
      </select>
      <button
        type='button'
        className='btn btn-primary btn-sm'
        id='monthlyAttendance'
        style={{ marginLeft: "5px", display: "inline-block" }}
      >
        Check Attendance
      </button>
      <label style={{ marginBottom: "0px" }} id='emptyFieldsError'></label>
      <div className='table-responsive'>
        <table className='table table-bordered table-striped'>
          <tbody id='tableBody1'></tbody>
        </table>
      </div>
      <br />

      <label>
        2.) For attendance status of a specific period, please enter start date
        and end date:
      </label>
      <br />

      <input
        type='text'
        id='startDate'
        className='form-control'
        placeholder='START DATE'
        style={{ width: "170px", display: "inline-block" }}
      />
      <input
        type='text'
        id='endDate'
        className='form-control'
        placeholder='END DATE'
        style={{ width: "170px", display: "inline-block" }}
      />
      <button
        type='button'
        className='btn btn-primary btn-sm'
        id='periodAttendance'
        style={{ marginLeft: "5px", display: "inline-block" }}
      >
        Check Attendance
      </button>
      <label id='emptyFieldsError2'></label>
      <div className='table-responsive'>
        <table className='table table-bordered table-striped'>
          <tbody id='tableBody2'></tbody>
        </table>
      </div>
      <br />

      <label>3.) For complete attendance status till date, click:</label>
      <button
        type='button'
        className='btn btn-primary btn-sm'
        id='tillDateAttendance'
        style={{ marginLeft: "10px", display: "inline-block" }}
      >
        Check Attendance
      </button>
      <div className='table-responsive'>
        <table className='table table-bordered table-striped'>
          <tbody id='tableBody3'></tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceStatus;
