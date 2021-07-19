import React, {useEffect, useContext} from 'react';
import { AuthStateContext, AuthDispatchContext } from '../contexts/auth';
import {Route, Redirect} from 'react-router-dom';
import Loading from './loading';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const {isLoggedIn, loading, user} = useContext(AuthStateContext);
    const dispatch = useContext(AuthDispatchContext);
    //  useEffect(()=>{
    //      authenticateUser(dispatch);
    //  }, [dispatch])

    // console.log(isLoggedIn);

    if(loading){
        return <Loading />;
    }
    return <Route {...rest} render={props => isLoggedIn ? <Component {...props} user={user} /> : <Redirect to='/' />}/>
    // return "Hello world";
}

export default ProtectedRoute;