import React, { useState, useEffect, useContext } from 'react';
import Loading from '../components/loading';
import { DrugsDispatchContext, DrugsStateContext, getDrugs, removeDrug } from '../contexts/drugs';
import Alert from 'react-bootstrap/Alert'
import Table from '../components/myTable';

const MyDrugRecords = (props) => {
    const { drugs, loaded } = useContext(DrugsStateContext);
    const myDrugs = drugs.filter(drug => drug.patientId !== props.user._id);
    const dispatch = useContext(DrugsDispatchContext);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        getDrugs(dispatch);
    }, []);

    const delData = (g) => {
        removeDrug(dispatch, g);
    }

    if (!loaded) {
        return <Loading />
    }

    return (
        <div>
            {msg ? <Alert variant="success">{msg}</Alert> : ''}

            {myDrugs.length > 0 ?
                <Table data={myDrugs} delFunc={delData} />
                : <h1>No Data in The Table</h1>
            }
        </div>
    );
};

export default MyDrugRecords;