// Contains the DashBoardMenu and DashBoardMenuData components
import React from "react";
import DashBoardMenu from "./DashBoardMenu";

const DashBoardContainer = () => {
  return (
    <div
      className='row'
      style={{ backgroundColor: "rgb(223, 224, 228)", width: "100%" }}
    >
      <div
        className='offset-lg-1 col-lg-10'
        id='DashBoardContainer'
        style={{ padding: "20px" }}
      >
        <DashBoardMenu />
      </div>
    </div>
  );
};

export default DashBoardContainer;
