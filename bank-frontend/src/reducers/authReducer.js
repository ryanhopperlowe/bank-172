const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      
      if (!state.currentUser && !state.isLoggedIn) {
        return {
          ...state,
          currentUser: action.user,
          isLoggedIn: true,
          error: ""
        };
      } else {
        return {
          ...state,
          error: "Must logout first!"
        };
      }

    
    case 'LOGOUT': 
      if (!state.currentUser || !state.isLoggedIn) {
        return {
          ...state,
          error: "Must be logged in to logout"
        };
      } else if (state.currentUser.id !== action.user.id) {
        return {
          ...state,
          error: `User ${action.user.id} is not loggeed in`
        };
      } else if (state.currentUser.id === action.user.id) {
        return {
          ...state,
          currentUser: null,
          isLoggedIn: false,
          error: ""
        };
      } else {
        return {
          ...state,
          error: "unknown error occurred"
        };
      }
      

    default: 
      return {
        ...state
      };
  }
};

export default authReducer;

export const authLogin = (user) => ({
  type: 'LOGIN',
  user
});

export const authLogout = (user) => ({
  type: 'LOGOUT',
  user
});

