import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
    AuthStateContext
} from "../contexts/auth";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {
    const { isLoggedIn, user } = useContext(AuthStateContext);

    return (
        <div className="container-fluid p-0">
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand>
                    <Link className='text-decoration-none text-white' to="/">
                        <strong>H.M.S</strong>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-md-auto">
                        <Nav.Link><Link className='text-decoration-none' to='/'>Home</Link></Nav.Link>

                        {isLoggedIn ? (
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                {user.isAdmin === true ? <NavDropdown.Item><Link className='text-decoration-none text-white' to='/adduser'>Add User</Link></NavDropdown.Item> : ''}
                                <NavDropdown.Item><Link className='text-decoration-none text-white' to='/users'>View Users</Link></NavDropdown.Item>
                                <NavDropdown.Item><Link className='text-decoration-none text-white' to='/prescriptions'>View Prescriptions</Link></NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        ) : <Nav.Link><Link className='text-decoration-none text-white' to='/auth'>Login</Link></Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header;