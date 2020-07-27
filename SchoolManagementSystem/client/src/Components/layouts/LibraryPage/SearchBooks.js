import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBDataTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { searchBooksAPI } from "../../../libraryBackendAPI";
import PropTypes from "prop-types";
import { setAlert, removeAlert } from "../../../actions/alert";
import Alert from "../Landing/Alert";

const SearchBooks = (props) => {
  const [tableData, setTableData] = useState({
    tableCols: [],
    tableRows: [],
  });

  var bodyStyles = document.body.style;
  console.log(props.styles);
  bodyStyles.setProperty("--table-link-color", props.styles.backgroundColor);
  bodyStyles.setProperty("--table-link-image", props.styles.backgroundImage);

  useEffect(() => {
    // Make a request to backend for all books of library from a school

    const apiCall = async () => {
      try {
        var returnObj = await searchBooksAPI();

        if (returnObj.success) {
          let rows = [];

          if (returnObj.data.length == 0) {
            props.removeAlert();
            props.setAlert("No books available", "danger");
          } else {
            props.removeAlert();
            returnObj.data.forEach(function (rowData, index) {
              rows.push({
                BookId: rowData.bookId,
                Title: rowData.title,
                Author: rowData.author,
                Publisher: rowData.publisher,
                MRP: rowData.mrp,
                Cost: rowData.cost,
                YearOfPurchase: rowData.yearOfPurchase,
                IsAvailable: rowData.isAvailable,
              });
            });

            setTableData({
              ...tableData,
              tableCols: [
                { label: "BookId", field: "BookId" },
                { label: "Title", field: "Title" },
                { label: "Author", field: "Author" },
                { label: "Publisher", field: "Publisher" },
                { label: "MRP", field: "MRP" },
                { label: "Cost", field: "Cost" },
                { label: "YearOfPurchase", field: "YearOfPurchase" },
                { label: "IsAvailable", field: "IsAvailable" },
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
        <b>Search Books</b>
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

SearchBooks.propTypes = {
  removeAlert: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { removeAlert, setAlert })(SearchBooks);
