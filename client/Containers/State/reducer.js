let initialState = {};
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'saveUserInitialData':
      return (state = action.payload);
    case 'saveAllUserData':
      return (state = action.payload);
    default:
      return state;
  }
};
let initialState2 = {};
export const signUpReducer = (state = initialState2, action) => {
  switch (action.type) {
    case 'saveSignUpId':
      return (state = action.payload);
    default:
      return state;
  }
};
