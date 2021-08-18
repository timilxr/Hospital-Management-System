import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Button, Jumbotron as div } from "react-bootstrap";
import DashNav from "../components/dashboardNav";
import Loading from "../components/loading";
import {
  AuthStateContext,
  refresh,
  AuthDispatchContext,
} from "../contexts/auth";
import { updateUser, getUsers, purchaseFolder, UsersDispatchContext } from "../contexts/users";
import { updateDrug, DrugsDispatchContext, DrugsStateContext } from '../contexts/drugs'
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  // const history = useHistory();
  const { isLoggedIn, loaded, user } = useContext(AuthStateContext);
  // const { loaded: drugLoaded, drugs } = useContext(DrugsStateContext);
  // const currentDrugFolder = drugs.filter(drug => drug._id = user.folder);
  const userDispatch = useContext(UsersDispatchContext);
  const authDispatch = useContext(AuthDispatchContext);
  // const drugDispatch = useContext(DrugsDispatchContext);

  // useEffect(()=>{
  //   getUser(userDispatch, user._id);
  // }, []);

  // const request = () => {
  //   let hold = drugs.filter(drug=>
  //   drug._id === user.folder && drug.to_be_consulted === false && !drug.doctor_id
  //   );
  //   hold[0].to_be_consulted = true;
  //   console.log(hold);
  //   // let newuser = {
  //   //   ...user,
  //   //   toBeConsulted: !user.toBeConsulted,
  //   // };
  //   updateDrug(drugDispatch, hold[0]._id, hold[0]);
  // };

  const buyFolder = async () => {
    let drug = {
      patient_id: user._id,
      // last_checked_by: '',
      to_be_consulted: true
      // doctor_id: '',
    };
    try {
      purchaseFolder(userDispatch, user._id, drug, user);
    } catch (error) {
      console.log(`Error updating buying folder: ${error}`);
      return 1;
    }
    await refresh(authDispatch);
    // history.push('/dashboard');
    console.log(user);
  };


  if (!loaded) {
    return <Loading />;
  }

  return <Route
    {...rest}
    render={(props) => {
      if (isLoggedIn) {
        return (
          <div className="container-fluid bg-dark">
            <div className='d-flex'>
              <div className="flex-fill">
                <DashNav user={user} />
              </div>
              <div className="flex-fill overflow-auto position-absolute bg-dark top-1 end-0 start-0 ps-md-5">
                <div className="p-2 pt-3 pt-md-5 ps-md-4">
                  <h2 className="mb-3" style={{ textTransform: "capitalize", color: 'silver' }}>
                    Welcome {user.full_name}
                  </h2>
                  {
                    !user.folder ?
                      // !currentDrugFolder.to_be_consulted ? 
                      (
                        <Button variant="info" onClick={buyFolder}>
                          Request Consultation <i className='fa fa-book-text fa-lg' aria-hidden={true}></i>
                        </Button>
                      ) : (
                        <h4 className="h4">Awaiting Consultation</h4>
                      )
                    // :
                    // <Button variant="info" onClick={buyFolder}>
                    //     Purchase Folder <i className='fa fa-file-text fa-lg' aria-hidden={true}></i>
                    //   </Button>
                  }
                  <Component {...props} user={user} />
                </div>
              </div>
            </div>
            </div>
            );
      } else {
        return <Redirect to="/auth" />;
      }
    }}
  />;

};

            export default ProtectedRoute;
