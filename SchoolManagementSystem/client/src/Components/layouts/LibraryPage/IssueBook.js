import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBTable, MDBTableBody } from "mdbreact";
import PropTypes from "prop-types";
import { setAlert, removeAlert } from "../../../actions/alert";
import Alert from "../Landing/Alert";
import { issueBookAPI } from "../../../libraryBackendAPI";
import DatePicker from "react-datepicker";

const IssueBook = (props) => {
  const [issueData, setIssueData] = useState({
    bookId: null,
    loanDate: new Date(),
    dueDays: null,
    dueDate: new Date(),
    regId: null,
    type: null,
  });

  const onChange = (e) => {
    setIssueData({
      ...issueData,
      [e.target.name]: e.target.value,
    });
  };

  const issueBookClick = async (e) => {
    e.preventDefault();
    try {
      await issueBookAPI(issueData);
      props.removeAlert();
      props.setAlert("Book issued successfully", "success");
    } catch (err) {
      props.removeAlert();
      console.log(err);
      // dispatch an alert action for each msg
      err.forEach((error) => props.setAlert(error.msg, "danger"));
    }
  };

  useEffect(() => {
    props.removeAlert();
  }, []);

  return (
    <div className='col-lg-8 col-md-8 col-sm-8' id='queryResultContainer'>
      <h5 style={{ margin: "0 auto", width: "30%" }}>
        <b>Issue Book</b>
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

      <div>
        <MDBTable responsive>
          <MDBTableBody>
            <tr>
              <td>
                <b>Book ID:</b>
              </td>
              <td>
                <input
                  type='text'
                  className='form-control'
                  name='bookId'
                  form='issueData'
                  onChange={(e) => onChange(e)}
                  style={{ width: "193px" }}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <b>Loan Date:</b>
              </td>
              <td>
                <DatePicker
                  placeholderText='From Date'
                  className='form-control'
                  selected={issueData.loanDate}
                  dateFormat='dd/MM/yyyy'
                  name='loanDate'
                  form='issueData'
                  required
                  onChange={(date) => {
                    let dueDate = new Date(date);
                    dueDate.setDate(
                      dueDate.getDate() +
                        (issueData.dueDays ? parseInt(issueData.dueDays) : 0)
                    );

                    setIssueData({
                      ...issueData,
                      loanDate: date,
                      dueDate: dueDate,
                    });
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <b>Due in Days:</b>
              </td>
              <td>
                <input
                  type='number'
                  className='form-control'
                  min='0'
                  placeholder='0'
                  name='dueDays'
                  form='issueData'
                  required
                  style={{ width: "193px" }}
                  onKeyDown={(e) => {
                    console.log(e.keyCode);
                    if (
                      e.keyCode === 8 ||
                      e.keyCode === 46 ||
                      e.keyCode === 9
                    ) {
                      return true;
                    }
                    if (isNaN(Number(e.key))) {
                      return e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    let increment;
                    if (e.target.value) {
                      increment = parseInt(e.target.value);
                    } else {
                      increment = 0;
                    }

                    let dueDate = new Date(issueData.loanDate);

                    dueDate.setDate(dueDate.getDate() + increment);

                    setIssueData({
                      ...issueData,
                      dueDays: increment,
                      dueDate: dueDate,
                    });
                  }}
                  value={issueData.dueDays}
                />
              </td>
            </tr>
            <tr>
              <td>
                <b>Due Date:</b>
              </td>
              <td>
                <DatePicker
                  placeholderText='From Date'
                  className='form-control'
                  name='dueDate'
                  selected={issueData.dueDate}
                  disabled
                  dateFormat='dd/MM/yyyy'
                  form='issueData'
                />
              </td>
            </tr>
            <tr>
              <td>
                <b>RegId:</b>
              </td>
              <td>
                <input
                  type='text'
                  className='form-control'
                  name='regId'
                  form='issueData'
                  onChange={(e) => onChange(e)}
                  style={{ width: "193px" }}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <b>Type:</b>
              </td>
              <td>
                <input
                  type='radio'
                  name='type'
                  value='student'
                  onChange={(e) => onChange(e)}
                  form='issueData'
                  required
                />
                <label style={{ marginLeft: "5px" }}>
                  <b>Student</b>
                </label>
                <br />
                <input
                  type='radio'
                  name='type'
                  value='staff'
                  onChange={(e) => onChange(e)}
                  form='issueData'
                  required
                />
                <label style={{ marginLeft: "5px" }}>
                  <b>Staff</b>
                </label>
              </td>
            </tr>
            <tr></tr>
          </MDBTableBody>
        </MDBTable>
      </div>
      <form id='issueData' onSubmit={(e) => issueBookClick(e)} />
      <div className='col-12' style={{ textAlign: "center" }}>
        <button
          type='submit'
          className='btn btn-primary btn-sm'
          id='tillDateAttendance'
          style={props.styles}
          form='issueData'
        >
          Issue Book
        </button>
      </div>
      <Alert />
      <br />
    </div>
  );
};

IssueBook.propTypes = {
  removeAlert: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { removeAlert, setAlert })(IssueBook);
