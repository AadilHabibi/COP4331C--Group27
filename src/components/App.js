import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';
import Movies from './Movies';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      user_login: false,
    };
  }

  componentDidMount() {
    // this.updateLoginState();
  }

  updateLoginState = () => {
    //  call Api and change this to true
    console.log("LogedIn")
    this.setState({ user_login: true });
  }

  logout = () => {
    window.location.href = "/";
    this.setState({ user_login: false });
  }

  render() {
    var { user_login } = this.state;
    return (
      <Router>
        {user_login ? (
          <Switch>
            <Route exact path="/profile" render={
                props => <Profile {...props} logout={this.logout} />
              } />
            <Route path="/" render={ 
            props => <Movies {...props} logout={this.logout}/>
           }/>
          </Switch>
        ) : (
            <Switch>
              <Route exact path="/signup" render={
                props => <Signup {...props} loginUpdate={this.updateLoginState} />
              } />
              <Route path="/" render={
                props => <Login {...props} loginUpdate={this.updateLoginState} />
              } />
            </Switch>
          )}
      </Router>
    )
  }
}
export default App;