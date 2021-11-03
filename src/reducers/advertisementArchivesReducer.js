const advertisementArchivesReducer = (state, action) => {
  switch (action.type) {
    case "GET_ADVERTISEMENT_ARCHIVE":
      return state;
    case "SET_ADVERTISEMENT_ARCHIVE":
      return action.payload;
    default:
      return state;
  }
};

export default advertisementArchivesReducer;
