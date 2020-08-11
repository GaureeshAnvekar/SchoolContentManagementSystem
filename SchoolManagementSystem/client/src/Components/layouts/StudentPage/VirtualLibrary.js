import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { MDBDataTable } from "mdbreact";
import { assignmentsAPI } from "../../../studentBackendAPI";
import PropTypes from "prop-types";
import { setAlert, removeAlert } from "../../../actions/alert";
import Alert from "../Landing/Alert";
import { Tabs, Tab } from "react-bootstrap";
import axios from "axios";

import jsonp from "jsonp-promise";

const VirtualLibrary = (props) => {
  const [tableData, setTableData] = useState({
    tableCols: [],
    tableRows: [],
  });

  var bodyStyles = document.body.style;

  bodyStyles.setProperty("--table-link-color", props.styles.backgroundColor);
  bodyStyles.setProperty("--table-link-image", props.styles.backgroundImage);

  useEffect(() => {
    // Make a request to backend for attendance status

    const apiCall = async () => {
      /*
      var returnObj = await assignmentsAPI({
        std: props.std,
        section: props.section,
      }); */

      const endPoint =
        "https://cors-anywhere.herokuapp.com/https://www.googleapis.com/books/v1/volumes?q=flower+inauthor:keyes&maxResults=1&key=AIzaSyC8N4DHQxyY5OtJmkrOFfzx_ykcK93oppI";
      var bookThumbnailSrc;
      var title;
      var authors;

      const endPoint2 =
        "https://cors-anywhere.herokuapp.com/https://www.googleapis.com/books/v1/volumes?q=wildergirls&maxResults=1&key=AIzaSyC8N4DHQxyY5OtJmkrOFfzx_ykcK93oppI";
      var bookThumbnailSrc2;
      var title2;
      var authors2;
      try {
        //to get isbn of a book
        const res1 = await axios.get(endPoint);

        var isbn =
          res1.data.items[0].volumeInfo.industryIdentifiers[0].identifier;

        const reswilder = await axios.get(endPoint2);
        //jsonp by default will hit a proxy server, don't use cors-anywhere
        //Once we get isbn, we will request for additional info like thumbnail etc
        let res2 = await jsonp(
          "https://books.google.com/books?bibkeys=ISBN:" +
            isbn +
            "&jscmd=viewapi"
        ).promise;

        var isbn2 =
          reswilder.data.items[0].volumeInfo.industryIdentifiers[0].identifier;
        let res3 = await jsonp(
          "https://books.google.com/books?bibkeys=ISBN:" +
            isbn2 +
            "&jscmd=viewapi"
        ).promise;

        bookThumbnailSrc = res2["ISBN:" + isbn].thumbnail_url;
        title = res1.data.items[0].volumeInfo.title;
        authors = res1.data.items[0].volumeInfo.authors;

        bookThumbnailSrc2 = res3["ISBN:" + isbn2].thumbnail_url;
        title2 = reswilder.data.items[0].volumeInfo.title;
        authors2 = reswilder.data.items[0].volumeInfo.authors;
      } catch (err) {
        const errors = err.response.data.errors;

        throw (new Error().errors = errors);
      }
      /*
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
      */

      setTableData({
        ...tableData,
        tableCols: [{ label: "", field: "one" }],
        tableRows: [
          {
            one: (
              <div class='row'>
                <div class='col-sm-4'>
                  <img src={bookThumbnailSrc} />
                </div>

                <div class='col-sm-8'>
                  <p style={{ color: "#495057", textDecoration: "underline" }}>
                    {title}
                  </p>

                  {authors.map((author) => {
                    return <p style={{ color: "#495057" }}>{author}</p>;
                  })}
                </div>
              </div>
            ),
          },
          {
            one: (
              <div class='row'>
                <div class='col-sm-4'>
                  <img src={bookThumbnailSrc2} />
                </div>

                <div class='col-sm-8'>
                  <p style={{ color: "#495057", textDecoration: "underline" }}>
                    {title2}
                  </p>

                  {authors2.map((author) => {
                    return <p style={{ color: "#495057" }}>{author}</p>;
                  })}
                </div>
              </div>
            ),
          },
        ],
      });
    };

    apiCall();
  }, []);

  return (
    <div className='col-lg-8 col-md-8 col-sm-8' id='queryResultContainer'>
      <h5 style={{ margin: "0 auto", width: "30%" }}>
        <b>Virtual Library</b>
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
      <Tabs defaultActiveKey='novels' id='uncontrolled-tab-example'>
        <Tab eventKey='novels' title='Novels'>
          <div>
            <MDBDataTable
              responsive
              searching={true}
              data={{ columns: tableData.tableCols, rows: tableData.tableRows }}
            ></MDBDataTable>
          </div>
        </Tab>
        <Tab eventKey='fiction' title='Fiction'></Tab>
        <Tab eventKey='nonFiction' title='Non-Fiction'></Tab>
        <Tab eventKey='technology' title='Technology'></Tab>
      </Tabs>
      {/*
      <div>
        <MDBTable responsive>
          <MDBTableHead columns={tableData.tableCols} />
          <MDBTableBody rows={tableData.tableRows} />
        </MDBTable>
      </div> */}
    </div>
  );
};

VirtualLibrary.propTypes = {
  std: PropTypes.number.isRequired,
  section: PropTypes.string.isRequired,
  removeAlert: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  std: state.studentAuth.classGrade,
  section: state.studentAuth.section,
});

export default connect(mapStateToProps, { removeAlert, setAlert })(
  VirtualLibrary
);
