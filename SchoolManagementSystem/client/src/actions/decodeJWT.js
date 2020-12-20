import React from "react";
import axios from "axios";
import { DECODE_JWT_SUCCESS, DECODE_JWT_FAIL, SET_LOGIN_TYPE } from "./types";
import setAuthToken from "../utils/setAuthToken";

// Authenctication
export const decodeJWT = () => async (dispatch) => {
  const endPoint = "http://easyschool.academy/api/decodeJWT";

  // Just send back the jwt for verification. This will be in header.
  if (
    localStorage.getItem("employeetoken") ||
    localStorage.getItem("studenttoken")
  ) {
    localStorage.getItem("studenttoken")
      ? setAuthToken(localStorage.getItem("studenttoken"))
      : setAuthToken(localStorage.getItem("employeetoken"));

    try {
      const res = await axios.get(endPoint);
      dispatch({
        type: DECODE_JWT_SUCCESS,
        payload: res.data,
      });
      //dispatch logintype action
      dispatch({
        type: SET_LOGIN_TYPE,
        payload: { loginType: res.data.loginType },
      });
    } catch (err) {
      //console.log(JSON.stringify(err));
      // const errors = err.response.data.errors; // This are the validation (check) errors performed at express backend
      // Before dispatching setAlert, dispatch removeAlert to remove already displayed errors
      //dispatch(removeAlert());

      dispatch({
        type: DECODE_JWT_FAIL,
        payload: null,
      });
      return false;
    }
  }
};
