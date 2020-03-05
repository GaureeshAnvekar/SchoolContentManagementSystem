import { TEMPLATE1, TEMPLATE2 } from "./types";
import { template1Data, template2Data } from "../templates/types";

export const setTemplate = ({ template }) => dispatch => {
  console.log("inside settemplate action " + template);
  if (template == 1) {
    dispatch({
      type: TEMPLATE1,
      payload: template1Data
    });
  } else if (template == 2) {
    dispatch({
      type: TEMPLATE2,
      payload: template2Data
    });
  }
};
