import React, {useContext, useEffect} from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import DashCard from '../components/dashCard';
import Loading from '../components/loading';
import { AuthDispatchContext, AuthStateContext, authenticateUser } from '../contexts/auth';
import { DrugsDispatchContext, DrugsStateContext, getDrugs } from '../contexts/drugs';
import { UsersDispatchContext, UsersStateContext, getUsers, requestConsult } from '../contexts/users';

const Dashboard = () => {
    const authDispatch = useContext(AuthDispatchContext);
    const drugsDispatch = useContext(DrugsDispatchContext);
    const usersDispatch = useContext(UsersDispatchContext);
    const authState = useContext(AuthStateContext);
    const drugsState= useContext(DrugsStateContext);
    const usersState= useContext(UsersStateContext);

    const content = [
        {
            subtitle: "Users",
            bg: "primary",
            content: usersState.users,
            route: '/dashboard/users'
        },
        {
            subtitle: "Priscriptions",
            bg: "success",
            content: drugsState.drugs,
            route: '/dashboard/priscriptions'
        },
    ];

    const request = () => {
        let newuser = {
            ...usersState.users,
            toBeConsulted: true
        }
        requestConsult(usersDispatch, newuser);
    }

    useEffect(()=>{
        authenticateUser(authDispatch);
        getDrugs(drugsDispatch);
        getUsers(usersDispatch);
    }, [authDispatch, drugsDispatch, usersDispatch])

    if (authState.loading || usersState.loading || drugsState.loading){
        return <Loading />
    }

    return(
        <div>
            <h1>Dashboard</h1>
            <h3>Welcome {authState.user.name}</h3>
            {authState.user.toBeConsulted && <Button variant="info" onClick={request}>Request Consultation</Button>}
            <Row>
                {content.map(item=>{
                    return(
                        <Col key={item.subtitle}>
                            <DashCard message={item} />
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}

export default Dashboard;