import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBTable, MDBTableBody } from "mdbreact";
import PropTypes from "prop-types";
import { setAlert, removeAlert } from "../../../actions/alert";
import Alert from "../Landing/Alert";
import { deleteBookAPI } from "../../../libraryBackendAPI";

const DeleteBook = (props) => {
  const [bookData, setBookData] = useState({
    bookId: null,
  });

  const onChange = (e) => {
    setBookData({
      ...bookData,
      [e.target.name]: e.target.value,
    });
  };

  const deleteBookClick = async (e) => {
    e.preventDefault();

    try {
      await deleteBookAPI(bookData);
      props.removeAlert();
      props.setAlert("Book deleted successfully", "success");
    } catch (err) {
      props.removeAlert();

      // dispatch an alert action for each msg
      err.forEach((error) => props.setAlert(error, "danger"));
    }
  };
  useEffect(() => {
    props.removeAlert();
  }, []);

  return (
    <div className='col-lg-8 col-md-8 col-sm-8' id='queryResultContainer'>
      <h5 style={{ margin: "0 auto", width: "30%" }}>
        <b>Delete Book</b>
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
                  required
                />
              </td>
            </tr>
          </MDBTableBody>
        </MDBTable>
      </div>
      <form id='bookData' onSubmit={(e) => deleteBookClick(e)} />
      <div className='col-12' style={{ textAlign: "center" }}>
        <button
          type='submit'
          className='btn btn-primary btn-sm'
          id='tillDateAttendance'
          style={props.styles}
          form='bookData'
        >
          Delete Book
        </button>
      </div>
      <Alert />
      <br />
    </div>
  );
};

DeleteBook.propTypes = {
  removeAlert: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { removeAlert, setAlert })(DeleteBook);
