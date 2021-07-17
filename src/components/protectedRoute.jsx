import React, {useEffect, useContext} from 'react';
import { AuthStateContext, authenticateUser, AuthDispatchContext } from '../contexts/auth';
import {Route, Redirect} from 'react-router-dom';
import Loading from './loading';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const {isLoggedIn, loaded} = useContext(AuthStateContext);
    const dispatch = useContext(AuthDispatchContext);
     useEffect(()=>{
         authenticateUser(dispatch);
     }, [dispatch])

    console.log(isLoggedIn);

    if(loaded){
        return <Route {...rest} render={props => isLoggedIn ? <Component {...props} /> : <Redirect to='/' />}/>
    }
    return <Loading />;
    // return "Hello world";
}

export default ProtectedRoute;