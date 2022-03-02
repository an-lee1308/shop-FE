const initialState = null;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER":
    // do sothing
    case "LOGOUT_USER": {
      // do something
    }
    default:
      return state;
  }
};
export default reducer;
