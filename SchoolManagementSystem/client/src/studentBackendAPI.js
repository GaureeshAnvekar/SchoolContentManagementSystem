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
  } catch (err) {
    const errors = err.response.data.errors;
  }
};
