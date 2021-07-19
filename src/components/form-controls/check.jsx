import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';


const Check = (props) => {
    const [check, setCheck] = useState(props.data.value);
    const toggle = (e) => {
        props.getInput({...e, target:{...e.target, value: check}});
        // console.log({...e, target:{...e.target, value: check}});
        setCheck(prevState=> !prevState);
    }
    return(
        <Form.Group controlId="formBasicUserType">
            <Form.Check type="checkbox"id={`props.data.value`}>
                <Form.Check.Input checked={check} name={props.data.name} onChange={toggle} type="checkbox" isValid />
                <Form.Check.Label>{props.data.label}</Form.Check.Label>
            </Form.Check>
        </Form.Group>
    )
}

export default Check;