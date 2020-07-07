// Contains the DashBoardMenu and DashBoardMenuData components
import React from "react";
import LibraryDashBoardMenuData from "./LibraryDashBoardMenuData";
import PropTypes from "prop-types";

const LibraryDashBoardMenuDataContainer = (props) => {
  return (
    <div
      className='row'
      style={{
        backgroundColor: "rgb(223, 224, 228)",
        width: "100%",
        marginLeft: "0px",
        marginRight: "0px",
        marginTop: "20px",
      }}
    >
      <div
        className='offset-xl-1 col-xl-10'
        id='DashBoardContainer'
        style={{ padding: "20px", paddingRight: "0px" }}
      >
        <LibraryDashBoardMenuData templateInfo={props.templateInfo} />
      </div>
    </div>
  );
};

LibraryDashBoardMenuDataContainer.propTypes = {
  templateInfo: PropTypes.object.isRequired,
};

export default LibraryDashBoardMenuDataContainer;
