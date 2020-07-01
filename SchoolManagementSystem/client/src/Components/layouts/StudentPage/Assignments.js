import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { assignmentsAPI } from "../../../studentBackendAPI";
import PropTypes from "prop-types";

const Assignments = (props) => {
  const [tableData, setTableData] = useState({
    tableCols: [],
    tableRows: [],
  });

  useEffect(() => {
    // Make a request to backend for attendance status

    const apiCall = async () => {
      var returnObj = await assignmentsAPI({
        std: props.std,
        section: props.section,
      });

      if (returnObj.success) {
        let rows = [];
        returnObj.data.forEach(function (rowData, index) {
          rows.push({
            Subject: rowData.subject,
            Assignment: rowData.name,
            Brief: rowData.brief,
            Document: rowData.document,
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
    };

    apiCall();
  }, []);

  return (
    <div className='col-lg-8 col-md-8 col-sm-8' id='queryResultContainer'>
      <h5 style={{ margin: "0 auto", width: "30%" }}>
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
};

const mapStateToProps = (state) => ({
  std: state.studentAuth.classGrade,
  section: state.studentAuth.section,
});

export default connect(mapStateToProps, {})(Assignments);
