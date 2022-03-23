export const saveData = (data) => {
  return {
    type: 'saveAllUserData',
    payload: data,
  };
};

export const saveUserInitialDetails = (data) => {
  return {
    type: 'saveUserInitialData',
    payload: data,
  };
};

export const saveSignUpId = (data) => {
  return {
    type: 'saveSignUpId',
    payload: data,
  };
};
