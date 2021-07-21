import React, { useContext, useState } from 'react';
import { AuthStateContext, AuthDispatchContext, signIn } from '../contexts/auth';
import { UsersStateContext, UsersDispatchContext, addUser } from '../contexts/users';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import Input from './form-controls/input';


export const SignUp = ({ toggler, ...props }) => {
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
        fullName: '',
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
        const { name, value } = e.target;
        setData((prevState) => {
            return {
                ...prevState,
                [name]: value
            };
        });
        setValidated(false);
    };

    const handler = async (e) => {
        try {
            const values = Object.values(data);
            let status = true;
            values.map(val => {
                if (val === '') {
                    return status = false
                }
            });
            if (status === true) {
                await addUser(userDispatch, data);
                setMsg('you may now log in');
            } else {
                setMsg('Error please try again');
            }
        } catch (error) {
            setMsg('Error please try again');
            console.error(error);
        }
        console.log(data);
        setValidated(true);
        e.preventDefault();
    };

    const showMe = (e) => {
        e.preventDefault()
    };

    return (
        <Form noValidate validated={validated} className='text-left my-5 p-5' onSubmit={showMe}>
            {
                msg && !errors ? <Alert variant="success">{msg}</Alert> :
                    (msg ? <Alert variant="danger">{msg}</Alert> : <Alert variant="primary">please fill the form</Alert>)
            }
            {
                Object.entries(formData).map(field => {
                    // if(field[1].type === 'select'){
                    //     return <Select key={field[0]} errors={errors} data={field[1]} getInput={onInputChange} />
                    // }
                    return <Input key={field[0]} errors={errors} data={field[1]} getInput={onInputChange} />
                })
            }
            <Button variant="success" type="submit" className="me-5 mt-3" onClick={handler}>
                Submit
            </Button>
            <Button variant="primary" type="submit" className="ms-0 ms-md-5 mt-3" onClick={toggler}>
                Sign in instead?
            </Button>
        </Form>
    )
}
export const SignIn = ({ toggler, ...props }) => {
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
        const { name, value } = e.target;
        setData((prevState) => {
            return {
                ...prevState,
                [name]: value
            };
        });
        setValidated(false);
    };

    const handler = async (e) => {
        // const newdata = JSON.stringify(data);
        try {
            const values = Object.values(data);
            let status = true;
            values.map(val => {
                if (val === '') {
                    return status = false
                }
            });
            if (status === true) {
                await signIn(dispatch, data);
                setMsg('Sign In unSuccessful');
            } else {
                setMsg('Error please try again');
            }
        } catch (error) {
            setMsg('Error please try again');
            console.error(error);
        }
        // console.log(data);
        setValidated(false);
        e.preventDefault();
    };

    const showMe = (e) => {
        e.preventDefault();
    };

    return (
        <Form noValidate validated={validated} className='text-left my-5 p-5' onSubmit={showMe}>
            {
                msg && !errors ? <Alert variant="success">{msg}</Alert> :
                    (msg ? <Alert variant="danger">{msg}</Alert> : <Alert variant="primary">please fill the form</Alert>)
            }
            {
                Object.entries(formData).map(field => {
                    // if(field[1].type === 'select'){
                    //     return <Select key={field[0]} errors={errors} data={field[1]} getInput={onInputChange} />
                    // }
                    return <Input key={field[0]} errors={errors} data={field[1]} getInput={onInputChange} />
                })
            }
            <Button variant="success" type="submit" className="me-4 me-md-5 mt-3" onClick={handler}>
                Submit
            </Button>
            <Button variant="primary" type="button" className="ms-0 ms-md-5 mt-3" onClick={toggler}>
                Sign up instead?
            </Button>
        </Form>
    )
}