import AuthProvider from './contexts/auth';
import DrugsProvider from './contexts/drugs';
import UsersProvider from './contexts/users';
import ProtectedRoute from './components/protectedRoute';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/home';
import Header from './components/header';
import AuthPage from './pages/auth';
import Dashboard from './pages/dashboard';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <UsersProvider>
        <DrugsProvider>
          <Router>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/auth" component={AuthPage} />
              <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </Router>
        </DrugsProvider>
      </UsersProvider>
    </AuthProvider>
  );
}

export default App;
