import React, { useState, useEffect, useContext } from 'react';
import { UsersStateContext, UsersDispatchContext, addUser, getUsers } from '../contexts/users';
import { AuthStateContext } from '../contexts/auth';
import Loading from '../components/loading';
import { Form, Alert, Button } from 'react-bootstrap';
import Input from '../components/form-controls/input';
import Select from '../components/form-controls/select';
import Check from '../components/form-controls/check';
import { useHistory } from 'react-router-dom';

const AddUser = (props) => {
    const history = useHistory();
    const userDispatch = useContext(UsersDispatchContext);
    const { loading, users, user } = useContext(UsersStateContext);
    const [newUser, setNewUser] = useState(true);
    useEffect(() => {
        getUsers(userDispatch);
    }, []);

    !props.user.admin && history.push('/dashboard');
    const [data, setData] = useState({
        full_name: '',
        email: '',
        phone: Number,
        role: '',
        admin: false,
        password: ''
    });

    const formData = {
        name: {
            type: 'text',
            label: 'Fullname',
            name: 'full_name',
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
        role: {
            type: 'select',
            label: 'Role',
            name: 'role',
            value: '',
            options: ['doctor', 'nurse', 'accountant', 'patient']
        },
        isAdmin: {
            type: 'check',
            label: 'Admin',
            name: 'admin',
            checked: data ? data.isAdmin : ''
        },
        password: {
            type: 'password',
            label: 'Password',
            name: 'password',
            value: ''
        }
    };
    const [errors, setErrors] = useState({});
    const [color, setColor] = useState(null);
    const [msg, setMsg] = useState(null);
    const [validated, setValidated] = useState(false);

    if (loading) {
        return <Loading />
    }

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
            console.log(data);
            let status = false;
            users.map(user => {
                if (user.email === data.email) {
                    setMsg('Error: Email already in use')
                    setColor('danger')
                    return status = true;
                } else if (user.phone === data.phone) {
                    setMsg('Error: Phone number already in use')
                    setColor('danger')
                    return status = true
                }
            });

            if (status === false) {
                try {
                    await addUser(userDispatch, data)
                } catch (error) {
                    setMsg('Error Adding user')
                    setColor('danger')
                }
                setColor('success')
                setMsg('you may now log in')
            }
            else return 1;

        } catch (error) {
            setMsg('Error Adding user')
            setColor('danger')
            console.error(error);
        }
        console.log(data);
        setValidated(true);
        e.preventDefault();
    };

    const showMe = (e) => {
        e.preventDefault();
        alert(msg);
    };

    return (
        <Form noValidate validated={validated} method='POST' className='text-left my-5 pt-5' onSubmit={showMe}>
            {
                // msg && !errors ? <Alert variant="success">{msg}</Alert> :
                    msg ? <Alert variant={color}>{msg}</Alert> : <Alert variant="primary">please fill the form</Alert>
            }
            {
                Object.entries(formData).map(field => {
                    if (field[1].type === 'select') {
                        return <Select key={field[0]} errors={errors} data={field[1]} getInput={onInputChange} />
                    }
                    else if (field[1].type === 'check') {
                        return <Check key={field[0]} errors={errors} data={field[1]} getInput={onInputChange} />
                    }
                    return <Input key={field[0]} errors={errors} data={field[1]} getInput={onInputChange} />
                })
            }
            <Button variant="success" type="submit" className='mt-3' onClick={handler}>
                Add user
            </Button>
        </Form>
    )
}

export default AddUser;