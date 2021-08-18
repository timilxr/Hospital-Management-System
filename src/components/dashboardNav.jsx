import React, { useContext, useState } from 'react';
// import { Redirect } from 'react-router-dom';
import { Navbar as div, Nav, Button } from 'react-bootstrap';
import { signOut, AuthDispatchContext } from '../contexts/auth';
import { Link } from 'react-router-dom';

const DashNav = (props) => {
    const dispatch = useContext(AuthDispatchContext);
    const minwidth = 50;
    const maxwidth = 180;
    const [width, setWidth] = useState(minwidth);
    const [collapsed, setCollapsed] = useState(true);
    const [open, setOpen] = useState(false);
    const logout = async () => {
        await signOut(dispatch);
    }
    const trigger = () => {
        collapsed ? setWidth(maxwidth) : setWidth(minwidth);
        setCollapsed(!collapsed);
    }

    const notCheckedLink = <Nav.Link className='p-2'>
    <Link to='/prescriptions/notchecked' className="text-decoration-none text-light">
        <div className="d-flex">
            <div><i className={`fa fa-file-text me-3`} aria-hidden={true}></i>
            </div>
            <div><span className={collapsed ? 'd-none' : 'd-inline-flex'}>Not Checked Prescription</span></div>
        </div>
    </Link>
</Nav.Link>;
    const paidsLink = <Nav.Link className='p-2'>
    <Link to='/prescriptions/paid' className="text-decoration-none text-light">
        <div className="d-flex">
            <div><i className={`fa fa-file-text me-3`} aria-hidden={true}></i>
            </div>
            <div><span className={collapsed ? 'd-none' : 'd-inline-flex'}>Paid Prescription</span></div>
        </div>
    </Link>
</Nav.Link>
    const generalFilesLink = <Nav.Link className='p-2'>
    <Link to='/prescriptions' className="text-decoration-none text-light">
        <div className="d-flex">
            <div><i className={`fa fa-file-text me-3`} aria-hidden={true}></i>
            </div>
            <div><span className={collapsed ? 'd-none' : 'd-inline-flex'}>Prescription</span></div>
        </div>
    </Link>
</Nav.Link>
    const addUserLink = <Nav.Link className='p-2'>
    <Link to='/adduser' className="text-decoration-none text-light">
        <div className="d-flex">
            <div><i className={`fa fa-users me-2`} aria-hidden={true}></i>
            </div>
            <div><span className={collapsed ? 'd-none' : 'd-inline-flex'}>Add User</span></div>
        </div>
    </Link>
</Nav.Link>
    const accountantsLink = <Nav.Link className='p-2'>
    <Link to='/users/accountants' className="text-decoration-none text-light">
        <div className="d-flex">
            <div><i className={`fa fa-users me-2`} aria-hidden={true}></i>
            </div>
            <div><span className={collapsed ? 'd-none' : 'd-inline-flex'}>Accountants</span></div>
        </div>
    </Link>
</Nav.Link>
    const nursesLink = <Nav.Link className='p-2'>
    <Link to='/users/nurses' className="text-decoration-none text-light">
        <div className="d-flex">
            <div><i className={`fa fa-users me-2`} aria-hidden={true}></i>
            </div>
            <div><span className={collapsed ? 'd-none' : 'd-inline-flex'}>Nurses</span></div>
        </div>
    </Link>
</Nav.Link>
    const patientsLink = <Nav.Link className='p-2'>
    <Link to='/users/patients' className="text-decoration-none text-light">
        <div className="d-flex">
            <div><i className={`fa fa-wheelchair me-2`} aria-hidden={true}></i>
            </div>
            <div><span className={collapsed ? 'd-none' : 'd-inline-flex'}>Patients</span></div>
        </div>
    </Link>
</Nav.Link>
    const doctorsLink = <Nav.Link className='p-2'>
    <Link to='/users/doctors' className="text-decoration-none text-light">
        <div className="d-flex">
            <div><i className={`fa fa-users me-2`} aria-hidden={true}></i>
            </div>
            <div><span className={collapsed ? 'd-none' : 'd-inline-flex'}>Doctors</span></div>
        </div>
    </Link>
</Nav.Link>
    const usersLink = <Nav.Link className='p-2'>
    <Link to='/users' className="text-decoration-none text-light">
        <div className="d-flex">
            <div><i className={`fa fa-users me-2`} aria-hidden={true}></i>
            </div>
            <div><span className={collapsed ? 'd-none' : 'd-inline-flex'}>Users</span></div>
        </div>
    </Link>
</Nav.Link>


    return (
        <>
            {/* <div className='p-3'> */}
            <Nav bg="dark" onMouseOver={() => trigger()} onMouseOut={() => trigger()} className='flex-column text-white border-top border-secondary p-0 position-fixed top-0 start-0 bottom-0' style={{ width: `${width}px`, overflow: 'auto', zIndex: 1, transition: `width 1s`, background: 'rgba(20,20,20,0.6)', cursor: 'pointer' }}>
                <Nav.Link className='p-0 pt-2 d-md-none border-md-end border-secondary'>
                    <Button variant='success' size='sm' type='button' onClick={() => trigger()}><b>{'->'}</b></Button>
                </Nav.Link>
                {/* <h3 className="text-secondary">Nav</h3> */}
                <div>
                <Nav.Link className={collapsed ? 'd-none' : 'd-inline-flex' + `p-2 border-end border-secondary`}>
                    <Link to='/dashboard' className="text-decoration-none">
                        <h3>Dashboard</h3>
                    </Link>
                </Nav.Link>
                {
                    props.user.admin === true ?
                        <>
                            {usersLink}
                            {doctorsLink}
                            {patientsLink}
                            {nursesLink}
                            {accountantsLink}
                            {addUserLink}
                            {generalFilesLink}
                            {paidsLink}
                            {notCheckedLink}
                        </>
                        :
                        props.user.role === 'nurse' ? 
                        <>
                            {doctorsLink}
                            {patientsLink}
                            {nursesLink}
                            {generalFilesLink}
                            {notCheckedLink}
                        </> :
                        props.user.role === 'accountant' ?
                        <>
                            {patientsLink}
                            {accountantsLink}
                            {generalFilesLink}
                            {paidsLink}
                        </> 
                        : ''
                }
                <Nav.Link className='p-2'>
                    <Link to='/prescriptions/me' className="text-decoration-none text-light">
                        <div className="d-flex">
                            <div><i className={`fa fa-file-text me-3`} aria-hidden={true}></i>
                            </div>
                            <div><span className={collapsed ? 'd-none' : 'd-inline-flex'}>My Files</span></div>
                        </div>
                    </Link>
                </Nav.Link>
                <Nav.Link className='p-1'>
                    <Button className={collapsed ? 'd-none' : 'd-inline-flex'} variant='danger' type='button' onClick={logout}>Logout</Button>
                </Nav.Link>
                </div>
            </Nav>

        </>
    )
}

export default DashNav;