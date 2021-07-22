import React, { useContext, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import DashCard from '../components/dashCard';
import Loading from '../components/loading';
import { AuthDispatchContext, AuthStateContext, requestConsult } from '../contexts/auth';
import { DrugsDispatchContext, DrugsStateContext, getDrugs } from '../contexts/drugs';
import { UsersDispatchContext, UsersStateContext, getUsers } from '../contexts/users';

const Dashboard = (props) => {
    const drugsDispatch = useContext(DrugsDispatchContext);
    const usersDispatch = useContext(UsersDispatchContext);
    const authState = useContext(AuthStateContext);
    const { drugs, loaded: drugLoaded } = useContext(DrugsStateContext);
    const { users, loaded: userLoaded } = useContext(UsersStateContext);
    let doctors, patients, nurses, accountants, toBeConsulteds, notCheckeds, paids, myDrugs;
    if (userLoaded && drugLoaded) {
        doctors = users.filter(user => user.role === 'doctor');
        patients = users.filter(user => user.role === 'patient');
        nurses = users.filter(user => user.role === 'nurse');
        accountants = users.filter(user => user.role === 'accountant');
        toBeConsulteds = users.filter(user => user.toBeConsulted === true);
        notCheckeds = drugs.filter(drug => drug.checked === false);
        paids = drugs.filter(drug => (drug.totalPricePaid != 0) && (drug.totalPricePaid === drug.totalPrice));
        myDrugs = drugs.filter(drug => drug.patientId === props.user._id);
    }
    console.log(users);
    console.log(drugs);

    const content = [
        {
            subtitle: "All users",
            bg: "primary",
            content: users,
            route: '/users/'
        },
        {
            subtitle: "Doctors",
            bg: "primary",
            content: doctors,
            route: '/users/doctors'
        },
        {
            subtitle: "Patients",
            bg: "primary",
            content: patients,
            route: '/users/patients'
        },
        {
            subtitle: "To Be Consulted",
            bg: "primary",
            content: toBeConsulteds,
            route: '/users/tobeconsulted'
        },
        {
            subtitle: "Nurses",
            bg: "primary",
            content: nurses,
            route: '/users/nurses'
        },
        {
            subtitle: "Accountants",
            bg: "primary",
            content: accountants,
            route: '/users/accountants'
        },
        {
            subtitle: "Not Checked Prescriptions",
            bg: "danger",
            content: notCheckeds,
            route: '/prescriptions/notchecked'
        },
        {
            subtitle: "Paid Prescriptions",
            bg: "success",
            content: paids,
            route: '/prescriptions/paid'
        },
        {
            subtitle: "All Prescriptions",
            bg: "primary",
            content: drugs,
            route: '/prescriptions'
        },
        {
            subtitle: "My Prescriptions",
            bg: "primary",
            content: myDrugs,
            route: '/prescriptions/me'
        },
    ];

    useEffect(() => {
        getDrugs(drugsDispatch);
        getUsers(usersDispatch);
    }, [drugsDispatch, usersDispatch, props.user])

    if (!userLoaded || !drugLoaded) {
        return <Loading />
    }

    return (
        <div className='container-fluid'>
            <Row className="mt-3 mt-md-5">
                {content.map(item => {
                    if (props.user.role === 'patient' && (item.subtitle === 'My Prescriptions')) {
                        return (
                            <Col xs={6} sm={6} md={4} className='p-0 px-2 pb-3 p-md-3' key={item.subtitle}>
                                <DashCard message={item} />
                            </Col>
                        )
                    }
                    if (props.user.role === 'accountant' && (item.subtitle === 'All Prescriptions' || item.subtitle === 'My Prescriptions' || item.subtitle === 'Paid Prescriptions' || item.subtitle === 'Not Checked Prescriptions')) {
                        return (
                            <Col xs={6} sm={6} md={4} className='p-0 px-2 pb-3 p-md-3' key={item.subtitle}>
                                <DashCard message={item} />
                            </Col>
                        )
                    }
                    if (props.user.role === 'doctor' && (item.subtitle === 'All Prescriptions' || item.subtitle === 'My Prescriptions' || item.subtitle === 'Patients' || item.subtitle === 'To Be Consulted')) {
                        return (
                            <Col xs={6} sm={6} md={4} className='p-0 px-2 pb-3 p-md-3' key={item.subtitle}>
                                <DashCard message={item} />
                            </Col>
                        )
                    }
                    if (props.user.isAdmin === true) {
                        return (
                            <Col xs={6} sm={6} md={4} className='p-0 px-2 pb-3 p-md-3' key={item.subtitle}>
                                <DashCard message={item} />
                            </Col>
                        )
                    }
                    return <></>;
                })}
            </Row>
        </div>
    )
}

export default Dashboard;