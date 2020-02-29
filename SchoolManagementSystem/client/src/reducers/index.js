import { combineReducers } from "redux";
import alert from "./alert";
import register from "./auth";
import getSchoolInfo from "./getSchoolInfo";

export default combineReducers({ alert, register, getSchoolInfo });
