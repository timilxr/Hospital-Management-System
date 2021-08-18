import AuthProvider from './contexts/auth';
import DrugsProvider from './contexts/drugs';
import UsersProvider from './contexts/users';
// import ProtectedRoute from './components/protectedRoute';
import ProtectedRoute from './protected/protectedRoute';
// import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/home';
import Header from './components/header';
import AuthPage from './pages/auth';
import Dashboard from './pages/dashboard';
import UserRecords from './pages/users';
import EditUser from './pages/editUser';
import PrescribeDrugs from './pages/prescribeDrug';
import DrugRecords from './pages/drugs';
import Checking from './pages/checking';
import AddUser from './pages/addUser';
import RecordVitals from './pages/recordVitals';
// import './App.css';

function App() {
  return (
    <div className='container-fluid p-0'>
      <AuthProvider>
        <UsersProvider>
          <DrugsProvider>
            <Router>
              <Header />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/auth" component={AuthPage} />
                <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                <ProtectedRoute exact path="/users/:category" component={UserRecords} />
                <ProtectedRoute exact path="/users" component={UserRecords} />
                <ProtectedRoute exact path="/editUser/:id" component={EditUser} />
                <ProtectedRoute exact path="/prescriptions/:drugCategory" component={DrugRecords} />
                <ProtectedRoute exact path="/prescriptions" component={DrugRecords} />
                <ProtectedRoute exact path="/check/:drugId" component={Checking} />
                <ProtectedRoute exact path="/consulting/:fileId" component={PrescribeDrugs} />
                <ProtectedRoute exact path="/adduser" component={AddUser} />
                <ProtectedRoute exact path="/recordvitals/:drugId" component={RecordVitals} />
                {/* <ProtectedRoute exact path="/editUser/:id" component={EditUser} /> */}
              </Switch>
            </Router>
          </DrugsProvider>
        </UsersProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
