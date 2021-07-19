import React, {useState, useEffect, useContext} from 'react';
import { UsersDispatchContext, UsersStateContext, getUsers } from '../contexts/users';
import { DrugsDispatchContext, DrugsStateContext, getDrug } from '../contexts/users';
import Loading from '../components/loading';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import Input from '../components/form-controls/input';
import Select from '../components/form-controls/input';
import Check from '../components/form-controls/check';


const EditDrug = ({...props}) => {
    const {id} = useParams();
    const dispatch = useContext(DrugsDispatchContext);
    const {users} = useContext(UsersStateContext);
    const doctors = users.filter(user=>user.role === 'doctor');
    const patients = users.filter(user=>user.role === 'patient');
    const nurses = users.filter(user=>user.role === 'nurse');
    const accountants = users.filter(user=>user.role === 'accountant');
    const toBeConsulteds = users.filter(user=>user.toBeConsulted === true);

    const userDispatch = useContext(UsersDispatchContext);
    const [loading, setLoading] = useState(true);
    // getUser(dispatch, id);
    const {drug, loaded} = useContext(DrugsStateContext);
    const [data, setData] = useState({
        ...drug
    });
    const formData = {
        name: {
            type: 'text',
            label: 'Fullname',
            name: 'fullName',
            value: data ? data.fullName : ''
        },
        email: {
            type: 'email',
            label: 'Email',
            name: 'email',
            value: data ? data.email : ''
        },
        phone: {
            type: 'tel',
            label: 'Phone',
            name: 'phone',
            value: data ? data.phone : ''
        },
        role: {
            type: 'select',
            label: 'Select role',
            name: 'role',
            value: data ? data.role : '',
            options: ['patient', 'doctor', 'nurse', 'accountant']
        },
        isAdmin: {
            type: 'check',
            label: 'Admin',
            name: 'isAdmin',
            value: data ? data.isAdmin : ''
        },
        password: {
            type: 'password',
            label: 'Password',
            name: 'password',
            value: ''
        }
    };
    const [errors, setErrors] = useState({});
    const [msg, setMsg] = useState('');
    const [validated, setValidated] = useState(false);

    const onInputChange = (e) => {
        const {name, value} = e.target;
        setData((prevState)=>{
            return{
                ...prevState,
                [name]: value
            };
        });
        // console.log(e.target.value)
        setValidated(false);
    };

    useEffect(()=>{
        getDrug(dispatch, id);
        getUsers(userDispatch);
        setLoading(false);
    }, [])
	
    const handler = (e) => {
        // console.log("state");
        // alert(data);
        console.log(data);
        setValidated(true);
        e.preventDefault();
    };

    const showMe = () => {
        alert(data);
    };

    if(!loaded || loading){
        return <Loading />
    }

    return(
        <Form noValidate validated={validated} className='text-left my-5 pt-5' onSubmit={showMe}>
            {
                msg && !errors ? <Alert variant="success">{msg}</Alert> : 
                    (msg ? <Alert variant="danger">{msg}</Alert> : <Alert variant="primary">please fill the form</Alert>)
            }
            {
                Object.entries(formData).map(field => {
                    if(field[1].type === 'select'){
                        return <Select key={field[0]} errors={errors} data={field[1]} getInput={onInputChange} />
                    }
                    else if(field[1].type === 'check'){
                        return <Check key={field[0]} errors={errors} data={field[1]} getInput={onInputChange} />
                    }
                    return <Input key={field[0]} errors={errors} data={field[1]} getInput={onInputChange}/>
                })
            }
            <Button variant="success" type="submit" onClick={handler}>
                Submit
            </Button>
        </Form>
    )
}

export default EditDrug;