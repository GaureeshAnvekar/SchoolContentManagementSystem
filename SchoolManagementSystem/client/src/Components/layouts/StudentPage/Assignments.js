import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { assignmentsAPI } from "../../../studentBackendAPI";
import PropTypes from "prop-types";
import { setAlert, removeAlert } from "../../../actions/alert";
import Alert from "../Landing/Alert";

const Assignments = (props) => {
  const [tableData, setTableData] = useState({
    tableCols: [],
    tableRows: [],
  });

  useEffect(() => {
    // Make a request to backend for assignments

    const apiCall = async () => {
      var returnObj = await assignmentsAPI({
        std: props.std,
        section: props.section,
      });

      if (returnObj.success > 0) {
        let rows = [];

        if (returnObj.data.length == 0) {
          props.removeAlert();
          props.setAlert("No assignments alloted", "danger");
        } else {
          props.removeAlert();
          returnObj.data.forEach(function (rowData, index) {
            rows.push({
              Subject: rowData.subject,
              Assignment: rowData.name,
              Brief: rowData.brief,
              Document: (
                <a href='https://easyschool.academy/api/students/pdfs'>
                  {rowData.document}
                </a>
              ),
              Deadline: new Date(rowData.deadline).toLocaleDateString("en-GB"),
            });
          });

          setTableData({
            ...tableData,
            tableCols: [
              { label: "Subject", field: "Subject" },
              { label: "Assignment", field: "Assignment" },
              { label: "Brief", field: "Brief" },
              { label: "Document", field: "Document" },
              { label: "Deadline", field: "Deadline" },
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
        <b>Assignments</b>
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

Assignments.propTypes = {
  std: PropTypes.number.isRequired,
  section: PropTypes.string.isRequired,
  removeAlert: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  std: state.studentAuth.classGrade,
  section: state.studentAuth.section,
});

export default connect(mapStateToProps, { removeAlert, setAlert })(Assignments);
