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
                <ProtectedRoute exact path="/users" component={UserRecords} />
                <ProtectedRoute exact path="/editUser/:id" component={EditUser} />
              </Switch>
            </Router>
          </DrugsProvider>
        </UsersProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
