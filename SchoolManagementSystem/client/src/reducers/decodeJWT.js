import { DECODE_JWT_SUCCESS, DECODE_JWT_FAIL } from "../actions/types";
//import { setLoginType } from "../actions/setLoginType";

const initialState = {
  decode: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case DECODE_JWT_SUCCESS:
      return state;
    case DECODE_JWT_FAIL:
      localStorage.removeItem("token");
      return state;
    default:
      return state;
  }
}
