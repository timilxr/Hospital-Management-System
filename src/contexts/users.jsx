import React, { createContext, useReducer, useEffect, useState } from "react";
// import axios from "axios";
// import useLocalStorage from "../action/useLocalStorage";
import axios from "axios";
import { set } from "lodash";

const initialState = {
  loading: false,
  loaded: false,
  users: null,
  user: null
};

export const UsersDispatchContext = createContext();
export const UsersStateContext = createContext();

const reducers = (state, { type, payload }) => {
  switch (type) {
    case "REQUEST_USERS":
      return {
        ...state,
        loading: true,
      };
    case "GET_USERS_SUCCESSFUL":
      return {
        ...state,
        loading: false,
        loaded: true,
        users: payload.users,
      };
    case "GET_USER_SUCCESSFUL":
      return {
        ...state,
        loading: false,
        loaded: true,
        user: payload.user,
      };
    case "ADD_USER_SUCCESSFUL":
      return {
        ...state,
        loading: false,
        loaded: true,
        user: payload.user,
      };
    case "UPDATE_USER_SUCCESSFUL":
      return {
        ...state,
        loading: false,
        loaded: true,
        user: payload.user,
        // users: payload.users
      };
    case "TOGGLE_CONSULT":
      return {
        ...state,
        loading: false,
        loaded: true,
        user: payload.user,
        // users: payload.users
      };
    case "REMOVE_USER_SUCCESSFUL":
      return {
        ...state,
        loading: false,
        loaded: true,
        users: payload.users,
      };
    case "REQUEST_FAILURE":
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case "USERS_FAILURE":
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      throw new Error(`Unknown action type: ${type}`);
  }
};

export const getUsers = async (dispatch) => {
  
    dispatch({
        type: "REQUEST_USERS"
    });
    await axios.get("https://hospitalms-backend.herokuapp.com/users")
    .then(res=>{
        dispatch({
            type: "GET_USERS_SUCCESSFUL",
            payload: {
                users: res.data
            }
        })
    })
    .catch(err=>{
        dispatch({
            type: "USERS_FAILURE"
        });
        console.log(`Error getting users: err`)
    })
};
export const getUser = async (dispatch, userId) => {
    dispatch({
        type: "REQUEST_USERS"
    });
    await axios.get(`https://hospitalms-backend.herokuapp.com/users/${userId}`)
    .then(res=>{
        dispatch({
            type: "GET_USER_SUCCESSFUL",
            payload: {
                user: res.data
            }
        })
    })
    .catch(err=>{
        dispatch({
            type: "USERS_FAILURE"
        });
        console.log(`Error getting users: err`)
    })
};

export const addUser = async (dispatch, user) => {
    dispatch({
        type: "REQUEST_USERS"
    });
    await axios.post(`https://hospitalms-backend.herokuapp.com/users`, user)
    .then(res=>{
        dispatch({
            type: "ADD_USER_SUCCESSFUL",
            payload: {
                user: res.data
            }
        })
    })
    .catch(err=>{
        dispatch({
            type: "USERS_FAILURE"
        });
        console.log(`Error adding users: err`)
    })
};
export const updateUser = async (dispatch, userId, user) => {
    dispatch({
        type: "REQUEST_USERS"
    });
    await axios.put(`https://hospitalms-backend.herokuapp.com/users/${userId}`, user)
    .then(res=>{
        dispatch({
            type: "UPDATE_USER_SUCCESSFUL",
            payload: {
                user: res.data
            }
        })
    })
    .catch(err=>{
        dispatch({
            type: "REQUEST_FAILURE"
        });
        console.log(`Error updating user: err`)
    })
};
export const toggleConsult = async (dispatch, userId, user) => {
    dispatch({
        type: "REQUEST_USERS"
    });
        await axios.put(`https://hospitalms-backend.herokuapp.com/users/${userId}`, user)
    .then(res=>{
        dispatch({
            type: "UPDATE_USER_SUCCESSFUL",
            payload: {
                user: res.data
            }
        })
    })
    .catch(err=>{
        dispatch({
            type: "USERS_FAILURE"
        });
        console.log(`Error consulting user: ${err}`)
    })
};
export const removeUser = async (dispatch, userId) => {
    dispatch({
        type: "REQUEST_USERS"
    });
    await axios.delete(`https://hospitalms-backend.herokuapp.com/users/${userId}`)
    .then(res=>{
        dispatch({
            type: "REMOVE_USER_SUCCESSFUL",
            payload: {
                users: res.data
            }
        })
    })
    .catch(err=>{
        dispatch({
            type: "REQUEST_FAILURE"
        });
        console.log(`Error removing user: err`)
    })
};

const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState(initialState);
  
  useEffect(()=>{
    axios.get("https://hospitalms-backend.herokuapp.com/users")
    .then(res=>{
      setUsers({
        loading: false,
        loaded: false,
        users: res.data,
        user: null
      });
    })
    .catch(err=>{
      setUsers({
        loading: false,
        loaded: false,
        users: null,
        user: null
      });
      console.log(`Error getting users: ${err}`)
    })
  }, [])
  
  const [state, dispatch] = useReducer(reducers, users);
  return (
    <UsersDispatchContext.Provider value={dispatch}>
      <UsersStateContext.Provider value={state}>
        {children}
      </UsersStateContext.Provider>
    </UsersDispatchContext.Provider>
  );
};
export default UsersProvider;
