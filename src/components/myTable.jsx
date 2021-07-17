import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

const MyTable = (props) => {
  // console.log(props);
  const reKeys = Object.keys(props.data[0]);
  const length = Number(props.data.length);
  // console.log(length);
  return length < 1 ? (
    <h1>Loading</h1>
  ) : (
    <Table striped bordered hover responsive variant="dark" className="mt-4">
      <thead>
        <tr>
          <th>#</th>
          {reKeys.map((key) => (
            <th key={key}>{key.toUpperCase()}</th>
          ))}
          {props.edFunc ? <th></th> : ""}
          {props.delFunc ? <th></th> : ""}
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
                }
                return <td key={val[0]}>{val[1]}</td>;
              })}

              {/* <td>{value.userType? 'Admin' : 'customer'}</td> */}
              {props.edFunc && (
                <td>
                  <Link to={`/admin/${props.edFunc}/${value._id}`}>
                    <Button variant="info" type="button">
                      Edit
                    </Button>
                  </Link>
                </td>
              )}
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
          );
        })}
      </tbody>
    </Table>
  );
};

export default MyTable;
