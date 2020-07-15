import axios from "axios";
import setAuthToken from "./utils/setAuthToken";

export const uploadBookAPI = async (bookData = null) => {
  const endPoint = "http://localhost:5000/api/library/uploadBook";

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
  const endPoint = "http://localhost:5000/api/library/deleteBook";

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
