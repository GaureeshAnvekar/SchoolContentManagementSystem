import React, { useState } from "react";
import PropTypes from "prop-types";
import EnterNewBook from "./EnterNewBook";
import DeleteBook from "./DeleteBook";

const LibraryDashBoardMenuData = (props) => {
  const [menuData, setMenuData] = useState(1);

  const styles = {
    backgroundColor: props.templateInfo.backgroundColor,
    backgroundImage: props.templateInfo.backgroundImage,
  };

  const onclick = (e) => {
    if (e.target.name == "Upload") {
      setMenuData(1);
    } else if (e.target.name == "Delete") {
      setMenuData(2);
    }
  };

  function renderSwitch(menuData) {
    switch (menuData) {
      case 1:
        return <EnterNewBook styles={styles} />;
      case 2:
        return <DeleteBook styles={styles} />;
    }
  }

  return (
    <div className='row' style={{ marginLeft: "0px", marginRight: "0px" }}>
      <div className='col-lg-3 col-md-3 col-sm-3' id='buttonMenu'>
        <div className='buttonContainer'>
          <button
            className='btn btn-primary btn-block attendanceStatus'
            style={styles}
            onClick={(e) => onclick(e)}
            name='Upload'
          >
            Upload New Book
          </button>
        </div>
        <div className='buttonContainer'>
          <button
            className='btn btn-primary btn-block assignmentDetails'
            style={styles}
            onClick={(e) => onclick(e)}
            name='Delete'
          >
            Delete Book
          </button>
        </div>
        <div className='buttonContainer'>
          <button
            className='btn btn-primary btn-block parentDetails'
            style={styles}
            name='Issue'
          >
            Issue Book
          </button>
        </div>
        <div className='buttonContainer'>
          <button
            className='btn btn-primary btn-block feesDetails'
            style={styles}
            name='Receive'
          >
            Receive Book
          </button>
        </div>
        <div className='buttonContainer'>
          <button
            className='btn btn-primary btn-block resultDetails'
            style={styles}
            name='Search books'
          >
            Search Book
          </button>
        </div>
        <div className='buttonContainer'>
          <button
            className='btn btn-primary btn-block schoolEvents'
            style={styles}
            name='Search borrowers'
          >
            Search Borrowers
          </button>
        </div>
      </div>

      {renderSwitch(menuData)}
    </div>
  );
};

LibraryDashBoardMenuData.propTypes = {
  templateInfo: PropTypes.object.isRequired,
};

export default LibraryDashBoardMenuData;
