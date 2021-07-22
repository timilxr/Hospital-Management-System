import React, { useContext } from "react";
import { Row, Col, Button, Jumbotron as div } from "react-bootstrap";
import DashNav from "../components/dashboardNav";
import Loading from "../components/loading";
import {
  AuthStateContext,
  AuthDispatchContext,
} from "../contexts/auth";
import { toggleConsult, UsersDispatchContext } from "../contexts/users";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn, loaded, user } = useContext(AuthStateContext);
  const userDispatch = useContext(UsersDispatchContext);

  const request = () => {
    let newuser = {
      ...user,
      toBeConsulted: !user.toBeConsulted,
    };
    toggleConsult(userDispatch, user._id, newuser);
  };

  if (!loaded) {
    return <Loading />;
  }

  return <Route
    {...rest}
    render={(props) => {
      if (isLoggedIn) {
        return (
          <div className="container-fluid">
            <Row>
              {/* <Col xs={5} sm={3} md={3} variant="dark" className="bg-dark px-0">
                <DashNav user={user} />
              </Col> */}
              {/* <Col xs={7} sm={9} md={9} className="bg-light bg-gradient ml-0"> */}
                <div className="p-2 pt-3 pt-md-5 ps-md-4">
                  <h3 className="mb-3" style={{ textTransform: "capitalize" }}>
                    Welcome {user.fullName}
                  </h3>
                  {!user.toBeConsulted ? (
                    <Button variant="info" onClick={request}>
                      Request Consultation
                    </Button>
                  ) : (
                    <h4 className="h4">Awaiting Consultation</h4>
                  )}
                  <Component {...props} user={user} />
                </div>
              {/* </Col> */}
            </Row>
          </div>
        );
      } else {
        return <Redirect to="/" />;
      }
    }}
  />;

};

export default ProtectedRoute;
