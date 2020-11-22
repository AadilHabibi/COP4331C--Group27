import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import Forgot from "../pages/Forgot"
import Movies from "../pages/Movies";
function Routes() {
  return (
    <div>
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Route path="/edit" exact>
          <EditProfile />
        </Route>
        <Route path="/movies" exact>
          <Movies />
        </Route>
        <Route path="/forgot" exact >
          <Forgot/>
        </Route>
        <Redirect to="/login" />
      </Switch>
    </div>
  );
}

export default Routes;
