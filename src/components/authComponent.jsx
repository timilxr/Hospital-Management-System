import React, {useContext, useState} from 'react';
import { AuthStateContext, AuthDispatchContext, signIn} from '../contexts/auth';
import { UsersStateContext, UsersDispatchContext, addUser } from '../contexts/users';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import Input from './form-controls/input';


export const SignUp = ({toggler, ...props}) => {
    const formData = {
        name: {
            type: 'text',
            label: 'Fullname',
            name: 'fullName',
            value: ''
        },
        email: {
            type: 'email',
            label: 'Email',
            name: 'email',
            value: ''
        },
        phone: {
            type: 'tel',
            label: 'Phone',
            name: 'phone',
            value: ''
        },
        password: {
            type: 'password',
            label: 'Password',
            name: 'password',
            value: ''
        }
    };
    const [data, setData] = useState({
        name: '',
        email: '',
        phone: Number,
		role: 'patient',
        isAdmin: false,
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [msg, setMsg] = useState(null);
    const [validated, setValidated] = useState(false);
    const authdispatch = useContext(AuthDispatchContext);
    const userDispatch = useContext(UsersDispatchContext);

    const onInputChange = (e) => {
        const {name, value} = e.target;
        setData((prevState)=>{
            return{
                ...prevState,
                [name]: value
            };
        });
        setValidated(false);
    };
	
    const handler = async (e) => {
        try {
            await addUser(userDispatch, data);
            setMsg('you may now log in');
        } catch (error) {
            console.error(error);
        }
        console.log(data);
        setValidated(true);
        e.preventDefault();
    };

    const showMe = () => {
        alert(data);
    };

    return(
        <Form noValidate validated={validated} className='text-left my-5 pt-5' onSubmit={showMe}>
            {
                msg && !errors ? <Alert variant="success">{msg}</Alert> : 
                    (msg ? <Alert variant="danger">{msg}</Alert> : <Alert variant="primary">please fill the form</Alert>)
            }
            {
                Object.entries(formData).map(field => {
                    // if(field[1].type === 'select'){
                    //     return <Select key={field[0]} errors={errors} data={field[1]} getInput={onInputChange} />
                    // }
                    return <Input key={field[0]} errors={errors} data={field[1]} getInput={onInputChange}/>
                })
            }
            <Button variant="success" type="submit" onClick={handler}>
                Submit
            </Button>
			<Button variant="primary" type="submit" className="ml-auto" onClick={toggler}>
                Sign in?
            </Button>
        </Form>
    )
}
export const SignIn = ({toggler, ...props}) => {
    const formData = {
        email: {
            type: 'email',
            label: 'Email',
            name: 'email',
            value: ''
        },
        password: {
            type: 'password',
            label: 'Password',
            name: 'password',
            value: ''
        }
    };
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [msg, setMsg] = useState('');
    const [validated, setValidated] = useState(false);
    const dispatch = useContext(AuthDispatchContext);

    const onInputChange = (e) => {
        const {name, value} = e.target;
        setData((prevState)=>{
            return{
                ...prevState,
                [name]: value
            };
        });
        setValidated(false);
    };

    const handler = (e) => {
        signIn(dispatch, data);
        setValidated(false);
        e.preventDefault();
    };

    const showMe = () => {
        alert(data);
    };

    return(
        <Form noValidate validated={validated} className='text-left my-5 pt-5' onSubmit={showMe}>
            {
                msg && !errors ? <Alert variant="success">{msg}</Alert> : 
                    (msg ? <Alert variant="danger">{msg}</Alert> : <Alert variant="primary">please fill the form</Alert>)
            }
            {
                Object.entries(formData).map(field => {
                    // if(field[1].type === 'select'){
                    //     return <Select key={field[0]} errors={errors} data={field[1]} getInput={onInputChange} />
                    // }
                    return <Input key={field[0]} errors={errors} data={field[1]} getInput={onInputChange}/>
                })
            }
            <Button variant="success" type="submit" onClick={handler}>
                Submit
            </Button>
			<Button variant="primary" type="submit" className="ml-auto" onClick={toggler}>
                Sign up?
            </Button>
        </Form>
    )
}