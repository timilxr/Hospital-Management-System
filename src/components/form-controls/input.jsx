import React from 'react';
import Form from 'react-bootstrap/Form';


const Input = (props) => {
    console.log(props.errors[props.data.name]);
    return(
        <Form.Group controlId={`formBasic${props.data.label}`}>
            <Form.Label>{props.data.label}</Form.Label>
            {
                props.data.value ?
                <Form.Control name={props.data.name} onChange={props.getInput} value={props.data.value} type={props.data.type} placeholder={`Enter your ${props.data.label}`} required isInvalid={props.errors[props.data.name]} />
                :
                <Form.Control name={props.data.name} onChange={props.getInput} type={props.data.type} placeholder={`Enter your ${props.data.label}`} required isInvalid={props.errors[props.data.name]} />
            }
            <Form.Control.Feedback type="invalid">{props.errors[props.data.name]}</Form.Control.Feedback>
        </Form.Group>
    )
}

export default Input;