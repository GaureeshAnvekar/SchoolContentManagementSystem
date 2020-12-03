import React, { useEffect, useState } from "react";

import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import {
  scheduleLectureAPI,
  getAllScheduledLecturesAPI,
  cancelScheduledLectureAPI,
} from "../../../onlineLectureBackendAPI";
import { playVideoFromCamera } from "../../../setupWebRTC";
import Alert from "../Landing/Alert";
import { setAlert, removeAlert } from "../../../actions/alert";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import useScript from "../../../Components/useScript";
import { Link } from "react-router-dom";
//import { PieChart } from "react-minimal-pie-chart";

const OnlineLecture = (props) => {
  useScript("http://localhost:5000/api/sockets/socket.io.js");
  useScript("https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js");

  const [scheduleOrStart, setScheduleOrStart] = useState(null);

  const [scheduleData, setScheduleData] = useState({
    dateTime: new Date(),
    studentClass: null,
    section: null,
    topic: null,
  });

  const [schedulesTable, setSchedulesTable] = useState({
    tableCols: [],
    tableRows: [],
  });

  const [schedulesTableMap, setSchedulesTableMap] = useState(new Map());

  const [scheduleToRemove, setScheduleToRemove] = useState({
    scheduleId: null,
  });

  //set theme style
  var bodyStyles = document.body.style;

  bodyStyles.setProperty("--theme-color", props.styles.backgroundColor);
  bodyStyles.setProperty("--theme-image", props.styles.backgroundImage);

  const [openPopup, setOpenPopup] = useState(false);
  const closeModal = () => setOpenPopup(false);

  const [openPopupLectureCancel, setOpenPopupLectureCancel] = useState(false);
  const closeModalLectureCancel = () => setOpenPopupLectureCancel(false);

  const onScheduleLectureClick = async (e) => {
    e.preventDefault();
    props.removeAlert();
    try {
      //api call to schedule the lecture

      await scheduleLectureAPI(scheduleData);
      setOpenPopup(true);
    } catch (err) {
      props.removeAlert();

      // dispatch an alert action for each msg
      err.forEach((error) => props.setAlert(error.msg, "danger"));
    }
  };

  const onScheduleDateChange = (dateTime) => {
    setScheduleData({ ...scheduleData, dateTime: dateTime });
  };

  // After changing radio button for attendance type
  const onChangeRadio = async (e) => {
    props.removeAlert();
    setScheduleOrStart(e.target.value);

    if (e.target.value == "start") {
      // make api call to get all the scheduled lectures
      let schedules = await getAllScheduledLecturesAPI();

      if (schedules.length > 0) {
        props.removeAlert();

        schedules.forEach(function (rowData, index) {
          let rowDataObj = {
            Date: new Date(
              rowData.scheduleDateTimeStart
            ).toLocaleDateString("en-GB", { hour12: true }),
            Time: new Date(
              rowData.scheduleDateTimeStart
            ).toLocaleTimeString("en-US", { hour12: true }),
            Topic: rowData.topic,
            Class: rowData.class,
            Section: rowData.section,
            Action: (
              <button
                type='submit'
                className='btn btn-primary btn-sm'
                name={rowData._id}
                style={props.styles}
                onClick={(e) => {
                  //setupSocketConnection(e.target.name);
                }}
              >
                <Link
                  to={{
                    pathname: "/employeeBeginLecture",
                    styles: props.styles,
                    meetingId: rowData._id,
                    firstName: props.firstName,
                    lastName: props.lastName,
                    schoolId: props.schoolId,
                  }}
                  style={{ color: "white" }}
                >
                  Begin
                </Link>
              </button>
            ),
            Cancel: (
              <button
                type='submit'
                className='btn btn-primary btn-sm'
                name={rowData._id}
                style={props.styles}
                onClick={(e) => {
                  setScheduleToRemove({
                    ...scheduleToRemove,
                    scheduleId: e.target.name,
                  });
                  setOpenPopupLectureCancel(true);
                }}
              >
                Cancel
              </button>
            ),
          };

          setSchedulesTableMap(schedulesTableMap.set(rowData._id, rowDataObj));
        });

        setSchedulesTable({
          ...schedulesTable,
          tableCols: [
            { label: "Date", field: "Date" },
            { label: "Time", field: "Time" },
            { label: "Topic", field: "Topic" },
            { label: "Class", field: "Class" },
            { label: "Section", field: "Section" },
            { label: "", field: "Action" },
            { label: "", field: "Cancel" },
          ],
          tableRows: Array.from(schedulesTableMap, ([key, value]) => value),
        });
      } else {
        props.removeAlert();
        props.setAlert("No schedules available", "danger");
      }
    }

    window.scrollTo(0, document.body.scrollHeight);
  };

  const onChangeSelect = (e) => {
    setScheduleData({
      ...scheduleData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    return function cleanUp() {
      props.removeAlert();
    }
  }, []);
  return (
    <div>
      <h5 style={{ margin: "0 auto", width: "30%", textAlign: "center" }}>
        <b>Online Lecture</b>
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
              value='schedule'
              onChange={(e) => onChangeRadio(e)}
            />
            <label>
              1.) To schedule a future online lecture for the students:
            </label>
            <br />
          </div>
          {scheduleOrStart == "schedule" ? (
            <div className='onlineLecture row' style={{ height: "auto" }}>
              <div className='col-lg-6' style={{ paddingTop: "0px" }}>
                Select the date and time: {""}
              </div>
              <div className='col-lg-6'>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    value={scheduleData.dateTime}
                    onChange={(dateTime) => onScheduleDateChange(dateTime)}
                    style={{ width: "200px" }}
                  />
                </MuiPickersUtilsProvider>
              </div>

              <div
                className='col-lg-6'
                style={{ paddingTop: "0px", marginTop: "10px" }}
              >
                Select the class: {""}
              </div>

              <div className='col-lg-6' style={{ marginTop: "10px" }}>
                <select
                  className='form-control'
                  id='classes'
                  name='studentClass'
                  style={{
                    width: "170px",
                    display: "inline-block",
                  }}
                  form='scheduleData'
                  required
                  onChange={(e) => onChangeSelect(e)}
                >
                  <option value=''></option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
                  <option value='8'>8</option>
                  <option value='9'>9</option>
                  <option value='10'>10</option>
                  <option value='11'>11</option>
                  <option value='12'>12</option>
                </select>
              </div>
              <div
                className='col-lg-6'
                style={{ paddingTop: "0px", marginTop: "10px" }}
              >
                Select the section: {""}
              </div>

              <div className='col-lg-6' style={{ marginTop: "10px" }}>
                <select
                  className='form-control'
                  id='sections'
                  name='section'
                  style={{
                    width: "170px",
                    display: "inline-block",
                  }}
                  form='scheduleData'
                  required
                  onChange={(e) => onChangeSelect(e)}
                >
                  <option value=''></option>
                  <option value='A'>A</option>
                  <option value='B'>B</option>
                  <option value='C'>C</option>
                </select>
              </div>
              <div
                className='col-lg-6'
                style={{ paddingTop: "0px", marginTop: "10px" }}
              >
                Enter the topic: {""}
              </div>

              <div className='col-lg-6' style={{ marginTop: "10px" }}>
                <input
                  type='text'
                  className='form-control'
                  name='topic'
                  form='scheduleData'
                  style={{
                    width: "170px",
                    display: "inline-block",
                  }}
                  required
                  onChange={(e) => onChangeSelect(e)}
                />
              </div>
              <div className='col-lg-4'></div>
              <form
                id='scheduleData'
                onSubmit={(e) => onScheduleLectureClick(e)}
              />
              <div className='col-lg-4' style={{ textAlign: "center" }}>
                <br></br>
                <button
                  type='submit'
                  className='btn btn-primary btn-sm'
                  id='tillDateAttendance'
                  style={props.styles}
                  form='scheduleData'
                >
                  Schedule lecture
                </button>
              </div>
              <div className='col-lg-12'>
                <Alert></Alert>
              </div>
            </div>
          ) : null}

          <br />
        </div>
        <div className='col-12'>
          <div className='form-check'>
            <input
              type='radio'
              className='form-check-input'
              name='type'
              value='start'
              onChange={(e) => onChangeRadio(e)}
              required
            />
            <label>2.) To start an already scheduled online lecture:</label>
          </div>
          {scheduleOrStart == "start" ? (
            <div
              className='onlineLecture'
              id='start'
              style={{ height: "auto" }}
            >
              <div className='col-lg-12'>
                <Alert></Alert>
              </div>
              <div>
                <MDBTable responsive>
                  <MDBTableHead columns={schedulesTable.tableCols} />
                  <MDBTableBody rows={schedulesTable.tableRows} />
                </MDBTable>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <Modal show={openPopup} onHide={closeModal}>
        <Modal.Header closeButton>
          The lecture has been scheduled. Email notifications will be sent to
          the students about the lecture.
        </Modal.Header>
      </Modal>

      <Modal show={openPopupLectureCancel} onHide={closeModalLectureCancel}>
        <Modal.Header closeButton>
          Are you sure you want to cancel this scheduled lecture? Your students
          will be sent a notification about this.
        </Modal.Header>
        <Modal.Footer>
          <button
            type='submit'
            className='btn btn-primary btn-sm'
            style={props.styles}
            onClick={(e) => {
              e.preventDefault();
              schedulesTableMap.delete(scheduleToRemove.scheduleId);
              setSchedulesTableMap(schedulesTableMap);
              setSchedulesTable({
                ...schedulesTable,
                tableRows: Array.from(
                  schedulesTableMap,
                  ([key, value]) => value
                ),
              });

              closeModalLectureCancel();

              //api call to delete this lecture schedule
              cancelScheduledLectureAPI(scheduleToRemove);
            }}
          >
            Yes
          </button>
          <button
            type='submit'
            className='btn btn-primary btn-sm'
            style={props.styles}
            onClick={(e) => {
              e.preventDefault();
              setScheduleToRemove({ ...scheduleToRemove, scheduleId: null });
              closeModalLectureCancel();
            }}
          >
            No
          </button>
        </Modal.Footer>
      </Modal>
      <br />

      <br />
      {/*
      <div>
        <MDBTable responsive>
          <MDBTableHead columns={tableData.tableCols} />
          <MDBTableBody rows={tableData.tableRows} />
        </MDBTable>
      </div>*/}
    </div>
  );
};

OnlineLecture.propTypes = {
  removeAlert: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  firstName: state.employeeAuth.firstName,
  lastName: state.employeeAuth.lastName,
  schoolId: state.setSchoolInfo.id,
});


export default connect(mapStateToProps, { removeAlert, setAlert })(OnlineLecture);
