const residentsReducer = (state, action) => {
  switch (action.type) {
    case "GET_RESIDENTS":
      return state;
    case "SET_RESIDENTS":
      return action.payload;
    default:
      return state;
  }
};

export default residentsReducer;
