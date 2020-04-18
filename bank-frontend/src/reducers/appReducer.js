const appReducer = (state, action) => {
  switch (action.type) {

    case 'INIT':
      return {
        ...state,
        isReady: action.isReady
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.error
      };

    default:
      return state;
  }
};

export default appReducer;

export const appInit = (isReady) => ({
  type: 'INIT',
  isReady
});

export const appSetError = (error = "") => ({
  type: 'SET_ERROR',
  error
});