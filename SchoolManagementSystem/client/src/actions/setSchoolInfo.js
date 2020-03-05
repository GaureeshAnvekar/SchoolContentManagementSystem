// This action is used to get necessary school information like template, id etc. Possible only if a school is registered.
import axios from "axios";
import { SCHOOL_FOUND } from "./types";
//Using setAlert action
import { setAlert, removeAlert } from "./alert";

export const setSchoolInfo = ({ payload }) => async dispatch => {
  dispatch({
    type: SCHOOL_FOUND,
    payload: payload
  });
};
