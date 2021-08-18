import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { updateUser, UsersDispatchContext, UsersStateContext } from "../contexts/users";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import {MDBBtn, MDBBtnGroup} from 'mdb-react-ui-kit';

const Preview = (props) => {
  const headings = props.headings;
  let users = props.data;
  const [data, setData] = useState(users);
  const [position, setPosition] = useState(null);
  console.log(data);
  console.log(position);
  const length = Number(props.data.length);

  const filterUsers = (item) => {
    let result = props.data.filter(row=>row['role'] === item);
    setPosition(item);
    return setData(result);
  }

  useEffect(()=>{
    setPosition('users');
    setData(props.data);
  }, [props.data])

  const userFilterButtons = 
  <>
  <MDBBtnGroup aria-label='Basic example'>
          <MDBBtn onClick={() => {setData(props.data); setPosition('users')}} active={ position === 'users' }>All</MDBBtn>
          <MDBBtn onClick={() => filterUsers('doctor')} active={ position === 'doctor' }>Doctors</MDBBtn>
          <MDBBtn onClick={() => filterUsers('patient')} active={ position === 'patient' }>Patients</MDBBtn>
          <MDBBtn onClick={() => filterUsers('nurse')} active={ position === 'nurse' }>Nurses</MDBBtn>
          <MDBBtn onClick={() => filterUsers('accountant')} active={ position === 'accountant' }>Accountant</MDBBtn>
        </MDBBtnGroup>
  </>;

  return length < 1 ? (
    <h1>No data</h1>
  ) : (
    <div className="container-fluid p-0">
      <div className="p-2 text-end mt-3">
        {userFilterButtons}
      </div>
        <Table striped bordered hover responsive variant="dark" className="container-fluid m-0 mb-5 p-0">
      <thead>
        <tr>
          <th>#</th>
          {headings.map(key =>{
            switch(key){
              case '_id':
                key = key.replace('_', ' ');
                return <th key={key}>{key.toUpperCase()}</th>
              default:
                key = key.replaceAll('_', ' ');
                return <th key={key}>{key.toUpperCase()}</th>
            }
          })}
          {props.content === 'users' ? <th>FolderId</th> : ''}
        </tr>
      </thead>
      <tbody>
        {data.map((value, index) => {
          return (
            <tr key={index} className="text-center">
              <td>{index + 1}</td>
              {/* <td key={value}>{value}</td>; */}

              {Object.entries(value).map((val) => {
                if (val[0] === "createdAt" || val[0] === "updatedAt") {
                  return <td key={val[0]}>{new Date(val[1]).toString()}</td>;
                } else if (typeof val[1] === typeof []) {
                  return val[1].length < 1 ? <td key={val[0]}>None</td> :
                  (
                    <td key={val[0]}>
                      {val[1].map((detail, index) => {
                      console.log(val[1]);
                        Object.values(detail).map(valu => {
                          return <span>{valu}</span>
                        })
                      })}
                    </td>
                  );
                } else if (typeof val[1] === 'boolean') {
                  return val[1] === true ? <td key={val[0]}>Yes</td> : <td key={val[0]}>No</td>
                } else if (val[1] === '') {
                  return val[1] === '' ? <td key={val[0]}>No</td> : <td key={val[0]}>{val[1]}</td>
                } 
                return <td key={val[0]}>{val[1]}</td>;
              })}
            </tr>
          )
        })}
      </tbody>
    </Table>
    </div>
  );
};

export default Preview;
