import React, { createContext, useReducer } from "react";
// import axios from "axios";

const initialState = {
  loading: true,
  loaded: false,
  isLoggedIn: false,
  user: null
};

export const AuthDispatchContext = createContext();
export const AuthStateContext = createContext();

const reducers = (state, { type, payload }) => {
  switch (type) {
    case "REQUEST_AUTH":
      return {
        ...state,
        loading: true,
      };
    case 'TOGGLE_CONSULT':
      return{
        ...state,
        loading: false,
        loaded: true,
        isLoggedIn: true,
        user: payload.user
      }
    case "AUTH_SUCCESSFUL":
      return {
        ...state,
        loading: false,
        loaded: true,
        isLoggedIn: true,
        user: payload.user
      };
    case "AUTH_FAILURE":
      return {
        ...state,
        loading: false,
        loaded: true,
        isLoggedIn: false,
        user: null
      };
    default:
      throw new Error(`Unknown action type: ${type}`);
  }
};

const userData = {
  name: 'timi',
  email: 'timi@g.com',
  phone: '0812334444',
  password: 'timi',
  isAdmin: true,
  role: 'patient',
  toBeConsulted: false
}

export const authenticateUser = (dispatch) => {
  // await axios.post()
  // dispatch({
  //   type: "REQUEST_AUTH"
  // });
  dispatch({
    type: "AUTH_SUCCESSFUL",
    payload: {
      user: userData
    }
  });

  // dispatch({
  //   type: "AUTH_FAILURE",
  // });
};

export const requestConsult = async (dispatch, user) => {
  // dispatch({
  //     type: "REQUEST_USERS"
  // });
      dispatch({
          type: "TOGGLE_CONSULT",
          payload: {
              user: user
          }
      });
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
