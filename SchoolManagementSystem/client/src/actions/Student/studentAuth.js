import axios from "axios";
import {
  STUDENT_AUTH_SUCCESS,
  STUDENT_AUTH_FAIL,
  SET_LOGIN_TYPE,
} from "../types";
//Using setAlert action
import { setAlert, removeAlert } from "../alert";
import setAuthToken from "../../utils/setAuthToken";
import { setLoginType } from "../../actions/setLoginType";

// Authenctication
export const studentAuth = (
  schoolId = null,
  username = null,
  password = null,
  loginType = null
) => async (dispatch) => {
  //const endPoint = "https://easyschool.academy/api/students/authentication";
  const endPoint = "http://joseph.easyschool.com:5000/api/students/authentication";
  // Just send back the jwt for verification. This will be in header.
  if (/*localStorage.getItem("studenttoken")*/ false) {
    setAuthToken(localStorage.studenttoken);

    try {
      console.log("Calling student auth api");
      const res = await axios.get(endPoint);
      console.log("before dispatch");
      dispatch({
        type: STUDENT_AUTH_SUCCESS,
        payload: res.data,
      });

      //dispatch logintype action
      setLoginType(res.data.loginType);
    } catch (err) {
      console.log(JSON.stringify(err));
      // const errors = err.response.data.errors; // This are the validation (check) errors performed at express backend
      // Before dispatching setAlert, dispatch removeAlert to remove already displayed errors
      dispatch(removeAlert());

      dispatch({
        type: STUDENT_AUTH_FAIL,
      });
    }
  } else {
    console.log("NO jwt inside");
    // If no JWT present, then manually entered username and password must be sent to server
    try {
      const body = JSON.stringify({
        schoolId,
        username,
        password,
        loginType,
      });
      const res = await axios.post(endPoint, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch(removeAlert());

      dispatch({
        type: STUDENT_AUTH_SUCCESS,
        payload: res.data,
      });

      //dispatch logintype action
      dispatch({
        type: SET_LOGIN_TYPE,
        payload: { loginType: loginType },
      });
    } catch (err) {
      const errors = err.response.data.errors; // This are the validation (check) errors performed at express backend
      // Before dispatching setAlert, dispatch removeAlert to remove already displayed errors
      dispatch(removeAlert());
      if (errors) {
        // dispatch an alert action for each msg
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        dispatch({
          type: STUDENT_AUTH_FAIL,
        });
      }
    }
  }
};
