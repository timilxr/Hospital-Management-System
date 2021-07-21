import React, {useContext} from 'react';
// import { Redirect } from 'react-router-dom';
import { Navbar as div, Nav, Button } from 'react-bootstrap';
import { signOut, AuthDispatchContext } from '../contexts/auth';
import { Link } from 'react-router-dom';

const DashNav = () => {
    const dispatch = useContext(AuthDispatchContext);

    const logout = async () => {
        await signOut(dispatch);
    }

    return (
        <div bg="dark" className='position-sticky text-white top-0 start-0 border-top border-secondary'>
            {/* <div className='p-3'> */}
                <Nav className='flex-column'>
                <Nav.Link>
                    <Link to='/dashboard' className="text-decoration-none">
                <h3>Dashboard</h3>
                    </Link>
                </Nav.Link>
                </Nav>
            {/* </div> */}
            <Nav defaultActiveKey="/home" className="flex-column">
                
                <Nav.Link>
                <Link to='/' className="text-decoration-none">Active
                </Link>
                </Nav.Link>
                <Nav.Link>
                <Link to='/prescription' className="text-decoration-none">Prescription
                </Link>
                </Nav.Link>
                <Nav.Link>
                <Link to='/users' className="text-decoration-none">Users
                </Link>
                </Nav.Link>
                <Nav.Link>
                <Link to='/' className="text-decoration-none" disabled>All
                </Link>
                </Nav.Link>
                <Nav.Link>
                <Button variant='danger' type='button' onClick={logout}>Logout</Button>
                </Nav.Link>
            </Nav>

        </div>
    )
}

export default DashNav;