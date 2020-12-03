import React from "react";
import dummyPic from "../../../images/dummyPic.png";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const EmployeeDashBoardType = (props) => {
  return (
    <div
      className='row'
      style={{
        paddingTop: "15px",
        marginBottom: "15px",
        width: "100%",
        marginLeft: "0px",
        marginRight: "0px",
      }}
    >
      <div className='col-xl-10 offset-xl-1' id='header'>
        <button
          className='btn btn-primary btn-lg'
          style={{
            borderRadius: "50%",
            float: "right",
            backgroundColor: props.templateInfo.backgroundColor,
            backgroundImage: props.templateInfo.backgroundImage,
          }}
        >
          <i
            className='fa fa-power-off'
            //style={{ color: "white", fontSize: "20px" }}
          ></i>
        </button>

        <span
          style={{
            position: "absolute",
            right: "20px",
            top: "70px",
            fontSize: "12px",
          }}
        >
          <a className='logout'>
            <b>LOGOUT</b>
          </a>
        </span>

        <img
          id='studid'
          src={dummyPic}
          style={{
            marginLeft: "15px",
            //border: "0.5px solid black",
            width: "150px",
            height: "160px",
            border: "2px solid rgb(229, 230, 233)",
            borderBottom: "6px solid rgb(229, 230, 233)",
          }}
        />

        <div id='userBasicDetails'>
          <h2 style={{ padding: "0px", margin: "0px" }}>
            Welcome to Employee page!
          </h2>

          <hr
            style={{
              height: "1px",
              backgroundColor: "black",
              color: "black",
              marginTop: "5px",
              marginBottom: "5px",
            }}
          />
          <div id='detailsWhiteBox'>
            <div id='basicDataCol1' className='basicDataCols'>
              <label className='dataLabels'>
                FirstName: {props.employeeInfo.firstName}
              </label>
              <br />
              <label className='dataLabels'>MiddleName:</label>
              <br />
              <label className='dataLabels'>
                LastName: {props.employeeInfo.lastName}
              </label>
            </div>

            <div id='basicDataCol2' className='basicDataCols'>
              <label className='dataLabels'>
                DateOfBirth:{" "}
                {new Date(props.employeeInfo.dob).toLocaleDateString("en-GB")}
              </label>
              <br />
              <label className='dataLabels'>
                Gender: {props.employeeInfo.gender}
              </label>
              <br />
              <label className='dataLabels'>BloodGroup:{null}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

EmployeeDashBoardType.propTypes = {
  templateInfo: PropTypes.object.isRequired,
  studentInfo: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  employeeInfo: state.employeeAuth,
});

export default connect(mapStateToProps, {})(EmployeeDashBoardType);
