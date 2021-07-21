import React, {useState, useEffect, useContext} from 'react';
import Loading from '../components/loading';
import { UsersDispatchContext, UsersStateContext, getUsers, removeUser } from '../contexts/users';
import {Redirect, useParams} from 'react-router-dom';
import Alert from 'react-bootstrap/Alert'
import Table from '../components/myTable';
// import axios from 'axios';
// import { usersData } from '../../../backend/data';

const UserRecords = (props) => {
    const {category} = useParams();
    const {users, loaded} = useContext(UsersStateContext);
    let doctors, patients, nurses, accountants, toBeConsulteds;
    if (loaded){
        doctors = users.filter(user=>user.role === 'doctor');
    patients = users.filter(user=>user.role === 'patient');
    nurses = users.filter(user=>user.role === 'nurse');
    accountants = users.filter(user=>user.role === 'accountant');
    toBeConsulteds = users.filter(user=>user.toBeConsulted === true);
    // notCheckeds = drugs.filter(drug=>drug.checked === false);
    // paids = drugs.filter(drug=>drug.totalPricePaid === drug.totalPrice);
    }
    const data = (category === 'doctors') ? doctors
    : (category === 'patients') ? patients
    : (category === 'nurses') ? nurses
    : (category === 'accountants') ? accountants
    : (category === 'tobeconsulted') ? toBeConsulteds
    // : (category === 'notchecked') ? notCheckeds
    : users;
    const dispatch = useContext(UsersDispatchContext);
    const [msg, setMsg] = useState('');
    console.log(data);

    // useEffect(()=>{
    //     getUsers(dispatch);
    // }, []);
    // const delData = (g) => {
    //     removeUser(dispatch, g);
    // }

    const delData = (g) => {
        removeUser(dispatch, g);
    }

    if(!loaded){
        console.log('hi');
        return <Loading />
    }
    console.log('me',props.user);
    return(
            <div className='container-fluid'>
                {msg ? <Alert variant="success">{msg}</Alert> : ''}
                
                {users.length > 0 ?
                    (props.user.isAdmin ?
                        (props.user.role === 'doctor' ?
                        <Table data={data} edFunc="editUser" consult={true} delFunc={delData} />
                        :
                        <Table data={data} edFunc="editUser" delFunc={delData} />)
                        :
                        (props.user.role === 'doctor' ?
                        <Table data={data} consult={true} delFunc={delData} />
                        :
                        <Table data={data} />))
                    // "table"
                : <h1>No Data in The Table</h1>
                }
            </div>
    );
};

export default UserRecords;