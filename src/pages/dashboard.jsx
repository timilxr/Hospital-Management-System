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
    const {drugs, loaded: drugLoaded}= useContext(DrugsStateContext);
    const {users, loaded: userLoaded} = useContext(UsersStateContext);
    const doctors = users.filter(user=>user.role === 'doctor');
    const patients = users.filter(user=>user.role === 'patient');
    const nurses = users.filter(user=>user.role === 'nurse');
    const accountants = users.filter(user=>user.role === 'accountant');
    const toBeConsulteds = users.filter(user=>user.toBeConsulted === true);
    const notCheckeds = users.filter(user=>user.checked === false);
    console.log(users);
    console.log(drugs);

    const content = [
        {
            subtitle: "Users",
            bg: "primary",
            content: users,
            route: '/users'
        },
        {
            subtitle: "Doctors",
            bg: "primary",
            content: doctors,
            route: '/users'
        },
        {
            subtitle: "Patients",
            bg: "primary",
            content: patients,
            route: '/users'
        },
        {
            subtitle: "To be Consulted",
            bg: "primary",
            content: toBeConsulteds,
            route: '/users'
        },
        {
            subtitle: "Nurses",
            bg: "primary",
            content: nurses,
            route: '/users'
        },
        {
            subtitle: "Accountants",
            bg: "primary",
            content: accountants,
            route: '/users'
        },
        {
            subtitle: "priscriptions",
            bg: "success",
            content: drugs,
            route: '/priscriptions'
        },
    ];

    useEffect(()=>{
        getDrugs(drugsDispatch);
        getUsers(usersDispatch);
    }, [drugsDispatch, usersDispatch, props.user])

    if (!userLoaded || !drugLoaded){
        return <Loading />
    }

    return(
        <div className='container-fluid'>
                        <Row className="mt-3 mt-md-5">
                            {content.map(item=>{
                                if (props.user.role === 'patient' && item.subtitle !== 'priscriptions'){
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