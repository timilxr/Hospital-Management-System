import React, { useState, useEffect, useContext } from 'react';
import { DrugsDispatchContext, DrugsStateContext, getDrug, updateDrug } from '../contexts/drugs';
import { UsersDispatchContext, UsersStateContext, getUsers } from '../contexts/users';
import Loading from '../components/loading';
import { useParams } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import TextArea from '../components/form-controls/textarea';


const RecordVitals = (props) => {
    const { drugId } = useParams();
    const dispatch = useContext(DrugsDispatchContext);
    const userDispatch = useContext(UsersDispatchContext);
    const [loading, setLoading] = useState(true);
    // getUser(dispatch, id);
    const { drug, loaded } = useContext(DrugsStateContext);
    console.log(drug);
    const [errors, setErrors] = useState({});
    const [color, setColor] = useState(null);
    const [msg, setMsg] = useState('');
    const [validated, setValidated] = useState(false);
    const [data, setData] = useState('');


    useEffect(() => {
        getDrug(dispatch, drugId);
        getUsers(userDispatch);
        setLoading(false);
    }, [])

    const { users, loaded: userLoaded } = useContext(UsersStateContext);
    console.log(users, userLoaded);

    if ((!loaded || loading) || !userLoaded) {
        return <Loading />
    }
    const formData = {
        vitals: {
            type: 'textarea',
            label: 'Record Vital',
            name: 'description',
            value: ''
        }
    };

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setData(value);
        console.log(e.target.value)
        setValidated(false);
    };


    let user;
    if (users && drug) {
        user = users.filter(user => user._id === drug.patient_id)[0];
        console.log(user);
    }
    const checked = async (e) => {
        let update = {
            ...drug,
            last_checked_by: 'nurse'
        };
        await updateDrug(dispatch, drugId, update);
            setColor('success');
            setMsg('Check completed');
            alert(msg);
    }
    const handler = async (e) => {
        // console.log("state");
        // alert(data);
        if (data === '') {
            setColor('danger');
            setMsg('Error: Please input data');
            return 1;
        }
        drug.last_checked_by = 'nurse';
        let drugs = [...drug.drugs, {
            description: data,
        }];
        let update = {
            ...drug,
            last_checked_by: 'nurse',
            drugs: drugs,
        };
        // update.drugs.push({
        //     description: data
        // });
        console.log(update);
        try {
            await updateDrug(dispatch, drugId, update);
        } catch (error) {
            console.log(error);
            setColor('danger');
            setMsg('An error occured, please try again');
            return 1;
        }
        setMsg('Successfully updated');
        setColor('success');
        setValidated(true);
        e.preventDefault();
    };

    const showMe = (e) => {
        // alert(data);
        e.preventDefault();
    };


    return (
        <div>
            {users && user && drug ?
                <div className='text-left my-5 p-3 p-md-5 pt-md-0'>
                    <h1 className="h1">Patient's Contact Info</h1>
                    <h2 style={{ textTransform: 'capitalize' }}>Patient Name: {user.full_name}</h2>
                    <h3>Patient Phone: <a href={`tel:${user.phone}`} className="text-decoration-none">{user.phone}</a></h3>
                    <h3>Patient Email: <a href={`mail:${user.email}`} className="text-decoration-none">{user.email}</a></h3>

                </div> :
                ''}
            <Form noValidate validated={validated} className='text-left my-5' onSubmit={showMe}>
                {
                    // msg && !errors ? <Alert variant="success">{msg}</Alert> :
                    msg ? <Alert variant={color}>{msg}</Alert> : <Alert variant="primary">please fill the form</Alert>
                }
                {
                    Object.entries(formData).map(field => {
                        return <TextArea key={field[0]} errors={errors} data={field[1]} getInput={onInputChange} />
                    })
                }
                <Button variant="primary" className='mt-2' type="submit" onClick={handler}>
                    Submit
                </Button>
            </Form>
            <Button variant="success" className='mt-2' type="submit" onClick={checked}>
                    Mark check completed
                </Button>
        </div>
    )
}

export default RecordVitals;