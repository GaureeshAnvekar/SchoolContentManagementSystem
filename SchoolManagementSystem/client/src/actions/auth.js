import axios from "axios";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";
//Using setAlert action
import { setAlert, removeAlert } from "./alert";

// Register school
export const register = ({
  schoolName,
  adminName,
  adminPassword1,
  adminPassword2,
  address,
  contact,
  template
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({
    schoolName,
    adminName,
    adminPassword1,
    adminPassword2,
    address,
    contact,
    template
  });

  try {
    //Before creating action object and dispatching, make an http request
    console.log(adminName + " look here");
    const res = await axios.post(
      "http://localhost:5000/api/schools/registration",
      body,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    console.log("here" + err.response.data.errors);

    const errors = err.response.data.errors; // This are the validation (check) errors performed at express backend
    // Before dispatching setAlert, dispatch removeAlert to remove already displayed errors
    dispatch(removeAlert());
    if (errors) {
      // dispatch an alert action for each msg
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};
