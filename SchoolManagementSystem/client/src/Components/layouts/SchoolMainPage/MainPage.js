import React, { Fragment } from "react";
import SchoolHeader from "../SchoolHeader";
import LoginSection from "../LoginSection";

const MainPage = () => {
  return (
    <div
      style={{
        height: "100%",
        backgroundColor: "rgb(223, 224, 228)",
        margin: "0px",
        padding: "0px"
      }}
    >
      <SchoolHeader />
      <LoginSection />
    </div>
  );
};

export default MainPage;
