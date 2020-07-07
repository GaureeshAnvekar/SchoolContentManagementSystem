import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBTable, MDBTableBody } from "mdbreact";
import PropTypes from "prop-types";
import { setAlert, removeAlert } from "../../../actions/alert";
import Alert from "../Landing/Alert";
import { uploadBookAPI } from "../../../libraryBackendAPI";

const EnterNewBook = (props) => {
  const [bookData, setBookData] = useState({
    bookId: null,
    title: null,
    author: null,
    publisher: null,
    mrp: null,
    cost: null,
    yearOfPurchase: null,
  });

  const onChange = (e) => {
    setBookData({
      ...bookData,
      [e.target.name]: e.target.value,
    });
  };

  const uploadBookClick = async (e) => {
    e.preventDefault();
    console.log("bookdata ");
    console.log(bookData);
    try {
      let data = await uploadBookAPI(bookData);
      props.removeAlert();
      props.setAlert("Book uploaded successfully", "success");
    } catch (err) {
      props.removeAlert();
      console.log(err);
      // dispatch an alert action for each msg
      err.forEach((error) => props.setAlert(error.msg, "danger"));
    }
  };
  useEffect(() => {
    // Make a request to backend for attendance status
    /*
    const apiCall = async () => {
      var returnObj = await assignmentsAPI({
        std: props.std,
        section: props.section,
      });

      if (returnObj.success) {
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
                <a href='http://localhost:5000/api/students/pdfs'>
                  {rowData.document}
                </a>
              ),
              Deadline: <div />,
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

    apiCall(); */
  }, []);

  return (
    <div className='col-lg-8 col-md-8 col-sm-8' id='queryResultContainer'>
      <h5 style={{ margin: "0 auto", width: "30%" }}>
        <b>Upload New Book</b>
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
                  form='bookData'
                  onChange={(e) => onChange(e)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <b>Title:</b>
              </td>
              <td>
                <input
                  type='text'
                  className='form-control'
                  name='title'
                  form='bookData'
                  onChange={(e) => onChange(e)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <b>Author:</b>
              </td>
              <td>
                <input
                  type='text'
                  className='form-control'
                  name='author'
                  form='bookData'
                  required
                  onChange={(e) => onChange(e)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <b>Publisher:</b>
              </td>
              <td>
                <input
                  type='text'
                  className='form-control'
                  name='publisher'
                  required
                  form='bookData'
                  onChange={(e) => onChange(e)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <b>MRP:</b>
              </td>
              <td>
                <input
                  type='number'
                  min='1'
                  className='form-control'
                  name='mrp'
                  form='bookData'
                  required
                  onChange={(e) => onChange(e)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <b>Cost:</b>
              </td>
              <td>
                <input
                  type='number'
                  min='1'
                  className='form-control'
                  name='cost'
                  required
                  form='bookData'
                  onChange={(e) => onChange(e)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <b>Year of Purchase:</b>
              </td>
              <td>
                <input
                  type='number'
                  min='1990'
                  className='form-control'
                  name='yearOfPurchase'
                  form='bookData'
                  required
                  onChange={(e) => onChange(e)}
                />
              </td>
            </tr>
          </MDBTableBody>
        </MDBTable>
      </div>
      <form id='bookData' onSubmit={(e) => uploadBookClick(e)} />
      <div className='col-12' style={{ textAlign: "center" }}>
        <button
          type='submit'
          className='btn btn-primary btn-sm'
          id='tillDateAttendance'
          style={props.styles}
          form='bookData'
        >
          Upload Book
        </button>
      </div>
      <br />

      <Alert />
    </div>
  );
};

EnterNewBook.propTypes = {
  removeAlert: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { removeAlert, setAlert })(EnterNewBook);
