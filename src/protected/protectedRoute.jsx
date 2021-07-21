import React, { useContext } from "react";
import { Row, Col, Button, Jumbotron as div } from "react-bootstrap";
import DashNav from "../components/dashboardNav";
import Loading from "../components/loading";
import {
  AuthStateContext,
  AuthDispatchContext,
  requestConsult,
} from "../contexts/auth";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn, loaded, user } = useContext(AuthStateContext);
  const dispatch = useContext(AuthDispatchContext);
  //  useEffect(()=>{
  //      authenticateUser(dispatch);
  //  }, [dispatch])

  const request = () => {
    let newuser = {
      ...user,
      toBeConsulted: true,
    };
    requestConsult(dispatch, newuser);
  };
  
  if (!loaded) {
    // console.log(isLoggedIn, 'me');
    return <Loading />;
  }
  
  // console.log(isLoggedIn);
  return <Route
  {...rest}
    render={(props) => {
      if (isLoggedIn) {
        return (
          <div className="container-fluid">
            <Row>
              <Col xs={5} md={3} variant="dark" className="bg-dark px-0">
                <DashNav user={user} />
              </Col>
              <Col xs={7} md={9} className="bg-light bg-gradient ml-0">
                <div className="p-2 pt-3 pt-md-5">
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
              </Col>
            </Row>
          </div>
        );
      } else {
        return <Redirect to="/" />;
      }
    }}
  />;

  // return "Hello world";
};

export default ProtectedRoute;
