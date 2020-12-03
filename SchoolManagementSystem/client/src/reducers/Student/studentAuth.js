import { STUDENT_AUTH_SUCCESS, STUDENT_AUTH_FAIL } from "../../actions/types";

const initialState = {
  token: null,
  isAuthenticated: null,
  userName: null,
  firstName: null,
  lastName: null,
  rollNo: null,
  classGrade: null,
  section: null,
  dob: null,
  bloodGroup: null,
  email: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case STUDENT_AUTH_SUCCESS:
      localStorage.setItem("studenttoken", payload.jwt);
      return {
        ...state,
        token: localStorage.token || payload.jwt,
        isAuthenticated: true,
        userName: payload.username,
        firstName: payload.firstName,
        lastName: payload.lastName,
        rollNo: payload.rollNo,
        classGrade: payload.classGrade,
        section: payload.section,
        dob: payload.dob,
        bloodGroup: payload.bloodGroup,
        email: payload.email,
      };

    case STUDENT_AUTH_FAIL:
      localStorage.removeItem("studenttoken");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        userName: null,
        firstName: null,
        lastName: null,
        rollNo: null,
        classGrade: null,
        section: null,
        dob: null,
        bloodGroup: null,
        email: null,
      };
    default:
      return state;
  }
}
