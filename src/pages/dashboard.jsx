import React, {useContext, useEffect} from 'react';
import { Row, Col } from 'react-bootstrap';
import DashCard from '../components/dashCard';
// import DashNav from '../components/dashboardNav';
import Loading from '../components/loading';
import { AuthDispatchContext, AuthStateContext, requestConsult } from '../contexts/auth';
import { DrugsDispatchContext, DrugsStateContext, getDrugs } from '../contexts/drugs';
import { UsersDispatchContext, UsersStateContext, getUsers } from '../contexts/users';

const Dashboard = (props) => {
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

    useEffect(()=>{
        getDrugs(drugsDispatch);
        getUsers(usersDispatch);
    }, [drugsDispatch, usersDispatch, props.user])

    if (usersState.loading || drugsState.loading){
        return <Loading />
    }

    return(
        <div className='container-fluid'>
                        <Row className="mt-3 mt-md-5">
                            {content.map(item=>{
                                if (authState.user.role === 'patient' && item.subtitle !== 'priscriptions'){
                                    return <></>;
                                } 
                                // else if (props.user.role === 'patient' && item.subtitle != 'Prescription')
                                    return(
                                    <Col xs={12} sm={3} md={4} className='p-0' key={item.subtitle}>
                                        <DashCard message={item} />
                                    </Col>
                                )
                            })}
                        </Row>
        </div>
    )
}

export default Dashboard;