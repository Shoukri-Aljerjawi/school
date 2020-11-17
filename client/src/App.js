import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Admin from './components/admin/index';
import Register from './components/register&login/register.js';
import Login from './components/register&login/login.js';
import Teacher from './components/teacher/index';
import Student from './components/students/index';
import ErrorPage from './errorPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Register}></Route>
        <Route exact path="/Register" component={Register}></Route>
        <Route exact path="/Login" component={Login}></Route>
        <PrivateRoute exact path="/Admin" roler={'Admin'} component={Admin} />
        <PrivateRoute
          exact
          path="/Teacher"
          roler={'Teacher'}
          component={Teacher}
        />
        <PrivateRoute
          exact
          path="/Student"
          roler={'Student'}
          component={Student}
        />
        <Route exact component={ErrorPage}></Route>
      </Switch>
    </Router>
  );
}

export default App;
