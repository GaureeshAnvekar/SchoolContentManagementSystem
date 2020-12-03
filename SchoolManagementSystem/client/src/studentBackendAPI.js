import axios from "axios";
import setAuthToken from "./utils/setAuthToken";

export const attendanceAPI = async (attendanceType = null) => {
  const endPoint = "http://localhost:5000/api/students/attendanceStatus";

  setAuthToken(localStorage.studenttoken);

  try {
    const body = JSON.stringify(attendanceType);

    const res = await axios.post(endPoint, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { success: 1, data: res.data };
  } catch (err) {
    const errors = err.response.data.errors;
    console.log("ERRORS ");
    console.log(errors);
    return { success: -1, error: errors[0] };
  }
};

export const assignmentsAPI = async (requestBody = null) => {
  const endPoint = "http://localhost:5000/api/students/assignments";

  setAuthToken(localStorage.studenttoken);

  try {
    const body = JSON.stringify(requestBody);

    const res = await axios.post(endPoint, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    return { success: 1, data: res.data };
  } catch (err) {
    const errors = err.response.data.errors;
    return { success: -1, error: errors[0] };
  }
};

export const saveBooksToNotifyAPI = async (booksToNotifyArr) => {
  const endPoint = "http://localhost:5000/api/students/saveBooksToNotify";

  setAuthToken(localStorage.studenttoken);

  try {
    const body = JSON.stringify(booksToNotifyArr);

    const res = await axios.post(endPoint, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    //return res.data.bookDue;
  } catch (err) {
    const errors = err.response.data.errors;

    throw (new Error().errors = errors);
  }
};

export const getBooksToNotifyListAPI = async () => {
  const endPoint = "http://localhost:5000/api/students/getBooksToNotifyList";

  setAuthToken(localStorage.studenttoken);

  try {
    const res = await axios.get(endPoint);

    return res.data[0].booksToNotify;
  } catch (err) {
    const errors = err.response.data.errors;

    throw (new Error().errors = errors);
  }
};
