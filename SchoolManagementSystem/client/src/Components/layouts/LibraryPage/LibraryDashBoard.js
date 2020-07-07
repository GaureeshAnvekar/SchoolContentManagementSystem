import React, { useEffect } from "react";
import SchoolHeader from "../SchoolHeader";
import LibraryDashBoardMenuDataContainer from "./LibraryDashBoardMenuDataContainer";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const LibraryDashboard = (props) => {
  return (
    <div
      style={{
        height: "100%",
        backgroundColor: "rgb(223, 224, 228)",
        margin: "0px",
        padding: "0px",
        width: "100%",
      }}
    >
      <SchoolHeader templateInfo={props.templateInfo} />
      <LibraryDashBoardMenuDataContainer templateInfo={props.templateInfo} />
    </div>
  );
};

LibraryDashboard.propTypes = {
  templateInfo: PropTypes.object.isRequired,
};

export default LibraryDashboard;
