import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
    AuthStateContext,
    AuthDispatchContext,
    signOut
} from "../contexts/auth";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

const Header = () => {
    const { isLoggedIn, user } = useContext(AuthStateContext);
    const dispatch = useContext(AuthDispatchContext);

    const logout = async () => {
        await signOut(dispatch);
    }

    return (
        <div className="container-fluid bg-dark">
            <Navbar bg="dark" variant="dark" expand="md">
                {/* <Navbar.Brand>
                    <Link className='text-decoration-none text-white' to="/">
                        <strong>H.M.S</strong>
                    </Link>
                </Navbar.Brand> */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" className='bg-light ms-auto' />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-md-auto">
                        <Nav.Link><Link className='text-decoration-none text-white' to={isLoggedIn? '/dashboard': '/'}>Home</Link></Nav.Link>

                        {isLoggedIn ? (
                            user.isAdmin === true ? <Nav className="ms-md-auto">
                                <Nav.Link><Link className='text-decoration-none text-white' to='/adduser'>Add User</Link></Nav.Link>
                                <Nav.Link><Link className='text-decoration-none text-white' to='/users'>View Users</Link></Nav.Link>
                                <Nav.Link><Link className='text-decoration-none text-white' to='/prescriptions'>View Prescriptions</Link></Nav.Link>
                                
                                </Nav> : (user.role === 'doctor' ? <Nav className="ms-md-auto">
                                <Nav.Link><Link className='text-decoration-none text-white' to='/users/patients'>All Patients</Link></Nav.Link>
                                <Nav.Link><Link className='text-decoration-none text-white' to='/users/tobeconsulted'>To Be Consulted Patients</Link></Nav.Link>
                                <Nav.Link><Link className='text-decoration-none text-white' to='/prescriptions'>All Prescriptions</Link></Nav.Link>
                                
                                </Nav> : '')
                        ) : <Nav.Link><Link className='text-decoration-none text-white' to='/auth'>Login</Link></Nav.Link>}
                    </Nav>
                    {isLoggedIn ? (
                        <Nav>
                        <Nav.Link>
                        <Button variant='danger' size='sm' type='button' onClick={logout}>Logout</Button>
                    </Nav.Link>
                        </Nav>
                    ): ''}
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header;