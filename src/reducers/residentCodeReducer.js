const residentCodeReducer = (state, action) => {
  switch (action.type) {
    case "GET_RESIDENT_CODE":
      return state;
    case "SET_RESIDENT_CODE":
      return action.payload;
    default:
      return state;
  }
};

export default residentCodeReducer;
