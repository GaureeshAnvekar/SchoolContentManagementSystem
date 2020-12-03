import { EMPLOYEE_AUTH_SUCCESS, EMPLOYEE_AUTH_FAIL } from "../../actions/types";

const initialState = {
  token: null,
  isAuthenticated: null,
  userName: null,
  firstName: null,
  lastName: null,
  gender: null,
  dob: null,
  email: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case EMPLOYEE_AUTH_SUCCESS:
      localStorage.setItem("employeetoken", payload.jwt);
      return {
        ...state,
        token: localStorage.token || payload.jwt,
        isAuthenticated: true,
        userName: payload.username,
        firstName: payload.firstName,
        lastName: payload.lastName,
        gender: payload.gender,
        dob: payload.dob,
        email: payload.email,
      };

    case EMPLOYEE_AUTH_FAIL:
      localStorage.removeItem("employeetoken");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        userName: null,
        firstName: null,
        lastName: null,
        gender: null,
        dob: null,
        email: null,
      };
    default:
      return state;
  }
}
