const principalReducer = (state, action) => {
  switch (action.type) {
    case "GET_PRINCIPAL":
      return state;
    case "SET_PRINCIPAL":
      return action.payload;
    default:
      return state;
  }
};

export default principalReducer;
