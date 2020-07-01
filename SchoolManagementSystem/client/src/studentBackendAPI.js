import axios from "axios";
import setAuthToken from "./utils/setAuthToken";

export const attendanceAPI = async (attendanceType = null) => {
  const endPoint = "http://localhost:5000/api/students/attendanceStatus";

  setAuthToken(localStorage.token);

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

  //setAuthToken(localStorage.token);

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
    console.log("ERRORS ");
    console.log(errors);
    return { success: -1, error: errors[0] };
  }
};
