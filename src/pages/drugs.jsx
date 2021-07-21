import React, {useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/loading';
import { DrugsDispatchContext, DrugsStateContext, getDrugs, removeDrug } from '../contexts/drugs';
import Alert from 'react-bootstrap/Alert'
import Table from '../components/myTable';
// import axios from 'axios';
// import { usersData } from '../../../backend/data';

const DrugRecords = (props) => {
    const {drugCategory: category} = useParams();
    const {drugs, loaded} = useContext(DrugsStateContext);
    let notCheckeds, paids, myDrugs;
    if (loaded){
    notCheckeds = drugs.filter(drug=>drug.checked === false);
    paids = drugs.filter(drug=>(drug.totalPricePaid != 0) && (drug.totalPricePaid === drug.totalPrice));
    myDrugs = drugs.filter(drug=>drug.patientId === props.user._id);
    }
    const data = (category === 'notchecked') ? notCheckeds
    : (category === 'paid') ? paids
    : (category === 'me') ? myDrugs
    : drugs;
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
                    (props.user.isAdmin ?
                        (props.user.role === 'accountant' ?
                        <Table data={data} check='checking' edFunc="editUser" consult={true} delFunc={delData} />
                        :
                        <Table data={data}  delFunc={delData} />)
                        :
                        (props.user.role === 'accountant' ?
                        <Table data={data} check='checking' />
                        :
                        <Table data={data} />))
                    // "table"
                : <h1>No Data in The Table</h1>
                }
            </div>
    );
};

export default DrugRecords;