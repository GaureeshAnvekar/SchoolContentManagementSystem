// This action is used to get necessary school information like template, id etc. Possible only if a school is registered.
import axios from "axios";
import { SCHOOL_FOUND } from "./types";
//Using setAlert action
import { setAlert, removeAlert } from "./alert";

export const getSchoolInfo = ({ subDomain }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  console.log("From action " + subDomain);
  const body = JSON.stringify({
    subDomain
  });

  try {
    //Before creating action object and dispatching, make an http request.
    const res = await axios.post(
      "http://localhost:5000/api/schools/schoolInfo",
      body,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    dispatch({
      type: SCHOOL_FOUND,
      payload: res.data.schoolInfo
    });
  } catch (err) {
    console.log("here" + err.response.data.errors);

    const errors = err.response.data.errors; // This are the validation (check) errors performed at express backend

    //Not sure
  }
};
