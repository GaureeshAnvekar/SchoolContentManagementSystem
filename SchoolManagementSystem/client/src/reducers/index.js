import { combineReducers } from "redux";
import alert from "./alert";
import register from "./register";
import setSchoolInfo from "./setSchoolInfo";
import setTemplate from "./setTemplate";
import auth from "./auth";

export default combineReducers({
  alert,
  register,
  setSchoolInfo,
  setTemplate,
  auth
});
