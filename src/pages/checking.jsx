import React, { useState, useEffect, useContext } from 'react';
import { DrugsDispatchContext, DrugsStateContext, updateDrug } from '../contexts/drugs';
import Loading from '../components/loading';
import { useParams } from 'react-router-dom';
import { Form, Button, Alert, Table } from 'react-bootstrap';
import Input from '../components/form-controls/input';
import Check from '../components/form-controls/check';


const Checking = ({ ...props }) => {
  const { drugId } = useParams();
  const dispatch = useContext(DrugsDispatchContext);
  const { drugs: holder, loaded } = useContext(DrugsStateContext);
  console.log(holder);

  const [errors, setErrors] = useState({});
  const [color, setColor] = useState(null);
  const [msg, setMsg] = useState('');
  const [validated, setValidated] = useState(false);
  if (!loaded) {
    return <Loading />
  }
  if (!holder) {
    setColor('danger');
    setMsg('an Error occured during update');
    setErrors({
      error: 'no update'
    });
    return <div>
      {
        // msg && !errors ? <Alert variant="success">{msg}</Alert> :
          msg ? <Alert variant={color}>{msg}</Alert> : <Alert variant="primary">please fill the form</Alert>
      }
    </div>
  }


  const drug = holder.filter(drug => drug._id === drugId);
  const reKeys = Object.keys(drug[0].drugs[0]);

  const onInputChange = (e, index) => {
    const { name, value } = e.target;
    const holding = drug[0];
    holding.drugs[index] = {
      ...drug[0].drugs[index],
      [name]: value
    };
    holding.checked = true;
    holding.accountant_id = props.user._id;
    holding.total_price = holding.drugs.map(drug => Number(drug.price)).reduce((prev, curr) => prev + curr, 0);

    console.log(holding);
    setValidated(false);
  };


  const handler = (e) => {
    updateDrug(dispatch, drugId, drug[0]);
    console.log(drug);
    setColor('success');
    setMsg('Drug Updated');
    setValidated(true);
    e.preventDefault();
  };



  return <div>
    <Form noValidate validated={validated} className='text-left my-5'>
      {
        // msg && !errors ? <Alert variant="success">{msg}</Alert> :
          msg ? <Alert variant={color}>{msg}</Alert> : <Alert variant="primary">please fill data where applicable</Alert>
      }
      <Table striped bordered hover responsive variant="dark">
        <thead>
          <tr>
            <th>#</th>
            {reKeys.map(key =>{
              // if(key === 'available'){
              // <th key={key}>{key.toUpperCase()}?</th>
              // } else {
            switch(key){
              case '_id':
                key = key.replace('_', ' ');
                return <th key={key}>{key.toUpperCase()}</th>;
              case 'available':
                return <th key={key}>{key.toUpperCase()}?</th>
              case 'price':
                return <th key={key} className='px-5'>{key.toUpperCase()}&nbsp;(#)</th>;
              default:
                key = key.replaceAll('_', ' ');
                return <th key={key}>{key.toUpperCase()}</th>
            }
          }
          )}
          </tr>
        </thead>
        <tbody>
          {drug[0].drugs.map((value, index) => {
            const mainIndex = index;
            return (
              <tr key={index} className="text-center">
                <td>{index + 1}</td>

                {Object.entries(value).map((val, index) => {
                  if (val[0] === "dosage") {
                    return (<td key={val[0]}>
                      {Object.entries(val[1]).map(detail => {
                        return (
                          <p key={detail[0]}>
                            <b>{detail[0]}</b> : <span>{detail[1]}</span>
                          </p>
                        )
                      })}
                    </td>);
                  } else if (typeof val[1] === 'boolean') {
                    return val[0] === 'available' ?
                      <td key={val[0]}>
                        <Check errors={errors} number={mainIndex} data={{ type: 'check', label: 'Check this if available', name: 'available', checked: val[1] }} getInput={onInputChange} />
                        {console.log('hi')}
                      </td>
                      :
                      (val[1] === true ? <td key={val[0]}>Yes</td> : <td key={val[0]}>{console.log('him')}No</td>);
                  } else if (val[0] === 'price') {
                    return <td key={val[0]} width='200px'>
                      <Input errors={errors} number={mainIndex} data={{ type: 'number', label: 'Enter Price', name: 'price', value: val[1] }} getInput={onInputChange} />
                    </td>
                  }
                  return <td key={val[0]}>{val[1]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button variant="success" type="submit" onClick={handler}>
        Submit
      </Button>
    </Form>
  </div>
}

export default Checking;