import React, { useState, useEffect, useContext } from 'react';
import Loading from '../components/loading';
import { UsersDispatchContext, UsersStateContext, getUsers, removeUser } from '../contexts/users';
import Alert from 'react-bootstrap/Alert'
import Table from '../components/myTable';

const Patients = (props) => {
    const { users, loaded } = useContext(UsersStateContext);
    const waitingPatients = users.filter(user => user.toBeConsulted);
    const dispatch = useContext(UsersDispatchContext);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        getUsers(dispatch);
    }, [users]);

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

            {waitingPatients.length > 0 ?
                (props.user.isAdmin ?
                    <Table data={waitingPatients} edFunc="editUser" delFunc={delData} />
                    :
                    <Table data={waitingPatients} delFunc={delData} consult={true} />)
                // "table"
                : <h1>No Data in The Table</h1>
            }
        </div>
    );
};

export default Patients;