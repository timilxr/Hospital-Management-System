import React, { useContext, useEffect } from 'react';
import usePagination from '../components/usePagination';
import { Row, Col } from 'react-bootstrap';
import DashCard from '../components/dashCard';
import Loading from '../components/loading';
import Pagination from '../components/pagination';
import Preview from '../components/preview';
import { AuthDispatchContext, AuthStateContext, requestConsult } from '../contexts/auth';
import { DrugsDispatchContext, DrugsStateContext, getDrugs } from '../contexts/drugs';
import { UsersDispatchContext, UsersStateContext, getUsers } from '../contexts/users';
import BarChart from '../components/barChart';
import DoughnutChart from '../components/doughnutChart';

const Dashboard = (props) => {
    const drugsDispatch = useContext(DrugsDispatchContext);
    const usersDispatch = useContext(UsersDispatchContext);
    const authState = useContext(AuthStateContext);
    const { drugs, loaded: drugLoaded } = useContext(DrugsStateContext);
    const { users, loaded: userLoaded } = useContext(UsersStateContext);
    let doctors, patients, nurses, accountants, toBeConsulteds, notCheckeds, paids, myDrugs, usersLabels, usersDatasets, overallLabels, overallDatasets;
    if (userLoaded && drugLoaded) {
        // let nurseNotChecked = drugs.filter(drug => (drug.last_checked_by === '' || !drug.last_checked_by) && drug.to_be_consulted === true);
        myDrugs = drugs.filter(drug => drug.patient_id === props.user._id);
        // currentDrug = props.user.role === 'patient' ? myDrugs : props.user.role === 'nurse' ? nurseNotChecked : props.user.role
        doctors = users.filter(user => user.role === 'doctor');
        patients = users.filter(user => user.role === 'patient');
        nurses = users.filter(user => user.role === 'nurse');
        accountants = users.filter(user => user.role === 'accountant');
        toBeConsulteds = drugs.filter(drug => drug.to_be_consulted === true);
        notCheckeds = drugs.filter(drug => drug.last_checked_by === '' || !drug.last_checked_by);
        paids = drugs.filter(drug => (drug.total_price_paid != 0) && (drug.total_price_paid === drug.total_price));
        usersLabels = ['Doctors', 'Patients', 'Nurses', 'Accountants'];
        usersDatasets = [{
            label: 'No of users',
            data: [doctors.length, patients.length, nurses.length, accountants.length],
            backgroundColor: ['Red', 'Blue', 'Yellow', 'Green'],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 2,
        },
        {
            label: 'No of users with files',
            data: [doctors.filter(user => user.folder != null).length, patients.filter(user => user.folder != null).length, nurses.filter(user => user.folder != null).length, accountants.filter(user => user.folder != null).length],
            backgroundColor: 'Blue',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
        },
        ];
        overallLabels = ['Users', 'Awaiting Consultation', 'Total Files'];
        overallDatasets = [{
            label: 'Quantity',
            data: [users.length, toBeConsulteds.length, drugs.length],
            backgroundColor: ['Red', 'Blue', 'Yellow'],
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
        }
        ];
    }
    console.log(users);
    console.log(drugs);

    const content = [
        {
            subtitle: "All users",
            bg: "primary",
            content: users,
            icon: 'fa fa-users fa-5x',
            route: '/users/'
        },
        // {
        //     subtitle: "Doctors",
        //     icon: 'fa fa-file-text fa-5x',
        //     bg: "primary",
        //     content: doctors,
        //     route: '/users/doctors'
        // },
        // {
        //     subtitle: "Patients",
        //     icon: 'fa fa-wheelchair fa-5x',
        //     bg: "primary",
        //     content: patients,
        //     route: '/users/patients'
        // },
        {
            subtitle: "To Be Consulted",
            icon: 'fa fa-file-text fa-5x',
            bg: "primary",
            content: toBeConsulteds,
            route: '/prescriptions/tobeconsulted'
        },
        // {
        //     subtitle: "Nurses",
        //     icon: 'fa fa-file-text fa-5x',
        //     bg: "primary",
        //     content: nurses,
        //     route: '/users/nurses'
        // },
        // {
        //     subtitle: "Accountants",
        //     icon: 'fa fa-file-text fa-5x',
        //     bg: "primary",
        //     content: accountants,
        //     route: '/users/accountants'
        // },
        {
            subtitle: "Not Checked Files",
            icon: 'fa fa-file-text fa-5x',
            bg: "danger",
            content: notCheckeds,
            route: '/prescriptions/notchecked'
        },
        {
            subtitle: "Paid Files",
            icon: 'fa fa-file-text fa-5x',
            bg: "success",
            content: paids,
            route: '/prescriptions/paid'
        },
        {
            subtitle: "All Files",
            icon: 'fa fa-file-text fa-5x',
            bg: "primary",
            content: drugs,
            route: '/prescriptions'
        },
        {
            subtitle: "My Files",
            icon: 'fa fa-file-text fa-5x',
            bg: "primary",
            content: myDrugs,
            route: '/prescriptions/me'
        },
    ];
    const postsPerPage = 2;

    const [usersData, usersPaginate] = usePagination(users, postsPerPage, userLoaded);
    // console.log('me3', usersData);
    const [drugsData, drugsPaginate] = usePagination(drugs, postsPerPage, drugLoaded);

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
                    if (props.user.role === 'patient' && (item.subtitle === 'My Files')) {
                        return (
                            <Col xs={6} sm={4} md={3} className='p-0 px-2 pb-3 p-md-3' key={item.subtitle}>
                                <DashCard message={item} key={item.subtitle} />
                            </Col>
                        )
                    }
                    if (props.user.role === 'accountant' && (item.subtitle === 'All Files' || item.subtitle === 'My Files' || item.subtitle === 'Paid Files' || item.subtitle === 'Not Checked Files')) {
                        return (
                            <Col xs={6} sm={4} md={3} className='p-0 px-2 pb-3 p-md-3' key={item.subtitle}>
                                <DashCard message={item} key={item.subtitle} />
                            </Col>
                        )
                    }
                    if (props.user.role === 'nurse' && (item.subtitle === 'All Files' || item.subtitle === 'My Files' || item.subtitle === 'Patients' || item.subtitle === 'Paid Files' || item.subtitle === 'Not Checked Files')) {
                        return (
                            <Col xs={6} sm={4} md={3} className='p-0 px-2 pb-3 p-md-3' key={item.subtitle}>
                                <DashCard message={item} key={item.subtitle} />
                            </Col>
                        )
                    }
                    if (props.user.role === 'doctor' && (item.subtitle === 'All Files' || item.subtitle === 'My Files' || item.subtitle === 'Patients' || item.subtitle === 'To Be Consulted')) {
                        return (
                            <Col xs={6} sm={4} md={3} className='p-0 px-2 pb-3 p-md-3' key={item.subtitle}>
                                <DashCard message={item} key={item.subtitle} />
                            </Col>
                        )
                    }
                    if (props.user.admin === true) {
                        return (
                            <Col xs={6} sm={4} md={3} className='p-0 px-2 pb-3 p-md-3' key={item.subtitle}>
                                <DashCard message={item} key={item.subtitle} />
                            </Col>
                        )
                    }
                    return <></>;
                })}
            </Row>
            <Row>
                <Col xs={12} sm={8} md={9}>
                    <BarChart labels={usersLabels} datasets={usersDatasets} />
                </Col>
                <Col xs={12} sm={4} md={3}>
                    <DoughnutChart labels={overallLabels} datasets={overallDatasets} />
                </Col>
                <Col xs={12} sm={12} md={12}>
                    <Preview data={usersData} headings={Object.keys(users[0])} content='users' />
                    <Pagination postsPerPage={postsPerPage} totalPosts={users.length} paginate={usersPaginate} />
                    <Preview data={drugsData} headings={drugs.length > 0 ? Object.keys(drugs[0]) : ['Message']} content='drugs' />
                    <Pagination postsPerPage={postsPerPage} totalPosts={drugs.length} paginate={drugsPaginate} />
                </Col>
            </Row>
        </div>
    )
}

export default Dashboard;