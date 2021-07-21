import React from 'react';
import Form from 'react-bootstrap/Form';


const Select = (props) => {
    return(
        <Form.Group controlId="formBasicUserType">
            <Form.Label>{props.data.label}</Form.Label>
            <Form.Control as='select' className='w-100' name={props.data.name} error={props.errors[props.data.name]} defaultValue={props.data.value !== '' ? props.data.value : props.data.options[0]} onChange={props.getInput} custom>
                <option key={props.data.name} value={props.data.value !== '' ? props.data.value : props.data.options[0]} disabled>
                    {props.data.value !== '' ? props.data.value : `Select ${props.data.label}`}
                </option>
                {
                    props.data.name === 'nurseId' ? 
                    props.data.options.map(option => <option key={option} value={option._id}>{option.name}</option>)
                    :
                    props.data.options.map(option => <option key={option} value={option}>{option}</option>)
                }
            </Form.Control>
        </Form.Group>
    )
}

export default Select;