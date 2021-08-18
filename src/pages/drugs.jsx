import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/loading';
import { DrugsDispatchContext, DrugsStateContext, getDrugs, removeDrug } from '../contexts/drugs';
import Alert from 'react-bootstrap/Alert'
import Table from '../components/myTable';

const DrugRecords = (props) => {
    const { drugCategory: category } = useParams();
    const { drugs, loaded } = useContext(DrugsStateContext);
    const dispatch = useContext(DrugsDispatchContext);
    let nurseNotChecked, toBeConsulteds, accountantNotChecked, paids, myDrugs;
    useEffect(() => {
        getDrugs(dispatch);
    }, []);
    if (loaded) {
        toBeConsulteds = drugs.filter(drug => drug.to_be_consulted === true );
        nurseNotChecked = drugs.filter(drug => (drug.last_checked_by === '' || !drug.last_checked_by) && drug.to_be_consulted === true);
        // doctorNotChecked = drugs.filter(drug => drug.checked === 'nurse');
        accountantNotChecked = drugs.filter(drug => drug.last_checked_by === 'doctor');
        paids = drugs.filter(drug => (drug.total_price_paid != 0) && (drug.total_price_paid === drug.total_price));
        myDrugs = drugs.filter(drug => drug.patient_id === props.user._id);
    }
    let data = (category === 'notchecked') ? (
        props.user.role === 'nurse' ? nurseNotChecked : props.user.role === 'accountant' ? accountantNotChecked : []
    )
    : (category === 'tobeconsulted') ? (
        props.user.role === 'nurse' || props.user.role === 'doctor' ? toBeConsulteds : []
    )
    : (category === 'paid') ? paids
    : (category === 'me') ? myDrugs
    : drugs;
    data = props.user.admin ? drugs : data;
    // data = data.map(file=>{
    //     const output = [...file.drugs];
    //     console.log(output);
    //     return output;
    // });
    console.log(data);
    const [msg, setMsg] = useState('');


    const delData = (g) => {
        removeDrug(dispatch, g);
    }

    if (!loaded) {
        return <Loading />
    }

    return (
        <div className='mt-4'>
            {msg ? <Alert variant="success">{msg}</Alert> : ''}

            {data.length > 0 ?
                (props.user.admin ?
                    (props.user.role === 'doctor' ?
                        <Table data={drugs} status='doctor' consult={true} delFunc={delData} />
                        :
                        <Table data={drugs} delFunc={delData} />)
                    :
                    (props.user.role === 'accountant' ?
                        <Table data={data} status='accountant' />
                        :
                        (props.user.role === 'nurse') ?
                        <Table data={data} status='nurse' />
                        :
                        (props.user.role === 'doctor') ?
                        <Table data={data} consult={true} status='doctor' />
                        :
                        <Table data={data} />))
                : <h1>No Data in The Table</h1>
            }
        </div>
    );
};

export default DrugRecords;