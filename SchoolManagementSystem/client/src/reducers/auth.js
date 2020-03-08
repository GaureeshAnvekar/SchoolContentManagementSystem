import { AUTH_SUCCESS, AUTH_FAIL } from "../actions/types";

const initialState = {
  token: null,
  isAuthenticated: null,
  loading: true,
  username: null,
  loginType: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  console.log("Auth payload is " + JSON.stringify(payload));
  switch (type) {
    case AUTH_SUCCESS:
      localStorage.setItem("token", payload.school.token);
      return {
        ...state,
        ...payload.school,
        token: localStorage.token || payload.school.token,
        isAuthenticated: true,
        loading: false,
        username: payload.school.username,
        loginType: payload.school.loginType
      };

    case AUTH_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        username: null,
        loginType: null
      };
    default:
      return state;
  }
}
