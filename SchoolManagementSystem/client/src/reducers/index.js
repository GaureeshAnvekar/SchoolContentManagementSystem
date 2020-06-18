import { combineReducers } from "redux";
import alert from "./alert";
import register from "./register";
import setSchoolInfo from "./setSchoolInfo";
import setTemplate from "./setTemplate";
import setLoginType from "./setLoginType";
import studentAuth from "./Student/studentAuth";
import decodeJWT from "./decodeJWT";

export default combineReducers({
  alert,
  register,
  setSchoolInfo,
  setTemplate,
  studentAuth,
  setLoginType,
  decodeJWT,
});
