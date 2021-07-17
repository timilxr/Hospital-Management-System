import React, {useContext, useEffect} from 'react';
import { Row, Col, Button, Jumbotron as div } from 'react-bootstrap';
import DashCard from '../components/dashCard';
import DashNav from '../components/dashboardNav';
import Loading from '../components/loading';
import { AuthDispatchContext, AuthStateContext, requestConsult } from '../contexts/auth';
import { DrugsDispatchContext, DrugsStateContext, getDrugs } from '../contexts/drugs';
import { UsersDispatchContext, UsersStateContext, getUsers } from '../contexts/users';

const Dashboard = (props) => {
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
            subtitle: "priscriptions",
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
        requestConsult(authDispatch, newuser);
    }

    useEffect(()=>{
        getDrugs(drugsDispatch);
        getUsers(usersDispatch);
    }, [drugsDispatch, usersDispatch, authState])

    if (usersState.loading || drugsState.loading){
        return <Loading />
    }

    return(
        <div className='container-fluid'>
            <Row>
                <Col xs={5} md={3} variant='dark' className='bg-dark px-0'>
                    <DashNav user={props.user}/>
                </Col>
                <Col className="bg-light bg-gradient ml-0">
                    <div className='p-2 pt-3 pt-md-5'>
                    <h3 className='mb-3'>Welcome {props.user.name}</h3>
                        {!authState.user.toBeConsulted ?
                         <Button variant="info" onClick={request}>Request Consultation</Button>
                        :
                        <h4 className="h4">Awaiting Consultation</h4> }
                        <Row className="mt-3 mt-md-5">
                            {content.map(item=>{
                                if (authState.user.role === 'patient' && item.subtitle != 'priscriptions'){
                                    return <></>;
                                } 
                                // else if (props.user.role === 'patient' && item.subtitle != 'Prescription')
                                    return(
                                    <Col xs={12} sm={3} md={4} className='shadow' key={item.subtitle}>
                                        <DashCard message={item} />
                                    </Col>
                                )
                            })}
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Dashboard;