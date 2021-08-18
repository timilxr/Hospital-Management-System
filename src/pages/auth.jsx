import React, { useState, useContext } from 'react';
import { AuthStateContext } from '../contexts/auth';
import Loading from '../components/loading';
import { useHistory } from 'react-router-dom';
import { SignIn, SignUp } from '../components/authComponent';
import { Row, Col } from 'react-bootstrap';

const AuthPage = (props) => {
    const history = useHistory();
    const { loading, isLoggedIn } = useContext(AuthStateContext);
    const [newUser, setNewUser] = useState(true);

    isLoggedIn && history.push('/dashboard');

    const handleUser = () => {
        setNewUser(!newUser);
    }

    const message = <center className='pt-5'>
        <h1>Sign in for easier access to medical care</h1>
    </center>;
    if (loading) {
        return <Loading />
    }
    return (
        <div>
            <h1 className='ms-3 ms-md-4'>Welcome to HOS</h1>
            <Row>
                <Col sm={true}>
                    <div className='pt-5 my-5'>
                    {message}
                    </div>
                </Col>
                <Col sm={true}>
                    {newUser ? <SignUp toggler={handleUser} /> : <SignIn toggler={handleUser} />}
                </Col>
            </Row>
        </div>
    )
}

export default AuthPage;