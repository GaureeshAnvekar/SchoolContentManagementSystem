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
    genre: null,
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
    try {
      props.removeAlert();
      await uploadBookAPI(bookData);

      props.setAlert("Book uploaded successfully", "success");
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
                  required
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
                  required
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
                <b>Genre:</b>
              </td>
              <td>
                <select
                  type='text'
                  className='form-control'
                  name='genre'
                  form='bookData'
                  onChange={(e) => {
                    if (e.target.value != "") {
                      setBookData({ ...bookData, genre: e.target.value });
                    }
                  }}
                >
                  <option value=''>SELECT GENRE</option>
                  <option value='novels'>Novels</option>
                  <option value='fiction'>Fiction</option>
                  <option value='non-fiction'>Non-fiction</option>
                  <option value='technology'>Technology</option>
                </select>
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
                  onKeyDown={(e) => {
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
      <Alert />
      <br />
    </div>
  );
};

EnterNewBook.propTypes = {
  removeAlert: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { removeAlert, setAlert })(EnterNewBook);
