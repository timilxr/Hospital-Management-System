import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';


const Check = (props) => {
    const [check, setCheck] = useState(props.data.checked);
    // useEffect(()=>{
    //     setCheck(props.data.checked)
    //     console.log(props.data.checked)
    // }, [])
    const toggle = (e) => {
        props.number >= 0 ?
            props.getInput({...e, target:{...e.target, value: !check, name: props.data.name}}, props.number)
            :
            props.getInput({...e, target:{...e.target, value: !check, name: props.data.name}});
        console.log({...e, target: {...e.target, value: !check, name: props.data.name}});
        setCheck(prevState=> !prevState);
    }
    return(
        <Form.Group controlId="formBasicUserType">
            <Form.Check type="checkbox" id={`${props.data.name}`}>
                {/* {props.data.checked === true ? */}
                <Form.Check.Input checked={check} name={props.data.name} onChange={toggle} type="checkbox" isValid />
                {/* // : */}
                {/* // <Form.Check.Input checked={checked} name={props.data.name} onChange={toggle} type="checkbox" isValid /> */}
                {/* // } */}
                <Form.Check.Label>{props.data.label}</Form.Check.Label>
            </Form.Check>
        </Form.Group>
    )
}

export default Check;