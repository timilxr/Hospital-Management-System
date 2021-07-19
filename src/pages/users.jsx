import React, {useState, useEffect, useContext} from 'react';
import Loading from '../components/loading';
import { UsersDispatchContext, UsersStateContext, getUsers, removeUser } from '../contexts/users';
import {Redirect} from 'react-router-dom';
import Alert from 'react-bootstrap/Alert'
import Table from '../components/myTable';
// import axios from 'axios';
// import { usersData } from '../../../backend/data';

const UserRecords = (props) => {
    const {users, loaded} = useContext(UsersStateContext);
    const dispatch = useContext(UsersDispatchContext);
    const [msg, setMsg] = useState('');

    useEffect(()=>{
        getUsers(dispatch);
    }, []);

    const delData = (g) => {
        removeUser(dispatch, g);
    }

    if(!loaded){
        console.log('hi');
        return <Loading />
    }

    return(
            <div>
                {msg ? <Alert variant="success">{msg}</Alert> : ''}
                
                {users.length > 0 ?
                    (props.user.isAdmin ?
                        <Table data={users} edFunc="editUser" delFunc={delData} />
                        :
                        <Table data={users} delFunc={delData} />)
                    // "table"
                : <h1>No Data in The Table</h1>
                }
            </div>
    );
};

export default UserRecords;