import React, { useState, useEffect, createRef, Component } from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  totalBooksCountAPI,
  paginationAPI,
  getQueryBooksAPI,
} from "../../../libraryBackendAPI";

import {
  getBooksToNotifyListAPI,
  saveBooksToNotifyAPI,
} from "../../../studentBackendAPI";
import PropTypes from "prop-types";
import { setAlert, removeAlert } from "../../../actions/alert";
import Alert from "../Landing/Alert";
import { Tabs, Tab, Modal } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { Checkmark } from "react-checkmark";
import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";
import Spinner from "react-bootstrap/Spinner";
import Axios from "axios";

const VirtualLibrary = (props) => {
  const [queryBooksInfo, setQueryBooksInfo] = useState({
    queryBooksMap: new Map(),
    isLoading: false,
    displayBooksPage: null,
    removeTabs: false,
  });

  const [novelsPaginationInfo, setNovelsPaginationInfo] = useState({
    activePage: 1,
    booksCountPerPage: 10,
    totalBooksCount: 0,
    pageRangeDisplayed: 4,
    isLoading: false,
    displayBooksPage: null,
    novelsMap: new Map(),
  });

  const [fictionPaginationInfo, setFictionPaginationInfo] = useState({
    activePage: 1,
    booksCountPerPage: 10,
    totalBooksCount: 0,
    pageRangeDisplayed: 4,
    isLoading: false,
    displayBooksPage: null,
    fictionMap: new Map(),
  });

  const [openPopup, setOpenPopup] = useState(false);
  const closeModal = () => setOpenPopup(false);

  const [activeTab, setActiveTab] = useState("novels");
  const [booksToNotify, setBooksToNotify] = useState(new Set());

  var bodyStyles = document.body.style;

  bodyStyles.setProperty("--table-link-color", props.styles.backgroundColor);
  bodyStyles.setProperty("--table-link-image", props.styles.backgroundImage);
  bodyStyles.setProperty("--page-link-color", props.styles.backgroundColor);

  const setTab = (genre) => {
    if (genre == "novels") {
      if (novelsPaginationInfo.novelsMap.has(1)) {
        setNovelsPaginationInfo({
          ...novelsPaginationInfo,
          displayBooksPage: novelsPaginationInfo.novelsMap.get(1),
          activePage: 1,
        });
      } else {
        apiCall(1, "novels");
      }
      setActiveTab("novels");
    } else if (genre == "fiction") {
      if (fictionPaginationInfo.fictionMap.has(1)) {
        setFictionPaginationInfo({
          ...fictionPaginationInfo,
          displayBooksPage: fictionPaginationInfo.fictionMap.get(1),
          activePage: 1,
        });
      } else {
        apiCall(1, "fiction");
      }
      setActiveTab("fiction");
    }
  };

  const onNotifyClick = (e, id, bookId) => {
    e.preventDefault();

    var currPage = null;
    var booksOfCurrPage = null;
    var arrIndex = null;
    var currBook = null;

    if (queryBooksInfo.removeTabs) {
      currBook = queryBooksInfo.queryBooksMap.get(id);
      if (currBook.notify) {
        currBook.notifyRef.current.style.display = "none";
        currBook.notify = false;
        setQueryBooksInfo({
          ...queryBooksInfo,
          queryBooksMap: queryBooksInfo.queryBooksMap.set(id, currBook),
        });
        booksToNotify.delete(bookId);
        setBooksToNotify(booksToNotify);
      } else {
        currBook.notifyRef.current.style.display = "inline";
        currBook.notify = true;
        setQueryBooksInfo({
          ...queryBooksInfo,
          queryBooksMap: queryBooksInfo.queryBooksMap.set(id, currBook),
        });
        setOpenPopup(true);
        setBooksToNotify(booksToNotify.add(bookId));
      }
    } else if (activeTab == "novels") {
      currPage = novelsPaginationInfo.activePage;
      booksOfCurrPage = novelsPaginationInfo.novelsMap.get(currPage);
      arrIndex = id - (currPage - 1) * 5;
      currBook = booksOfCurrPage[arrIndex];

      if (currBook.notify) {
        currBook.notifyRef.current.style.display = "none";
        booksOfCurrPage[arrIndex].notify = false;
        var newMap = novelsPaginationInfo.novelsMap.set(
          currPage,
          booksOfCurrPage
        );
        setNovelsPaginationInfo({
          ...novelsPaginationInfo,
          novelsMap: newMap,
        });
        booksToNotify.delete(bookId);
        setBooksToNotify(booksToNotify);
      } else {
        currBook.notifyRef.current.style.display = "inline";
        booksOfCurrPage[arrIndex].notify = true;
        var newMap = novelsPaginationInfo.novelsMap.set(
          currPage,
          booksOfCurrPage
        );
        setNovelsPaginationInfo({
          ...novelsPaginationInfo,
          novelsMap: newMap,
        });
        setOpenPopup(true);
        setBooksToNotify(booksToNotify.add(bookId));
      }
    } else if (activeTab == "fiction") {
      currPage = fictionPaginationInfo.activePage;
      booksOfCurrPage = fictionPaginationInfo.fictionMap.get(currPage);
      arrIndex = id - (currPage - 1) * 5;
      currBook = booksOfCurrPage[arrIndex];

      if (currBook.notify) {
        currBook.notifyRef.current.style.display = "none";
        booksOfCurrPage[arrIndex].notify = false;
        var newMap = fictionPaginationInfo.fictionMap.set(
          currPage,
          booksOfCurrPage
        );
        setFictionPaginationInfo({
          ...fictionPaginationInfo,
          fictionMap: newMap,
        });
        booksToNotify.delete(bookId);
        setBooksToNotify(booksToNotify);
      } else {
        currBook.notifyRef.current.style.display = "inline";
        booksOfCurrPage[arrIndex].notify = true;
        var newMap = fictionPaginationInfo.fictionMap.set(
          currPage,
          booksOfCurrPage
        );
        setFictionPaginationInfo({
          ...fictionPaginationInfo,
          fictionMap: newMap,
        });
        setOpenPopup(true);
        setBooksToNotify(booksToNotify.add(bookId));
      }
    }
  };

  const onNovelsPaginationChange = (pageNumber) => {
    if (pageNumber == novelsPaginationInfo.activePage) {
      return;
    } else if (novelsPaginationInfo.novelsMap.has(pageNumber)) {
      console.log(novelsPaginationInfo.novelsMap.get(pageNumber));
      setNovelsPaginationInfo({
        ...novelsPaginationInfo,
        activePage: pageNumber,
        displayBooksPage: novelsPaginationInfo.novelsMap.get(pageNumber),
      });
    } else {
      apiCall(pageNumber, "novels");
    }
  };

  const onFictionPaginationChange = (pageNumber) => {
    if (pageNumber == fictionPaginationInfo.activePage) {
      return;
    } else if (fictionPaginationInfo.fictionMap.has(pageNumber)) {
      setFictionPaginationInfo({
        ...fictionPaginationInfo,
        activePage: pageNumber,
        displayBooksPage: fictionPaginationInfo.fictionMap.get(pageNumber),
      });
    } else {
      apiCall(pageNumber, "fiction");
    }
  };

  const displayBooks = (books) => {
    var count = 0;

    if (books == null) {
      return null;
    }
    return (
      <div>
        {books.map((bookObj) => (
          <div
            class='row'
            style={{ borderBottom: "1px solid #dee2e6", paddingTop: "8px" }}
          >
            <div class='col-md-4'>
              <img src={"data:image/jpeg;base64, " + bookObj.image} />
            </div>

            <div class='col-md-4'>
              <p
                style={{
                  color: "#495057",
                  textDecoration: "underline",
                }}
              >
                {bookObj.title}
              </p>
              {bookObj.authors.map((author) => {
                return <p style={{ color: "#495057" }}>{author}</p>;
              })}
            </div>
            <div class='col-md-4'>
              <p>
                <StarRatings
                  rating={bookObj.averageRating}
                  starRatedColor='orange'
                  //changeRating={this.changeRating}
                  numberOfStars={5}
                  name='rating'
                  starDimension='25px'
                />
              </p>
              <p>Available: {bookObj.isAvailable ? "Yes" : "No"}</p>
              <p>
                <a href={bookObj.previewLink} target='_blank'>
                  Preview
                </a>
              </p>
              <p>
                <a href={bookObj.writeRevLink} target='_blank'>
                  Write a review
                </a>
              </p>
              {!bookObj.isAvailable ? (
                <p>
                  <a
                    href='#'
                    onClick={(e) =>
                      onNotifyClick(e, bookObj.id, bookObj.bookId)
                    }
                  >
                    Notify:{" "}
                  </a>
                  <span
                    id={bookObj.id}
                    ref={bookObj.notifyRef}
                    style={{
                      display: booksToNotify.has(bookObj.bookId)
                        ? "inline"
                        : "none",
                    }}
                  >
                    <Checkmark id={bookObj.id} size='medium' color='green' />{" "}
                  </span>
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const searchBookApiCall = async (query) => {
    props.removeAlert();
    setQueryBooksInfo({
      ...queryBooksInfo,
      displayBooksPage: null,
      isLoading: true,
      removeTabs: true,
    });
    //api call to get queried books

    try {
      var queryBooks = await getQueryBooksAPI(query);

      var pageBooks = [];
      var totalBooksCount = queryBooks.length;

      if (totalBooksCount == 0) {
        props.setAlert("No books found", "danger");
        setQueryBooksInfo({
          ...queryBooksInfo,
          displayBooksPage: null,
          isLoading: false,
          removeTabs: true,
        });
      }

      for (var i = 0; i < queryBooks.length; i++) {
        var book = queryBooks[i];

        var thumbnailBytes = await Axios.get(
          "https://cors-anywhere.herokuapp.com/" + book.imageLink,
          {
            responseType: "arraybuffer",
          }
        );

        var imageBase64Str = Buffer.from(
          thumbnailBytes.data,
          "binary"
        ).toString("base64");

        var bookObj = {
          id: i + "s",
          title: book.title,
          authors: book.author,
          averageRating: book.averageRating,
          image: imageBase64Str,
          previewLink: book.previewLink,
          writeRevLink: book.writeRevLink,
          notifyRef: createRef(),
          notify: booksToNotify.has(book.bookId) ? true : false,
          isAvailable: book.isAvailable,
          bookId: book.bookId,
        };

        pageBooks.push(bookObj);

        setQueryBooksInfo({
          ...queryBooksInfo,
          displayBooksPage: pageBooks,

          queryBooksMap: queryBooksInfo.queryBooksMap.set(i + "s", bookObj),
          removeTabs: true,
          isLoading: i == queryBooks.length - 1 ? false : true,
        });
      }
    } catch (err) {}
  };
  //search books using search box on enter
  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      if (e.target.value != "") {
        searchBookApiCall(e.target.value);
      }
    }
  };

  const apiCall = async (pageNumber, genre) => {
    try {
      //Remove current display first and setup spinner
      if (genre == "novels") {
        setNovelsPaginationInfo({
          ...novelsPaginationInfo,
          activePage: pageNumber,
          isLoading: true,
          displayBooksPage: null,
        }); // spinner for loading
      } else if (genre == "fiction") {
        setFictionPaginationInfo({
          ...fictionPaginationInfo,
          activePage: pageNumber,
          isLoading: true,
          displayBooksPage: null,
        }); // spinner for loading
      }

      //First get count of books
      var totalBooksCount = await totalBooksCountAPI(genre);
      var paginatedResults = await paginationAPI(pageNumber, genre);

      var booksToNotifyList = await getBooksToNotifyListAPI();

      //Make a set out of the array
      booksToNotifyList.forEach((bookId) => {
        setBooksToNotify(booksToNotify.add(bookId));
      });

      //novelsMap.set(1, []);

      //Now for each result from paginatedresults, hit google api to get more info about the book
      var pageBooks = [];

      var offSet = (pageNumber - 1) * 5;

      for (var i = 0; i < paginatedResults.length; i++) {
        var book = paginatedResults[i];

        var thumbnailBytes = await Axios.get(
          "https://cors-anywhere.herokuapp.com/" + book.imageLink,
          {
            responseType: "arraybuffer",
          }
        );

        var imageBase64Str = Buffer.from(
          thumbnailBytes.data,
          "binary"
        ).toString("base64");

        var bookObj = {
          id: offSet + i,
          title: book.title,
          authors: book.author,
          averageRating: book.averageRating,
          image: imageBase64Str,
          previewLink: book.previewLink,
          writeRevLink: book.writeRevLink,
          notifyRef: createRef(),
          notify: booksToNotify.has(book.bookId) ? true : false,
          isAvailable: book.isAvailable,
          bookId: book.bookId,
        };

        pageBooks.push(bookObj);

        if (genre == "novels") {
          setNovelsPaginationInfo({
            ...novelsPaginationInfo,
            displayBooksPage: pageBooks,
            totalBooksCount: totalBooksCount,
            activePage: pageNumber,
            isLoading: i == paginatedResults.length - 1 ? false : true,
            novelsMap: novelsPaginationInfo.novelsMap.set(
              pageNumber,
              pageBooks
            ),
          });
        } else if (genre == "fiction") {
          setFictionPaginationInfo({
            ...fictionPaginationInfo,
            displayBooksPage: pageBooks,
            totalBooksCount: totalBooksCount,
            activePage: pageNumber,
            isLoading: i == paginatedResults.length - 1 ? false : true,
            fictionMap: fictionPaginationInfo.fictionMap.set(
              pageNumber,
              pageBooks
            ),
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    apiCall(1, "novels"); // pass page number 1 and novels tab initially

    return function cleanUp() {
      if (booksToNotify.size > 0) {
        var booksToNotifyArr = [];
        booksToNotify.forEach((bookId) => {
          booksToNotifyArr.push(bookId);
        });

        //save this list in backend

        saveBooksToNotifyAPI(booksToNotifyArr);
      }
    };
  }, []);

  return (
    <div >
      <h5 style={{ margin: "0 auto", width: "30%", textAlign: "center" }}>
        <b>Virtual Library</b>
      </h5>
      <hr
        style={{
          height: "1px",
          backgroundColor: "black",
          color: "black",
          marginTop: "5px",
          marginBottom: "5px",
        }}
      />

      <input
        id='searchBooks'
        type='text'
        class='form-control list-search-bar'
        placeholder="Search by a book's title or author"
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          if (e.target.value == "") {
            props.removeAlert();
            setQueryBooksInfo({
              ...queryBooksInfo,
              removeTabs: false,
              displayBooksPage: null,
              queryBooksMap: new Map(),
            });
          }
        }}
      />

      <Alert></Alert>
      <div>{displayBooks(queryBooksInfo.displayBooksPage)}</div>
      <div style={{ textAlign: "center", marginTop: "8px" }}>
        <div style={{ display: "inline-block" }}>
          {queryBooksInfo.isLoading ? (
            <Spinner animation='border' role='status'>
              <span className='sr-only'>Loading...</span>
            </Spinner>
          ) : null}
        </div>
      </div>

      {!queryBooksInfo.removeTabs ? (
        <Tabs
          defaultActiveKey='novels'
          id='uncontrolled-tab-example'
          //activeKey={genre}
          onSelect={(genre) => setTab(genre)}
        >
          <Tab eventKey='novels' title='Novels'>
            <br></br>
            <div>{displayBooks(novelsPaginationInfo.displayBooksPage)}</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ display: "inline-block" }}>
                {novelsPaginationInfo.isLoading ? (
                  <Spinner animation='border' role='status'>
                    <span className='sr-only'>Loading...</span>
                  </Spinner>
                ) : null}
              </div>
            </div>
            <br></br>
            <div style={{ textAlign: "center" }}>
              <div style={{ display: "inline-block" }}>
                <Pagination
                  activePage={novelsPaginationInfo.activePage}
                  itemsCountPerPage={5}
                  totalItemsCount={novelsPaginationInfo.totalBooksCount}
                  pageRangeDisplayed={5}
                  itemClass='page-item'
                  linkClass='page-link'
                  onChange={(pageNumber) =>
                    onNovelsPaginationChange(pageNumber)
                  }
                />
              </div>
            </div>
          </Tab>
          <Tab eventKey='fiction' title='Fiction'>
            <br></br>
            <div>{displayBooks(fictionPaginationInfo.displayBooksPage)}</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ display: "inline-block" }}>
                {fictionPaginationInfo.isLoading ? (
                  <Spinner animation='border' role='status'>
                    <span className='sr-only'>Loading...</span>
                  </Spinner>
                ) : null}
              </div>
            </div>
            <br></br>
            <div style={{ textAlign: "center" }}>
              <div style={{ display: "inline-block" }}>
                <Pagination
                  activePage={fictionPaginationInfo.activePage}
                  itemsCountPerPage={5}
                  totalItemsCount={fictionPaginationInfo.totalBooksCount}
                  pageRangeDisplayed={5}
                  itemClass='page-item'
                  linkClass='page-link'
                  onChange={(pageNumber) =>
                    onFictionPaginationChange(pageNumber)
                  }
                />
              </div>
            </div>
          </Tab>
          <Tab eventKey='nonFiction' title='Non-Fiction'></Tab>
          <Tab eventKey='technology' title='Technology'></Tab>
        </Tabs>
      ) : null}
      <Modal show={openPopup} onHide={closeModal}>
        <Modal.Header closeButton>
          An email notification will be sent to you once this book is available!
        </Modal.Header>
      </Modal>
    </div>
  );
};

VirtualLibrary.propTypes = {
  std: PropTypes.number.isRequired,
  section: PropTypes.string.isRequired,
  removeAlert: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  std: state.studentAuth.classGrade,
  section: state.studentAuth.section,
});

export default connect(mapStateToProps, { removeAlert, setAlert })(
  VirtualLibrary
);
