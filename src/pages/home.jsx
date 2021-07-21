import React from 'react';
import { Link } from 'react-router-dom';

const Home = (props) => {
    return (
        <div>
            <center className='position-absolute top-50 start-50 translate-middle'>
                <h1>Welcome to HOS</h1>
                <p className="lead">
                    kindly <Link to="auth"> Login</Link> to continue.
                </p>
            </center>
        </div>
    )
}

export default Home;