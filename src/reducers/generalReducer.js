const generalReducer = (state, action) => {
  switch (action.type) {
    case "GET":
      return state;
    case "SET":
      return action.payload;
    default:
      return state;
  }
};

export default generalReducer;
