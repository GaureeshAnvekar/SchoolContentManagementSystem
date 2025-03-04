// Contains the DashBoardMenu and DashBoardMenuData components
import React from "react";
import DashBoardMenu from "./DashBoardMenu";
import PropTypes from "prop-types";

const DashBoardMenuDataContainer = (props) => {
  return (
    <div
      className='row'
      style={{
        backgroundColor: "rgb(223, 224, 228)",
        width: "100%",
        marginLeft: "0px",
        marginRight: "0px",
      }}
    >
      <div
        className='offset-xl-1 col-xl-10'
        id='DashBoardContainer'
        style={{ padding: "20px" }}
      >
        <DashBoardMenu templateInfo={props.templateInfo} />
      </div>
    </div>
  );
};

DashBoardMenuDataContainer.propTypes = {
  templateInfo: PropTypes.object.isRequired,
};

export default DashBoardMenuDataContainer;
