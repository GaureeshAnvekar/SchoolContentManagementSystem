import axios from "axios";
import setAuthToken from "./utils/setAuthToken";

export const uploadBookAPI = async (bookData = null) => {
  const endPoint = "http://easyschool.academy/api/library/uploadBook";

  setAuthToken(localStorage.token);

  try {
    const body = JSON.stringify(bookData);

    const res = await axios.post(endPoint, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return 1;
  } catch (err) {
    const errors = err.response.data.errors;

    throw (new Error().errors = errors);
  }
};

export const deleteBookAPI = async (bookId = null) => {
  const endPoint = "http://easyschool.academy/api/library/deleteBook";

  setAuthToken(localStorage.token);

  try {
    const body = JSON.stringify(bookId);

    const res = await axios.post(endPoint, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return 1;
  } catch (err) {
    const errors = err.response.data.errors;
    console.log("delete book errs " + errors);
    throw (new Error().errors = errors);
  }
};

export const issueBookAPI = async (issueData = null) => {
  const endPoint = "http://easyschool.academy/api/library/issueBook";

  setAuthToken(localStorage.token);

  try {
    const body = JSON.stringify(issueData);

    const res = await axios.post(endPoint, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return 1;
  } catch (err) {
    const errors = err.response.data.errors;

    throw (new Error().errors = errors);
  }
};

export const receiveBookAPI = async (receiveData = null) => {
  const endPoint = "http://easyschool.academy/api/library/receiveBook";

  setAuthToken(localStorage.token);

  let data = {
    regId: receiveData.regId,
    bookId: receiveData.bookId,
    currBookDue: receiveData.currBookDue,
    returnDate: receiveData.returnDate,
  };
  try {
    const body = JSON.stringify(data);

    const res = await axios.post(endPoint, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return 1;
  } catch (err) {
    const errors = err.response.data.errors;

    throw (new Error().errors = errors);
  }
};

export const calculateDueAPI = async (bookId = null) => {
  const endPoint = "http://easyschool.academy/api/library/calculateDue";

  setAuthToken(localStorage.token);

  try {
    const body = JSON.stringify(bookId);

    const res = await axios.post(endPoint, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data.bookDue;
  } catch (err) {
    const errors = err.response.data.errors;

    throw (new Error().errors = errors);
  }
};

export const searchBooksAPI = async () => {
  const endPoint = "http://easyschool.academy/api/library/searchBooks";

  setAuthToken(localStorage.token);

  try {
    const res = await axios.get(endPoint, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { success: 1, data: res.data };
  } catch (err) {
    const errors = err.response.data.errors;

    throw (new Error().errors = errors);
  }
};

export const searchBorrowersAPI = async () => {
  const endPoint = "http://easyschool.academy/api/library/searchBorrowers";

  setAuthToken(localStorage.token);

  try {
    const res = await axios.get(endPoint, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { success: 1, data: res.data };
  } catch (err) {
    const errors = err.response.data.errors;

    throw (new Error().errors = errors);
  }
};

export const totalBooksCountAPI = async (genre = "") => {
  const endPoint =
    "http://easyschool.academy/api/library/totalBooksCount?genre=" + genre;

  setAuthToken(localStorage.studenttoken);

  try {
    const res = await axios.get(endPoint, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (err) {
    const errors = err.response.data.errors;

    throw (new Error().errors = errors);
  }
};

export const paginationAPI = async (page = 0, genre = "") => {
  const endPoint =
    "http://easyschool.academy/api/library/pagination?page=" +
    page +
    "&genre=" +
    genre;

  setAuthToken(localStorage.studenttoken);

  try {
    const res = await axios.get(endPoint, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (err) {
    const errors = err.response.data.errors;

    throw (new Error().errors = errors);
  }
};

export const getQueryBooksAPI = async (query = null) => {
  const endPoint =
    "http://easyschool.academy/api/library/pagination?query=" + query;

  setAuthToken(localStorage.studenttoken);

  try {
    const res = await axios.get(endPoint);

    return res.data;
  } catch (err) {
    const errors = err.response.data.errors;

    throw (new Error().errors = errors);
  }
};
