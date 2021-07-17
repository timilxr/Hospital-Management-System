import React from 'react';
import { Link } from 'react-router-dom';
// import Card from 'react-bootstrap';

const Home = (props) => {
    return (
        <div>
            <h1>Welcome to HOS</h1>
            <p className="lead">
                kindly <Link to="auth"> Login</Link> to continue.
            </p>
        </div>
    )
}

export default Home;