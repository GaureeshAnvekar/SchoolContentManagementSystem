import { SET_LOGIN_TYPE } from "../actions/types";

const initialState = {
  loginType: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log("ACTION ");
  console.log(JSON.stringify(action));
  switch (type) {
    case SET_LOGIN_TYPE:
      return {
        ...state,
        loginType: payload.loginType,
      };
    default:
      return state;
  }
}
