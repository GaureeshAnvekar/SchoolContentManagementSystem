import { LIBRARY_AUTH_SUCCESS, LIBRARY_AUTH_FAIL } from "../../actions/types";

const initialState = {
  token: null,
  isAuthenticated: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LIBRARY_AUTH_SUCCESS:
      localStorage.setItem("token", payload.jwt);
      return {
        ...state,
        token: localStorage.token || payload.jwt,
        isAuthenticated: true,
      };

    case LIBRARY_AUTH_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
