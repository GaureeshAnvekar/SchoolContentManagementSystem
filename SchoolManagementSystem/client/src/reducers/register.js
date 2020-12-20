import { REGISTER_SUCCESS, REGISTER_FAIL } from "../actions/types";

const initialState = {
  isAuthenticated: null,
  loading: true,
  subdomain: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  console.log("inside auth reducer " + payload);
  switch (type) {
    case REGISTER_SUCCESS:
      window.open(
        "https://www." + payload.school.subdomain + ".easyschool.com:3000/school"
      );
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        subdomain: payload.school.subdomain
      };

    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        subdomain: null
      };
    default:
      return state;
  }
}
