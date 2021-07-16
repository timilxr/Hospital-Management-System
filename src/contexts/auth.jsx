import React, { createContext, useReducer } from "react";
// import axios from "axios";

const initialState = {
  loading: false,
  loaded: false,
  isLoggedIn: false,
};

export const AuthDispatchContext = createContext();
export const AuthStateContext = createContext();

const reducers = ({ type, payload }) => {
  switch (type) {
    case "REQUEST_AUTH":
      return {
        ...initialState,
        loading: true,
      };
    case "AUTH_SUCCESSFUL":
      return {
        ...initialState,
        loading: false,
        loaded: true,
        isLoggedIn: true,
      };
    case "AUTH_FAILURE":
      return {
        ...initialState,
        loading: false,
        loaded: true,
        isLoggedIn: false,
      };
    default:
      throw new Error(`Unknown action type: ${type}`);
  }
};

export const authenticateUser = async (dispatch) => {
  // await axios.post()
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, initialState);

  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={state}>
        {children}
      </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  );
};
export default AuthProvider;
