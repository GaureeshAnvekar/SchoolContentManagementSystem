import { SCHOOL_FOUND } from "../actions/types";

const initialState = {
  id: null,
  subDomain: null,
  template: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SCHOOL_FOUND:
      return {
        ...state,
        id: payload.id,
        subDomain: payload.subDomain,
        template: payload.template,
      };
    default:
      return state;
  }
}
