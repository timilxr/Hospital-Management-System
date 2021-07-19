import React, {useState, useEffect, useContext} from 'react';
import Loading from '../components/loading';
import { DrugsDispatchContext, DrugsStateContext, getDrugs, removeDrug } from '../contexts/drugs';
import Alert from 'react-bootstrap/Alert'
import Table from '../components/myTable';
// import axios from 'axios';
// import { usersData } from '../../../backend/data';

const DrugRecords = (props) => {
    const {drugs, loaded} = useContext(DrugsStateContext);
    const dispatch = useContext(DrugsDispatchContext);
    const [msg, setMsg] = useState('');

    useEffect(()=>{
        getDrugs(dispatch);
    }, []);

    const delData = (g) => {
        removeDrug(dispatch, g);
    }

    if(!loaded){
        return <Loading />
    }

    return(
            <div>
                {msg ? <Alert variant="success">{msg}</Alert> : ''}
                
                {drugs.length > 0 ?
                    <Table data={drugs} delFunc={delData} />
                    // "table"
                : <h1>No Data in The Table</h1>
                }
            </div>
    );
};

export default DrugRecords;