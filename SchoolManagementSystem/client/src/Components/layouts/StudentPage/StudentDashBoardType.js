import React from "react";
import dummyPic from "../../images/dummyPic.png";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const DashBoardType = props => {
  return (
    <div
      className='row'
      style={{
        paddingTop: "15px",
        marginBottom: "15px",
        width: "100%",
        marginLeft: "0px",
        marginRight: "0px"
      }}
    >
      <div className='col-xl-10 offset-xl-1' id='header'>
        <button
          className='btn btn-primary btn-lg'
          style={{
            borderRadius: "50%",
            float: "right",
            backgroundColor: props.template.backgroundColor,
            backgroundImage: props.template.backgroundImage
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
            fontSize: "12px"
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
            height: "160px"
          }}
        />

        <div id='userBasicDetails'>
          <h2 style={{ padding: "0px", margin: "0px" }}>
            Welcome to Student page!
          </h2>

          <hr
            style={{
              height: "1px",
              backgroundColor: "black",
              color: "black",
              marginTop: "5px",
              marginBottom: "5px"
            }}
          />
          <div id='detailsWhiteBox'>
            <div id='basicDataCol1' className='basicDataCols'>
              <label className='dataLabels'>FirstName: Gaureesh</label>
              <br />
              <label className='dataLabels'>MiddleName: Gurudas</label>
              <br />
              <label className='dataLabels'>LastName: Anvekar</label>
            </div>
            <div id='basicDataCol2' className='basicDataCols'>
              <label className='dataLabels'>RollNo:</label>
              <br />
              <label className='dataLabels'>Standard:</label>
              <br />
              <label className='dataLabels'>DateOfBirth: 26-10-1992</label>
            </div>
            <div
              id='basicDataCol3'
              className='basicDataCols'
              style={{ verticalAlign: "top" }}
            >
              <label className='dataLabels'>BloodGroup:</label>
              <br />
              <label className='dataLabels'>Gender: Male</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

DashBoardType.propTypes = {
  template: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  template: state.setTemplate
});

export default connect(mapStateToProps, null)(DashBoardType);
