import React from 'react';
import { Navbar as div, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DashNav = (props) => {
    return (
        <div bg="dark" className='position-sticky text-white top-0 start-0 border-top border-secondary'>
            {/* <div className='p-3'> */}
                <Nav className='flex-column'><Link to='/' class="text-decoration-none">
                <Nav.Link>
                <h3>Dashboard</h3>
                </Nav.Link>
                </Link>
                </Nav>
            {/* </div> */}
            <Nav defaultActiveKey="/home" className="flex-column">
                
                <Nav.Link>
                <Link to='/' class="text-decoration-none">Active
                </Link>
                </Nav.Link>
                <Nav.Link>
                <Link to='/dashboard/priscription' class="text-decoration-none">Priscription
                </Link>
                </Nav.Link>
                <Nav.Link>
                <Link to='/' class="text-decoration-none" disabled>All
                </Link>
                </Nav.Link>
            </Nav>

        </div>
    )
}

export default DashNav;