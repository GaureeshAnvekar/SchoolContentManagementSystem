import React from "react";
import SchoolHeader from "../SchoolHeader";
import DashBoardType from "../DashBoardType";
import DashBoardContainer from "../DashBoardContainer";

const Dashboard = () => {
  return (
    <div
      style={{
        height: "100%",
        backgroundColor: "rgb(223, 224, 228)",
        margin: "0px",
        padding: "0px",
        width: "100%"
      }}
    >
      <SchoolHeader />
      <DashBoardType />
      <DashBoardContainer />
    </div>
  );
};

export default Dashboard;
