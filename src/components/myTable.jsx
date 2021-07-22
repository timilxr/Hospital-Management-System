import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import { updateUser, UsersDispatchContext, UsersStateContext } from "../contexts/users";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

const MyTable = (props) => {
  const reKeys = Object.keys(props.data[0]);
  const length = Number(props.data.length);
  return length < 1 ? (
    <h1>Loading</h1>
  ) : (
    <Table striped bordered hover responsive variant="dark" className="container-fluid m-0 p-0">
      <thead>
        <tr>
          <th>#</th>
          {reKeys.map((key) => (
            <th key={key}>{key.toUpperCase()}</th>
          ))}
          {props.edFunc ? <th></th> : ""}
          {props.delFunc ? <th></th> : ""}
          {props.consult ? <th></th> : ""}
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
                } else if (Array.isArray(val[1])) {
                  return (
                    <td key={val[0]}>
                      {val[1].map((detail, index) => {
                        Object.values(detail).map(valu => {
                          console.log(valu);
                          return <span>{valu}</span>
                        })
                      })}
                    </td>
                  );
                } else if (typeof val[1] === 'boolean') {
                  return val[1] === true ? <td key={val[0]}>Yes</td> : <td key={val[0]}>No</td>
                } 
                return <td key={val[0]}>{val[1]}</td>;
              })}

              {props.consult && (
                <td>
                  <Link to={`/consulting/${value._id}`}>
                    <Button variant="primary" type="button">
                      Consult
                    </Button>
                  </Link>
                </td>
              )}
              {props.check && (
                <td>
                  <Link to={`/check/${value._id}`}>
                    <Button variant="primary" type="button">
                      Check
                    </Button>
                  </Link>
                </td>
              )}
              {props.edFunc ? (
                <td>
                  <Link to={`/${props.edFunc}/${value._id}`}>
                    <Button variant="info" type="button">
                      Edit
                    </Button>
                  </Link>
                </td>
              ) : ''}
              {props.delFunc && (
                <td>
                  <Button
                    variant="danger"
                    type="button"
                    onClick={() => props.delFunc(value._id)}
                  >
                    Delete
                  </Button>
                </td>
              )}
            </tr>
          )
        })}
      </tbody>
    </Table>
  );
};

export default MyTable;
