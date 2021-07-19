import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { updateUser, UsersDispatchContext } from "../contexts/users";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

const MyTable = (props) => {
  // console.log(props);
  const reKeys = Object.keys(props.data[0]);
  const length = Number(props.data.length);
  const dispatch = useContext(UsersDispatchContext);
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
                } else if (Array.isArray(val[1])) {
                  return (
                    <td key={val[0]}>
                      {val[1].map((index, detail) => `${index}. ${detail}`)}
                    </td>
                  );
                }
                return <td key={val[0]}>{val[1]}</td>;
              })}

              {/* <td>{value.userType? 'Admin' : 'customer'}</td> */}
              {props.edFunc && (
                <td>
                  <Link to={`/${props.edFunc}/${value._id}`}>
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
              {props.consult && (
                <td>
                  <Button
                    variant="primary"
                    type="button"
                    onClick={() => {updateUser(dispatch, value._id, {...value, toBeConsulted: false})}}
                  >
                    Consult
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
