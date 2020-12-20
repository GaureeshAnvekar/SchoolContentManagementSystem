import axios from "axios";
import { AUTH_SUCCESS, AUTH_FAIL, SET_ALERT } from "./types";
//Using setAlert action
import { setAlert, removeAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

// Authenctication
export const auth = ({ schoolId, username, password, loginType }) => async (
  dispatch
) => {
  if (loginType == "admin") {
    const endPoint = "/api/schools/authentication";
  } else if (loginType == "staff") {
    const endPoint = "/api/staff/authentication";
  } else if ((loginType = "/api/employee/authentication")) {
    const endPoint = "/api/student/authentication";
  }

  // Just send back the jwt for verification. This will be in header.
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get(
        "https://easyschool.academy/api/schools/authentication"
      );
      console.log("before dispatch");
      dispatch({
        type: AUTH_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      console.log(JSON.stringify(err));
      const errors = err.response.data.errors; // This are the validation (check) errors performed at express backend
      // Before dispatching setAlert, dispatch removeAlert to remove already displayed errors
      dispatch(removeAlert());

      dispatch({
        type: AUTH_FAIL,
      });
    }
  } else {
    // If no JWT present, then manually entered username and password must be sent to server
    try {
      const body = JSON.stringify({
        schoolId,
        username,
        password,
        loginType,
      });
      const res = await axios.post(
        "https://easyschool.academy/api/schools/authentication",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(removeAlert());

      dispatch({
        type: AUTH_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      const errors = err.response.data.errors; // This are the validation (check) errors performed at express backend
      // Before dispatching setAlert, dispatch removeAlert to remove already displayed errors
      dispatch(removeAlert());
      if (errors) {
        // dispatch an alert action for each msg
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        dispatch({
          type: AUTH_FAIL,
        });
      }
    }
  }
};
