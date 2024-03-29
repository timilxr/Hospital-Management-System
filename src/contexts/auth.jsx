import React, { createContext, useState, useEffect, useReducer } from "react";
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
      return {
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
        isLoggedIn: payload.isLoggedIn,
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


export const signIn = async (dispatch, userData) => {
  // const data = JSON.parse(userData);
  let output;
  try {
    await axios.post('http://localhost:5000/users/verify', userData)
      .then(res => {
        console.log(res);
        output = res;
        if (output.data.info === true) {
          console.log(output);
          try {
            localStorage.setItem("Users3", JSON.stringify(output.data.user));
            console.log('hi');
          } catch (error) {
            console.log(error);
            return dispatch({
              type: "AUTH_FAILURE"
            });
          }
          return dispatch({
            type: "LOGIN_SUCCESS",
            payload: {
              isLoggedIn: output.data.info,
              user: output.data.user
            }
          });
        }
        return dispatch({
          type: "AUTH_FAILURE"
        });
      }).catch(err => {
        console.log('me', err);
        return dispatch({
          type: "AUTH_FAILURE"
        });
      });
    // console.log(timi);
  } catch (error) {
    console.log(error);
    return dispatch({
      type: "AUTH_FAILURE"
    });
  }
};

export const refresh = (dispatch) => {
  let info = localStorage.getItem("Users3");
  if (info) {
    info = JSON.parse(info);
    console.log(info);
    let output;
    try {
      axios.post('https://hospitalms-backend.herokuapp.com/users/verify', info).then(res => {
        output = res.data;
        console.log(output);
        let newState = {
          ...initialState,
          user: output.info ? output.user : null,
          isLoggedIn: output.info,
          loaded: true
        };
        return dispatch({type: 'LOGIN_SUCCESS',payload: {...newState}});
        // setNewUserState(newState);
      }).catch(err => {
        console.log(err);
        return dispatch({type: 'AUTH_FAILURE'});
      })
    } catch (error) {
      output = false;
      console.log(error);
        return dispatch({type: 'AUTH_FAILURE'});
    }
  }else {
    return dispatch({type: 'AUTH_FAILURE'});
  }
}

export const signOut = (dispatch) => {
  localStorage.clear();
  return dispatch({
    type: "LOGOUT_SUCCESS"
  });
};


const AuthProvider = ({ children }) => {
  // const [newUserState, setNewUserState] = useState(initialState);
  const [state, dispatch] = useReducer(reducers, initialState);
  let info = localStorage.getItem("Users3");
  console.log(info);

  useEffect(() => {
    let output, newState;
    if (info) {
      info = JSON.parse(info);
      console.log(info);
      try {
        axios.post('https://hospitalms-backend.herokuapp.com/users/verify', info).then(res => {
          output = res.data;
          console.log(res);
          newState = {
            ...initialState,
            user: output.info ? output.user : null,
            isLoggedIn: output.info,
            loaded: true
          };
          dispatch({type: 'LOGIN_SUCCESS',payload: {...newState}});
          // setNewUserState(newState);
        }).catch(err => {
          dispatch({type: 'AUTH_FAILURE'});
          console.log(err);
        })
      } catch (error) {
        output = false;
          dispatch({type: 'AUTH_FAILURE'});
          console.log(error);
      }
    }
    else {
      dispatch({type: 'AUTH_FAILURE'});
    }

  }, [])
  // console.log(state);
  // useEffect(()=>{
  //   window.localStorage.setItem("Users3",state.user);
  // }, [state.isLoggedIn])

  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={state}>
        {children}
      </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  );
};
export default AuthProvider;
