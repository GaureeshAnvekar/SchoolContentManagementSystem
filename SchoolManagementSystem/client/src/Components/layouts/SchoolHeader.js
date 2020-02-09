import React from "react";
import logo from "../../images/jcLogo.png";

const SchoolHeader = () => {
  return (
    <div
      className='row'
      style={{
        backgroundColor: "#3b5950",
        backgroundImage: "linear-gradient(#4e69a2, #3b5998 50%)"
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

export default SchoolHeader;
