import React, { createContext, useReducer } from "react";
import axios from "axios";

const initialState = {
  loading: false,
  loaded: false,
  doctor: null,
  
};

export const UsersDispatchContext = createContext();
export const UsersStateContext = createContext();

const reducers = ({ type, payload }) => {
  switch (type) {
    case "REQUEST_USERS":
      return {
        ...initialState,
        loading: true,
      };
    case "GET_USERS_SUCCESSFUL":
      return {
        ...initialState,
        loading: false,
        loaded: true,
        users: payload.users,
      };
    case "ADD_USER_SUCCESSFUL":
      return {
        ...initialState,
        loading: false,
        loaded: true,
        user: payload.user,
      };
    case "UPDATE_USER_SUCCESSFUL":
      return {
        ...initialState,
        loading: false,
        loaded: true,
        user: payload.user,
      };
    case "REMOVE_USER_SUCCESSFUL":
      return {
        ...initialState,
        loading: false,
        loaded: true,
        users: payload.users,
      };
    case "USERS_FAILURE":
      return {
        ...initialState,
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
    await axios.get("api")
    .then(res=>{
        dispatch({
            type: "GET_USERS_SUCCESSFUL",
            payload: {
                users: res.data.users
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
    await axios.post("api", user)
    .then(res=>{
        dispatch({
            type: "ADD_USER_SUCCESSFUL",
            payload: {
                user: res.data.user
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
export const updateUser = async (dispatch, user) => {
    dispatch({
        type: "REQUEST_USERS"
    });
    await axios.post("api", user)
    .then(res=>{
        dispatch({
            type: "UPDATE_USER_SUCCESSFUL",
            payload: {
                user: res.data.user
            }
        })
    })
    .catch(err=>{
        dispatch({
            type: "USERS_FAILURE"
        });
        console.log(`Error updating user: err`)
    })
};
export const removeUser = async (dispatch, user) => {
    dispatch({
        type: "REQUEST_USERS"
    });
    await axios.post("api", user)
    .then(res=>{
        dispatch({
            type: "REMOVE_USER_SUCCESSFUL",
            payload: {
                user: res.data.user
            }
        })
    })
    .catch(err=>{
        dispatch({
            type: "USERS_FAILURE"
        });
        console.log(`Error removing user: err`)
    })
};

const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, initialState);

  return (
    <UsersDispatchContext.Provider value={dispatch}>
      <UsersStateContext.Provider value={state}>
        {children}
      </UsersStateContext.Provider>
    </UsersDispatchContext.Provider>
  );
};
export default UsersProvider;
