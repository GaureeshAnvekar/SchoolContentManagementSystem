import { combineReducers } from "redux";
import alert from "./alert";
import register from "./register";
import setSchoolInfo from "./setSchoolInfo";
import setTemplate from "./setTemplate";

export default combineReducers({ alert, register, setSchoolInfo, setTemplate });
