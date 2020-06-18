import { SET_LOGIN_TYPE } from "./types";

export const setLoginType = (loginType) => async (dispatch) => {
  console.log("setLogintype ");
  dispatch({
    type: SET_LOGIN_TYPE,
    payload: { loginType },
  });
};
