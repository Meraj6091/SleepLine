const reducer = (state = null, action) => {
  switch (action.type) {
    case 'saveAllUserData':
      return state + action.payload;
    case 'getAllUserData':
      return state;
    default:
      return state;
  }
};
export default reducer;
