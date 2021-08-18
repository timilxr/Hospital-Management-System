import React, { useContext, useState } from 'react';
import { AuthStateContext, AuthDispatchContext, signIn } from '../contexts/auth';
import { UsersStateContext, UsersDispatchContext, addUser } from '../contexts/users';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import Input from './form-controls/input';
import Loading from './loading';


export const SignUp = ({ toggler, ...props }) => {
    const formData = {
        name: {
            type: 'text',
            label: 'Fullname',
            name: 'full_name',
            placeholder: 'Timi Ayo',
            value: ''
        },
        email: {
            type: 'email',
            label: 'Email',
            name: 'email',
            placeholder: 'jackie@gmail.com',
            value: ''
        },
        phone: {
            type: 'tel',
            label: 'Phone',
            name: 'phone',
            placeholder: '08088789432',
            value: ''
        },
        password: {
            type: 'password',
            label: 'Password',
            name: 'password',
            placeholder: 'Enter secure password',
            value: ''
        }
    };
    const [data, setData] = useState({
        full_name: '',
        email: '',
        phone: Number,
        role: 'patient',
        admin: false,
        password: ''
    });
    const [errors, setErrors] = useState('success');
    const [msg, setMsg] = useState(null);
    const [loading, setLoading] = useState(false);
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
                setLoading(true);
                await addUser(userDispatch, data);
                setLoading(false);
                setErrors('success');
                setMsg('You may now log in');
            } else {
                setErrors('danger');
                setMsg('Error please try again');
            }
        } catch (error) {
                setErrors('danger');
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

    if(loading){
        return <Loading />
    }

    return (
        <Form noValidate validated={validated} className='text-left my-5 p-5' onSubmit={showMe}>
            {
                // errors === false ? <Alert variant="success">{msg}</Alert> :
                    (msg ? <Alert variant={errors}>{msg}</Alert> : <Alert variant="primary">Please fill the form</Alert>)
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
            placeholder: 'jackie@gmail.com',
            value: ''
        },
        password: {
            type: 'password',
            label: 'Password',
            name: 'password',
            placeholder: 'Enter secure password',
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
    const [loading, setLoading] = useState(false);
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
                setLoading(true);
                await signIn(dispatch, data);
                setLoading(false);
                setMsg('Sign In Unsuccessful');
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

    if(loading){
        return <Loading />
    }

    return (
        <Form noValidate validated={validated} className='text-left my-5 p-5' onSubmit={showMe}>
            {
                msg && errors === {} ? <Alert variant="success">{msg}</Alert> :
                    (msg ? <Alert variant="danger">{msg}</Alert> : <Alert variant="primary">Please fill the form</Alert>)
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