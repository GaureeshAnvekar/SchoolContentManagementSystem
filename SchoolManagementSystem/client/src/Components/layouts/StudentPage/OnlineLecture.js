import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { getStudentsLecturesAPI } from "../../../onlineLectureBackendAPI";
import PropTypes from "prop-types";
import { setAlert, removeAlert } from "../../../actions/alert";
import Alert from "../Landing/Alert";
import useScript from "../../../Components/useScript";
import { Link } from "react-router-dom";

const OnlineLecture = (props) => {
  useScript("http://easyschool.academy/api/sockets/socket.io.js");
  //useScript("http://joseph.easyschool.com:5000/api/sockets/socket.io.js");
  useScript("https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js");

  const [tableData, setTableData] = useState({
    tableCols: [],
    tableRows: [],
  });

  useEffect(() => {
    // Make a request to backend for online lectures scheduled

    const apiCall = async () => {
      var returnObj = await getStudentsLecturesAPI({
        std: props.std,
        section: props.section,
      });

      if (returnObj.success) {
        let rows = [];

        if (returnObj.data.length == 0) {
          props.removeAlert();
          props.setAlert("No lectures have been scheduled", "danger");
        } else {
          props.removeAlert();
          returnObj.data.forEach(function (rowData, index) {
            rows.push({
              Lecturer:
                rowData.employeeId.firstname +
                " " +
                rowData.employeeId.lastname,
              Date: new Date(
                rowData.scheduleDateTimeStart
              ).toLocaleDateString("en-GB", { hour12: true }),
              Time: new Date(
                rowData.scheduleDateTimeStart
              ).toLocaleTimeString("en-US", { hour12: true }),
              Topic: rowData.topic,

              Action: (
                <button
                  type='submit'
                  className='btn btn-primary btn-sm'
                  name={rowData._id}
                  style={props.styles}
                  onClick={(e) => {}}
                >
                  <Link
                    to={{
                      pathname: "/studentBeginLecture",
                      styles: props.styles,
                      meetingId: rowData._id,
                      firstName: props.firstName,
                      lastName: props.lastName,
                    }}
                    style={{ color: "white" }}
                  >
                    Join
                  </Link>
                </button>
              ),
            });
          });

          setTableData({
            ...tableData,
            tableCols: [
              { label: "Lecturer", field: "Lecturer" },
              { label: "Date", field: "Date" },
              { label: "Time", field: "Time" },
              { label: "Topic", field: "Topic" },

              { label: "", field: "Action" },
            ],
            tableRows: rows,
          });
        }
      }
    };

    apiCall();

    return function cleanUp() {
      props.removeAlert();
    }
  }, []);

  return (
    <div >
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
      <Alert />
      <div>
        <MDBTable responsive>
          <MDBTableHead columns={tableData.tableCols} />
          <MDBTableBody rows={tableData.tableRows} />
        </MDBTable>
      </div>
    </div>
  );
};

OnlineLecture.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  std: PropTypes.number.isRequired,
  section: PropTypes.string.isRequired,
  removeAlert: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  firstName: state.studentAuth.firstName,
  lastName: state.studentAuth.lastName,
  std: state.studentAuth.classGrade,
  section: state.studentAuth.section,
});

export default connect(mapStateToProps, { removeAlert, setAlert })(
  OnlineLecture
);
