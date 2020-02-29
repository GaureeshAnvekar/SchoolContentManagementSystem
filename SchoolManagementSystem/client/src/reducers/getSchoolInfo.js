import { SCHOOL_FOUND } from "../actions/types";

const initialState = {
  id: null,
  template: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SCHOOL_FOUND:
      return {
        ...state,
        id: payload.id,
        template: payload.template
      };
    default:
      return state;
  }
}
