import React, { useState, useEffect, useContext } from 'react';
import Loading from '../components/loading';
import { UsersDispatchContext, UsersStateContext, getUsers, removeUser } from '../contexts/users';
import { Redirect } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert'
import Table from '../components/myTable';

const Patients = (props) => {
    const { users, loaded } = useContext(UsersStateContext);
    const patients = users.filter(user => user.role !== 'patient');
    const dispatch = useContext(UsersDispatchContext);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        getUsers(dispatch);
    }, []);

    const delData = (g) => {
        removeUser(dispatch, g);
    }

    if (!loaded) {
        console.log('hi');
        return <Loading />
    }

    return (
        <div>
            {msg ? <Alert variant="success">{msg}</Alert> : ''}

            {patients.length > 0 ?
                (props.user.isAdmin ?
                    <Table data={patients} edFunc="editUser" delFunc={delData} />
                    :
                    <Table data={patients} delFunc={delData} />)
                : <h1>No Data in The Table</h1>
            }
        </div>
    );
};

export default Patients;