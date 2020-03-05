const initialState = {
  backgroundColor: null,
  backgroundImage: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  if (payload !== undefined) {
    return {
      ...state,
      backgroundColor: payload.backgroundColor,
      backgroundImage: payload.backgroundImage
    };
  } else {
    return state;
  }
}
