import React, { useState, useEffect, useContext } from 'react';
import { UsersDispatchContext, UsersStateContext, getUsers, toggleConsult } from '../contexts/users';
import { DrugsDispatchContext, DrugsStateContext, getDrug, addDrug } from '../contexts/drugs';
import Loading from '../components/loading';
import { useParams, useHistory } from 'react-router-dom';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import Input from '../components/form-controls/input';
import Select from '../components/form-controls/select';
import Check from '../components/form-controls/check';


const PrescribeDrugs = ({ ...props }) => {
    const history = useHistory();
    const { patientId } = useParams();
    const dispatch = useContext(DrugsDispatchContext);
    const { users, loaded } = useContext(UsersStateContext);

    const userDispatch = useContext(UsersDispatchContext);
    const [loading, setLoading] = useState(true);
    const [nurseData, setNurseData] = useState(null)
    const [prescriptionData, setPrescriptionData] = useState(null)
    const [drugData, setDrugData] = useState([])
    const [dosageData, setDosageData] = useState({
        intake: 2,
        occassionRate: 3,
        occassion: 'daily',
        spanRate: 10,
        span: 'days',
    })
    const [data, setData] = useState({
        doctorId: props.user._id,
        patientId: patientId,
        drugs: [{
            prescription: 'Paracetamol 10mg',
            dosage: {
                intake: 2,
                occassionRate: 3,
                occassion: 'daily',
                spanRate: 10,
                span: 'days',
            }
        }]
    });
    const [errors, setErrors] = useState({});
    const [msg, setMsg] = useState('');
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        getUsers(userDispatch);
        setLoading(false);
    }, [])


    if (!loaded) {
        return <Loading />
    }

    const doctors = users.filter(user => user.role === 'doctor');
    const nurses = users.filter(user => user.role === 'nurse');
    const patient = users.filter(user => user._id === patientId);
    console.log(patient);

    const formData = {
        prescription: {
            type: 'text',
            label: 'Prescription',
            name: 'prescription',
            value: ''
        },
        intake: {
            type: 'number',
            label: 'Intake',
            name: 'intake',
            value: ''
        },
        occassionRate: {
            type: 'number',
            label: 'Enter how many times in an occasion',
            name: 'occassionRate',
            value: ''
        },
        occassion: {
            type: 'select',
            label: 'Occasion(how often)',
            name: 'occassion',
            value: '',
            options: ['daily', 'weekly', 'monthly', 'yearly']
        },
        spanRate: {
            type: 'number',
            label: 'Enter total period on drugs in Number',
            name: 'spanRate',
            value: ''
        },
        span: {
            type: 'select',
            label: 'span(total period unit)',
            name: 'span',
            value: '',
            options: ['days', 'weeks', 'months', 'years']
        },
        nurse: {
            type: 'select',
            label: 'nurse(to follow up)',
            name: 'nurseId',
            value: '',
            options: [...nurses]
        },
    };

    const onInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'nurseId') {
            setNurseData(value);
        } else if (name === 'prescription') {
            setPrescriptionData(value);
        } else {
            setDosageData((prevState) => {
                return {
                    ...prevState,
                    [name]: value
                };
            });
        }
        // console.log(e.target.value)
        setValidated(false);
    };
    const addExtra = (e) => {
        const data = [...drugData,
        {
            prescription: prescriptionData,
            dosage: dosageData
        }];
        setDrugData(data);
        console.log(data)
        document.getElementById('form').reset();
    }

    const consulted = (e) => {
        const data = {
            ...patient[0],
            toBeConsulted: false
        };
        console.log(data);
        toggleConsult(userDispatch, patient[0]._id, data);
        setMsg('Consult Completed');
        setErrors(null);
        history.push('/dashboard');
    }

    const handler = (e) => {
        // console.log("state");
        // alert(data);
        const drugs = [...drugData,
        {
            prescription: prescriptionData,
            dosage: dosageData
        }];
        setDrugData(drugs);

        const info = {
            ...data,
            // nurseId: nurseData ? nurseData : '',
            drugs: drugs
        };
        addDrug(dispatch, info);
        console.log(info);
        setValidated(true);
        e.preventDefault();
    };

    const showMe = () => {
        alert(data);
    };

    return (
        <div>
            <div className='text-left my-5 p-3 p-md-5 pt-md-0'>
                <h1 className="h1">Patient's Contact Info</h1>
                <h2 style={{ textTransform: 'capitalize' }}>Patient Name: {patient[0].fullName}</h2>
                <h3>Patient Phone: <a href={`tel:${patient[0].phone}`} className="text-decoration-none">{patient[0].phone}</a></h3>
                <h3>Patient Email: <a href={`mail:${patient[0].email}`} className="text-decoration-none">{patient[0].email}</a></h3>
                <Button variant="primary" className='m-2' type="button" onClick={consulted}>
                    Mark Consulted
                </Button>
                <h3>Prescribed: {drugData.length}</h3>
                <p className='ml-2 ml-md-4'>{drugData.map(pres => pres.prescription)}</p>
            </div>
            <Form noValidate validated={validated} id='form' className='text-left my-5' onSubmit={showMe}>
                {
                    msg && !errors ? <Alert variant="success">{msg}</Alert> :
                        (msg ? <Alert variant="danger">{msg}</Alert> : <Alert variant="primary">please fill the form to prescribe drugs</Alert>)
                }
                <Select key={formData.nurse.name} errors={errors} data={formData.nurse} getInput={onInputChange} />
                {
                    Object.entries(formData).map(field => {
                        if (field[1].type === 'select') {
                            if (field[1].name === 'nurseId') { return <></> } else {
                                return <Select key={field[0]} errors={errors} data={field[1]} getInput={onInputChange} />
                            }
                        }
                        else if (field[1].type === 'check') {
                            return <Check key={field[0]} errors={errors} data={field[1]} getInput={onInputChange} />
                        }
                        return <Input key={field[0]} errors={errors} data={field[1]} getInput={onInputChange} />
                    })
                }
                <Row>
                    <Col md={4}>
                        <Button variant="primary" className='m-2' type="button" onClick={addExtra}>
                            Add More
                        </Button>
                    </Col>
                    <Col md={{ span: 4, offset: 4 }}>
                        <Button variant="success" type="submit" className='m-2' onClick={handler}>
                            Submit all
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default PrescribeDrugs;