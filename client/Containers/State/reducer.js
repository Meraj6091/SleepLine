let initialState = {};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'saveUserInitialData':
      return (state = action.payload);
    case 'saveAllUserData':
      return (state = action.payload);
    default:
      return state;
  }
};
export default reducer;
