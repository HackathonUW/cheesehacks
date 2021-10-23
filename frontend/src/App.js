import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
  
  import './App.css';
  
  import AuthenticatedPage from './components/AuthenticatedPage/AuthenticatedPage';
  import Dashboard from './components/Dashboard/Dashboard';
  import Login from './components/Login/Login';
  
  function App() {
  
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/dashboard">
            <AuthenticatedPage>
              <Dashboard />
            </AuthenticatedPage>
          </Route>
        </Switch>
      </Router>
    );
  }
  
  export default App;
  