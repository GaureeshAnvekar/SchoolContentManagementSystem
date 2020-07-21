import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBTable, MDBTableBody } from "mdbreact";
import PropTypes from "prop-types";
import { setAlert, removeAlert } from "../../../actions/alert";
import Alert from "../Landing/Alert";
import { receiveBookAPI, calculateDueAPI } from "../../../libraryBackendAPI";
import DatePicker from "react-datepicker";

const ReceiveBook = (props) => {
  const [receiveData, setReceiveData] = useState({
    bookId: null,
    regId: null,
    perDayDueCharge: null,
    returnDate: new Date(),
    currBookDue: 0,
    totalDue: 0,
  });

  const onBookIdChange = (e) => {
    props.removeAlert();
    setReceiveData({
      ...receiveData,
      bookId: e.target.value,
    });

    if (e.target.value) {
      document.getElementById("regId").disabled = false;
      document.getElementById("perDayDueCharge").disabled = false;
    } else {
      setReceiveData({
        ...receiveData,
        regId: "",
        perDayDueCharge: "",
        currBookDue: 0,
      });
      document.getElementById("regId").disabled = true;
      document.getElementById("perDayDueCharge").disabled = true;
    }
  };

  const onChange = (e) => {
    setReceiveData({
      ...receiveData,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeDue = (e) => {
    setReceiveData({
      ...receiveData,
      perDayDueCharge: e.target.value,
    });
  };

  const onFocusDue = (e) => {
    if (!receiveData.bookId) {
      props.removeAlert();
      props.setAlert("Enter book Id first", "danger");
      setReceiveData({
        ...receiveData,
        perDayDueCharge: null,
      });
    }
  };

  const onBlurDue = async (e) => {
    props.removeAlert();

    //Calculate due for this book
    if (receiveData.bookId) {
      try {
        let bookDue = await calculateDueAPI({
          bookId: receiveData.bookId,
          due: receiveData.perDayDueCharge ? receiveData.perDayDueCharge : 0,
        });

        setReceiveData({
          ...receiveData,
          currBookDue: bookDue,
          totalDue: bookDue + receiveData.totalDue,
        });
      } catch (err) {
        props.removeAlert();

        // dispatch an alert action for each msg
        err.forEach((error) => props.setAlert(error.msg, "danger"));
        setReceiveData({
          ...receiveData,
          perDayDueCharge: 0,
        });
      }
    }
  };

  const receiveBookClick = async (e) => {
    e.preventDefault();
    if (!receiveData.bookId) {
      props.removeAlert();
      props.setAlert("Enter book Id", "danger");
    } else {
      try {
        await receiveBookAPI(receiveData);
        props.removeAlert();
        props.setAlert("Book received successfully", "success");

        setReceiveData({
          ...receiveData,
          currBookDue: 0,
        });
      } catch (err) {
        props.removeAlert();

        // dispatch an alert action for each msg
        err.forEach((error) => props.setAlert(error.msg, "danger"));
      }
    }
  };
  useEffect(() => {
    props.removeAlert();
  }, []);

  return (
    <div className='col-lg-8 col-md-8 col-sm-8' id='queryResultContainer'>
      <h5 style={{ margin: "0 auto", width: "30%" }}>
        <b>Receive Book</b>
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
                  form='receiveData'
                  onChange={(e) => onBookIdChange(e)}
                  required
                  style={{ width: "193px" }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <b>Reg ID:</b>
              </td>
              <td>
                <input
                  type='text'
                  className='form-control'
                  id='regId'
                  name='regId'
                  form='receiveData'
                  onChange={(e) => onChange(e)}
                  required
                  style={{ width: "193px" }}
                  disabled={true}
                  value={receiveData.regId}
                />
              </td>
            </tr>
            <tr>
              <td>
                <b>Per day due charge:</b>
              </td>
              <td>
                <input
                  type='number'
                  min='0'
                  placeholder='0'
                  className='form-control'
                  name='perDayDueCharge'
                  id='perDayDueCharge'
                  form='receiveData'
                  required
                  onChange={(e) => onChange(e)}
                  style={{ width: "193px" }}
                  onBlur={(e) => onBlurDue(e)}
                  onFocus={(e) => onFocusDue(e)}
                  onChange={(e) => onChangeDue(e)}
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
                  value={receiveData.perDayDueCharge}
                  disabled
                />
              </td>
            </tr>
            <tr>
              <td>
                <b>Return date:</b>
              </td>
              <td>
                <DatePicker
                  placeholderText='From Date'
                  className='form-control'
                  name='returnDate'
                  selected={receiveData.returnDate}
                  disabled
                  dateFormat='dd/MM/yyyy'
                  form='receiveData'
                />
              </td>
            </tr>
            <tr>
              <td>
                <b>Current book due:</b>
              </td>
              <td>
                <input
                  type='number'
                  min='1'
                  className='form-control'
                  name='currBookDue'
                  form='receiveData'
                  required
                  onChange={(e) => onChange(e)}
                  style={{ width: "193px" }}
                  disabled
                  value={receiveData.currBookDue}
                />
              </td>
            </tr>
            <tr>
              <td>
                <b>Total due:</b>
              </td>
              <td>
                <input
                  type='number'
                  min='1'
                  className='form-control'
                  name='totalDue'
                  required
                  form='receiveData'
                  onKeyDown={(e) => {
                    console.log(e.keyCode);
                    if (e.keyCode === 8 || e.keyCode === 46) {
                      return true;
                    }
                    if (isNaN(Number(e.key))) {
                      return e.preventDefault();
                    }
                  }}
                  onChange={(e) => onChange(e)}
                  style={{ width: "193px" }}
                  disabled
                  value={receiveData.totalDue}
                />
              </td>
            </tr>
          </MDBTableBody>
        </MDBTable>
      </div>
      <form id='receiveData' onSubmit={(e) => receiveBookClick(e)} />
      <div className='col-12' style={{ textAlign: "center" }}>
        <button
          type='submit'
          className='btn btn-primary btn-sm'
          id='tillDateAttendance'
          style={props.styles}
          form='receiveData'
        >
          Receive Book
        </button>
      </div>
      <Alert />
      <br />
    </div>
  );
};

ReceiveBook.propTypes = {
  removeAlert: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { removeAlert, setAlert })(ReceiveBook);
