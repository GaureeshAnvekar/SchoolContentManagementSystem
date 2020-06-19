import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AttendanceStatus = (props) => {
  const [dates, setStartDate] = useState({
    startDate: null,
    endDate: null,
  });

  return (
    <div className='col-lg-8 col-md-8 col-sm-8' id='queryResultContainer'>
      <h5 style={{ margin: "0 auto", width: "30%" }}>
        <b>Attendance Status</b>
      </h5>
      <hr
        style={{
          height: "1px",
          backgroundColor: "black",
          color: "black",
          marginTop: "5px",
          marginBottom: "5px",
        }}
      />
      <div className='row'>
        <div className='col-12'>
          <div className='form-check'>
            <input
              type='radio'
              className='form-check-input'
              name='attendanceType'
              value='student'
              //  onChange={(e) => onChange(e)}
              required
            />
            <label>
              1.) For month wise attendance status, please select a month and
              year:
            </label>
            <br />
          </div>
          <select
            className='form-control'
            id='months'
            style={{
              width: "170px",
              display: "inline-block",
            }}
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

          <label style={{ marginBottom: "0px" }} id='emptyFieldsError'></label>
          <div className='table-responsive'>
            <table className='table table-bordered table-striped'>
              <tbody id='tableBody1'></tbody>
            </table>
          </div>
          <br />
        </div>
        <div className='col-12'>
          <div className='form-check'>
            <input
              type='radio'
              className='form-check-input'
              name='attendanceType'
              value='student'
              //  onChange={(e) => onChange(e)}
              required
            />
            <label>
              2.) For attendance status of a specific period, please enter start
              date and end date:
            </label>
          </div>
          <br />
          <div style={{ display: "inline-block" }}>
            <DatePicker
              placeholderText='From Date'
              className='form-control'
              selected={dates.startDate}
              onChange={(date) => setStartDate({ ...dates, startDate: date })}
              style={{ width: "170px", display: "inline-block" }}
            />
          </div>
          <div style={{ display: "inline-block" }}>
            <DatePicker
              placeholderText='Till Date'
              className='form-control'
              selected={dates.endDate}
              onChange={(date) => setStartDate({ ...dates, endDate: date })}
              style={{ width: "170px", display: "inline-block" }}
            />
          </div>
          {/*
          <input
            type='text'
            id='endDate'
            className='form-control'
            placeholder='END DATE'
            style={{ width: "170px", display: "inline-block" }}
          />*/}

          <label id='emptyFieldsError2'></label>
          <div className='table-responsive'>
            <table className='table table-bordered table-striped'>
              <tbody id='tableBody2'></tbody>
            </table>
          </div>
        </div>
        <br />
        <div className='col-12'>
          <div className='form-check'>
            <input
              type='radio'
              className='form-check-input'
              name='attendanceType'
              value='student'
              //  onChange={(e) => onChange(e)}
              required
            />
            <label>3.) For complete attendance status till date.</label>
          </div>
          <br />
          <div className='col-12' style={{ textAlign: "center" }}>
            <button
              type='button'
              className='btn btn-primary btn-sm'
              id='tillDateAttendance'
              style={props.styles}
            >
              Check Attendance
            </button>
          </div>
        </div>
      </div>
      <div className='table-responsive'>
        <table className='table table-bordered table-striped'>
          <tbody id='tableBody3'></tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceStatus;
