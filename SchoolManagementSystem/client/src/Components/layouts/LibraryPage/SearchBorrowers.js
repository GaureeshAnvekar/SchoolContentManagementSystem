import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBDataTable } from "mdbreact";
import { searchBorrowersAPI } from "../../../libraryBackendAPI";
import PropTypes from "prop-types";
import { setAlert, removeAlert } from "../../../actions/alert";
import Alert from "../Landing/Alert";

const SearchBorrowers = (props) => {
  const [tableData, setTableData] = useState({
    tableCols: [],
    tableRows: [],
  });

  var bodyStyles = document.body.style;

  bodyStyles.setProperty("--table-link-color", props.styles.backgroundColor);
  bodyStyles.setProperty("--table-link-image", props.styles.backgroundImage);

  useEffect(() => {
    // Make a request to backend for all book borrowers from a school

    const apiCall = async () => {
      try {
        var returnObj = await searchBorrowersAPI();

        if (returnObj.success) {
          let rows = [];

          if (returnObj.data.length == 0) {
            props.removeAlert();
            props.setAlert("No borrowers", "danger");
          } else {
            props.removeAlert();
            returnObj.data.forEach(function (rowData, index) {
              rows.push({
                BookId: rowData.bookId,
                LoanDate: new Date(rowData.loanDate).toLocaleDateString(
                  "en-GB"
                ),
                DueDate: new Date(rowData.dueDate).toLocaleDateString("en-GB"),
                RegId: rowData.regId._id,
                Type: rowData.type,
                FirstName: rowData.regId.firstname,
                LastName: rowData.regId.lastname,
                RollNo: rowData.regId.rollno,
                ClassGrade: rowData.regId.classgrade,
                Section: rowData.regId.section,
              });
            });

            setTableData({
              ...tableData,
              tableCols: [
                { label: "BookId", field: "BookId" },
                { label: "LoanDate", field: "LoanDate" },
                { label: "DueDate", field: "DueDate" },
                { label: "RegId", field: "RegId" },
                { label: "Type", field: "Type" },
                { label: "FirstName", field: "FirstName" },
                { label: "LastName", field: "LastName" },
                { label: "RollNo", field: "RollNo" },
                { label: "ClassGrade", field: "ClassGrade" },
                { label: "Section", field: "Section" },
              ],
              tableRows: rows,
            });
          }
        }
      } catch (err) {
        props.removeAlert();

        // dispatch an alert action for each msg
        err.forEach((error) => props.setAlert(error, "danger"));
      }
    };

    apiCall();
  }, []);

  return (
    <div className='col-lg-8 col-md-8 col-sm-8' id='queryResultContainer'>
      <h5 style={{ margin: "0 auto", width: "30%" }}>
        <b>Search Borrowers</b>
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
        <MDBDataTable
          responsive
          searching={true}
          striped
          data={{ columns: tableData.tableCols, rows: tableData.tableRows }}
        ></MDBDataTable>
      </div>
    </div>
  );
};

SearchBorrowers.propTypes = {
  removeAlert: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { removeAlert, setAlert })(SearchBorrowers);
