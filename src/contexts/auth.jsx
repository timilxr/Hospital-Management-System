import React, { createContext, useEffect, useReducer } from "react";
import useLocalStorage from "../action/useLocalStorage";
import axios from "axios";
import _get from 'lodash.get';

const initialState = {
  loading: false,
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
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        loaded: true,
        isLoggedIn: true,
        user: payload.user
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        loading: false,
        loaded: true,
        isLoggedIn: false,
        user: null
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


export const signIn = (dispatch, userData) => {
  localStorage.setItem("user", JSON.stringify(userData));
  return dispatch({
    type: "LOGIN_SUCCESS",
    payload: {
      user: userData
    }
  });
};

export const signOut = (dispatch) => {
  localStorage.clear();
  return dispatch({
    type: "LOGOUT_SUCCESS"
  });
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
  const [info, setInfo] = useLocalStorage("user", null);
  let output;
  try {
    output = axios.post('/users/verify', info);
  } catch (error) {
    output = false;
    console.log(error);
  }
  const newUserState = {
    ...initialState,
    user: info,
    isLoggedIn: output.info
  }
  const [state, dispatch] = useReducer(reducers, newUserState);
  useEffect(()=>{
    setInfo(state.user);
  }, [state.isLoggedIn])

  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={state}>
        {children}
      </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  );
};
export default AuthProvider;
