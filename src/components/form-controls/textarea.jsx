import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';


const TextArea = (props) => {
    const [check, setCheck] = useState(props.data.value);
    const toggle = (e) => {
        props.number >= 0 ?
            props.getInput({...e}, props.number)
            :
            (props.data.type === 'number' ?
            props.getInput({...e, target: {...e.target, value: Number(e.target.value), name: props.data.name}})
            :
            props.getInput({...e}));
        console.log({...e});
        setCheck(e.target.value);
    }
    // console.log(props.errors[props.data.name]);
    return(
        <Form.Group controlId={`formBasic${props.data.label}`}>
            <Form.Label>{props.data.label}</Form.Label>
            {
                props.data.value ?
                <Form.Control name={props.data.name} as='text-area' onChange={toggle} value={check} type={props.data.type} placeholder={`Enter your ${props.data.label}`} required isInvalid={props.errors[props.data.name]} />
                :
                <Form.Control name={props.data.name} as='textarea' onChange={toggle} type={props.data.type} placeholder={`Enter your ${props.data.label}`} required isInvalid={props.errors[props.data.name]} />
            }
            <Form.Control.Feedback type="invalid">{props.errors[props.data.name]}</Form.Control.Feedback>
        </Form.Group>
    )
}

export default TextArea;