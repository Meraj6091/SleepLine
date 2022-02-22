export const getData = (data) => {
  return {
    type: 'getAllUserData',
  };
};

export const saveData = (data) => {
  return {
    type: 'saveAllUserData',
    payload: data,
  };
};
