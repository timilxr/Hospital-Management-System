import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import { updateUser, UsersDispatchContext, UsersStateContext } from "../contexts/users";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

const MyTable = (props) => {
  const reKeys = props.data.length > 0 ? Object.keys(props.data[0]) : ['Message'];
  const length = Number(props.data.length);
  return length < 1 ? (
    <h1>No Data</h1>
  ) : (
    <Table striped bordered hover responsive variant="dark" className="container-fluid m-0 mb-5 p-0">
      <thead>
        <tr>
          <th>#</th>
          {reKeys.map(key =>{
            switch(key){
              case '_id':
                key = key.replace('_', ' ');
                return <th key={key}>{key.toUpperCase()}</th>
              default:
                key = key.replaceAll('_', ' ');
                return <th key={key}>{key.toUpperCase()}</th>
            }
          })}
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((value, index) => {
          return (
            <tr key={index} className="text-center">
              <td>{index + 1}</td>

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

              {(props.status === 'doctor' && value.to_be_consulted === true) ? (
                <td>
                  <Link to={`/consulting/${value._id}`}>
                    <Button variant="primary" type="button">
                      Consult
                    </Button>
                  </Link>
                </td>
              ): <td></td>}
              {(props.status === 'nurse') ? (
                <td>
                  <Link to={`/recordvitals/${value._id}`}>
                    <Button variant="primary" type="button">
                      Record Vitals
                    </Button>
                  </Link>
                </td>
              ): <td></td>}
              {props.status === 'accountant' ? (
                <td>
                  <Link to={`/check/${value._id}`}>
                    <Button variant="primary" type="button">
                      Check
                    </Button>
                  </Link>
                </td>
              ): <td></td>}
              {props.edFunc ? (
                <td>
                  <Link to={`/${props.edFunc}/${value._id}`}>
                    <Button variant="info" type="button">
                      Edit
                    </Button>
                  </Link>
                </td>
              ) : <td></td>}
              {props.delFunc ? (
                <td>
                  <Button
                    variant="danger"
                    type="button"
                    onClick={() => props.delFunc(value._id)}
                  >
                    Delete
                  </Button>
                </td>
              ): <td></td>}
            </tr>
          )
        })}
      </tbody>
    </Table>
  );
};

export default MyTable;
