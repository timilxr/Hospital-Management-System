import React from 'react';
import Form from 'react-bootstrap/Form';


const Check = (props) => {
    return(
        <Form.Group controlId="formBasicUserType">
            <Form.Check type="radio" id={`props.data.value`}>
                <Form.Check.Input type="radio" isValid />
            </Form.Check>
            <Form.Check.Label>{props.data.label}</Form.Check.Label>
            {/* <Form.Control name={props.data.name} error={props.errors[props.data.name]} defaultValue={props.data.value !== '' ? props.data.value : props.data.options[0]} onChange={props.getInput} as={props.data.type} custom>
                <option value={props.data.value !== '' ? props.data.value : props.data.options[0]} disabled>
                    {props.data.value !== '' ? props.data.value : `Select ${props.data.label}`}
                </option>
                {
                    props.data.options.map(option => <option key={option} value={option}>{option}</option>)
                }
            </Form.Control> */}
        </Form.Group>
    )
}

export default Check;