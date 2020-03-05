import React from "react";
import logo from "../../images/jcLogo.png";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const SchoolHeader = props => {
  return (
    <div
      className='row'
      id='schoolHeader'
      style={{
        backgroundColor: props.template.backgroundColor,
        backgroundImage: props.template.backgroundImage,
        width: "100%",
        margin: "0px"
      }}
    >
      <div className='col-sm-12' style={{ padding: "20px" }}>
        <img
          id='logo'
          src={logo}
          style={{ margin: "0 auto", display: "block", height: "90px" }}
        />
        <br></br>
        <h1
          id='schoolName'
          style={{ textAlign: "center", color: "white", fontFamily: "Cinzel" }}
        >
          BUXI JAGABANDHU ENGLISH MEDIUM SCHOOL
        </h1>
      </div>
    </div>
  );
};

SchoolHeader.propTypes = {
  template: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  template: state.setTemplate
});

export default connect(mapStateToProps, null)(SchoolHeader);
