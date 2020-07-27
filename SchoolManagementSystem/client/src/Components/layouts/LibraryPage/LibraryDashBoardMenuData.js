import React, { useState } from "react";
import PropTypes from "prop-types";
import EnterNewBook from "./EnterNewBook";
import DeleteBook from "./DeleteBook";
import IssueBook from "./IssueBook";
import ReceiveBook from "./ReceiveBook";
import SearchBooks from "./SearchBooks";

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
    } else if (e.target.name == "Issue") {
      setMenuData(3);
    } else if (e.target.name == "Receive") {
      setMenuData(4);
    } else if (e.target.name == "SearchBooks") {
      setMenuData(5);
    }
  };

  function renderSwitch(menuData) {
    switch (menuData) {
      case 1:
        return <EnterNewBook styles={styles} />;
      case 2:
        return <DeleteBook styles={styles} />;
      case 3:
        return <IssueBook styles={styles} />;
      case 4:
        return <ReceiveBook styles={styles} />;
      case 5:
        return <SearchBooks styles={styles} />;
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
            onClick={(e) => onclick(e)}
            name='Issue'
          >
            Issue Book
          </button>
        </div>
        <div className='buttonContainer'>
          <button
            className='btn btn-primary btn-block feesDetails'
            style={styles}
            onClick={(e) => onclick(e)}
            name='Receive'
          >
            Receive Book
          </button>
        </div>
        <div className='buttonContainer'>
          <button
            className='btn btn-primary btn-block resultDetails'
            style={styles}
            onClick={(e) => onclick(e)}
            name='SearchBooks'
          >
            Search Book
          </button>
        </div>
        <div className='buttonContainer'>
          <button
            className='btn btn-primary btn-block schoolEvents'
            style={styles}
            name='SearchBorrowers'
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
