import React, {useState, useEffect, useContext} from 'react';
import { UsersDispatchContext, usersStateContext, getUsers } from '../contexts/users';
import {Redirect} from 'react-router-dom';
import Alert from 'react-bootstrap/Alert'
import Table from '../components/myTable';
import axios from 'axios';

const UserRecords = (props) => {
    const users = useContext(usersStateContext);
    const dispatch = useContext(usersDispatchContext);
    const [msg, setMsg] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [records, setRecords] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:2000/users/')
        .then(res=>{setRecords([...res.data]);setIsLoading(false)})
        .catch(err=>console.log(`Error: ${err}`));
    }, []);

    const delData = (g) => {
        axios.delete(`http://localhost:2000/users/${g}`)
        .then((res)=>{
            console.log(res.data);
            setMsg(res.data);
            let h = records.filter((el)=>el._id !== g);
            console.log(h);
            setRecords(h);
            // setRec((prev)=>{
            //     return {
            //         hits: prev.hits.filter((el)=>el._id === g)}
            // });
            console.log(records);
        })
        .catch((err)=>console.log(`Error: ${err}`));
    }
    const upData = (g) => <Redirect to={"http://localhost:3000/admin/user/"+g} />;

    return(
            <div>
                {msg ? <Alert variant="success">{msg}</Alert> : ''}
                {isLoading ? 
                <h1>Loading...</h1>
                : 
                (records.length > 0 ?
                    <Table data={users} edFunc="user" delFunc={delData} />
                    // "table"
                : <h1>No Data in The Table</h1>)
                }
            </div>
    );
};

export default UserRecords;