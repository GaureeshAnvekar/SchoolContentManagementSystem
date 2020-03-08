import { TEMPLATE1, TEMPLATE2 } from "../actions/types";

const initialState = {
  backgroundColor: null,
  backgroundImage: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case TEMPLATE1:
    case TEMPLATE2:
      if (payload !== undefined) {
        return {
          ...state,
          backgroundColor: payload.backgroundColor,
          backgroundImage: payload.backgroundImage
        };
      } else {
        return state;
      }
    default:
      return state;
  }
}
