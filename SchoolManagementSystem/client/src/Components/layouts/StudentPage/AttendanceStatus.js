import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { attendanceAPI } from "../../../studentBackendAPI";
import Alert from "../Landing/Alert";
import { setAlert, removeAlert } from "../../../actions/alert";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const AttendanceStatus = (props) => {
  const [attendanceType, setAttendanceType] = useState({
    type: null,
    month: null,
    year: null,
    startDate: null,
    endDate: null,
  });

  const [tableData, setTableData] = useState({
    tableCols: [],
    tableRows: [],
  });

  // After changing radio button for attendance type
  const onChange = (e) => {
    setAttendanceType({ ...attendanceType, [e.target.name]: e.target.value });
  };

  // After clicking "Check Attendance"
  const checkAttendanceClick = async (e) => {
    e.preventDefault();

    // Make a request to backend for attendance status

    var returnObj = await attendanceAPI(attendanceType);
    console.log("RETURN OBJ");
    console.log(returnObj);
    if (returnObj.success == 1) {
      props.removeAlert();

      let rows = [];
      returnObj.data.forEach(function (rowData, index) {
        rows.push({
          Date: new Date(rowData.date).toLocaleDateString("en-GB"),
          Status: rowData.status == 1 ? "Present" : "Absent",
        });
      });

      setTableData({
        ...tableData,
        tableCols: [
          { label: "Date", field: "Date" },
          { label: "Status", field: "Status" },
        ],
        tableRows: rows,
      });
    } else {
      props.removeAlert();
      props.setAlert(returnObj.error, "danger");
    }
  };

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
              name='type'
              value='monthly'
              onChange={(e) => onChange(e)}
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
            name='month'
            style={{
              width: "170px",
              display: "inline-block",
            }}
            onChange={(e) => onChange(e)}
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
            name='year'
            style={{ width: "170px", display: "inline-block" }}
            onChange={(e) => onChange(e)}
          >
            <option value='0'>SELECT YEAR</option>
            <option value='2020'>2020</option>
            <option value='2021'>2021</option>
            <option value='2022'>2022</option>
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
              name='type'
              value='specific'
              onChange={(e) => onChange(e)}
              required
            />
            <label>
              2.) For attendance status of a specific period, please enter start
              date and end date:
            </label>
          </div>
          <br />
          <div style={{ display: "inline-block", width: "170px" }}>
            <DatePicker
              placeholderText='From Date'
              className='form-control'
              selected={attendanceType.startDate}
              onChange={(date) =>
                setAttendanceType({ ...attendanceType, startDate: date })
              }
              style={{ width: "170px", display: "inline-block" }}
            />
          </div>
          <div style={{ display: "inline-block", width: "170px" }}>
            <DatePicker
              placeholderText='Till Date'
              className='form-control'
              selected={attendanceType.endDate}
              onChange={(date) =>
                setAttendanceType({ ...attendanceType, endDate: date })
              }
              style={{ display: "inline-block" }}
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
              name='type'
              value='complete'
              onChange={(e) => onChange(e)}
              required
            />
            <label>3.) For complete attendance status till date.</label>
          </div>
          <br />
          <div className='col-12' style={{ textAlign: "center" }}>
            <button
              type='submit'
              className='btn btn-primary btn-sm'
              id='tillDateAttendance'
              style={props.styles}
              onClick={(e) => checkAttendanceClick(e)}
            >
              Check Attendance
            </button>
          </div>
        </div>
      </div>

      <Alert />
      <br />
      <div>
        <MDBTable responsive>
          <MDBTableHead columns={tableData.tableCols} />
          <MDBTableBody rows={tableData.tableRows} />
        </MDBTable>
      </div>
    </div>
  );
};

AttendanceStatus.propTypes = {
  removeAlert: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { removeAlert, setAlert })(AttendanceStatus);
