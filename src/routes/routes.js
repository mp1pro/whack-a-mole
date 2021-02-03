 
import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter, Switch } from "react-router-dom";

import AuthMenu from '../views/components/authMenu';

import Login from '../views/Login';

import Start from '../views/Start';

import About from '../views/About';

import Game from '../views/Game';

//PrivateRoute Login
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        props.auth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}
//close PrivateRoute Login

class Routes extends React.Component {
    render() {
        console.log("Did I mount routes3");
        return (
            <Router>
                    <div>
                    
                    {/*NAV*/}
                    <nav className="navbar navbar-light bg-white fixed-top">
                        <div className="container">
                            <div className="brand">
                                {/*<Link className="navbar-brand" to="/">
                                    <img src="./assets/images/wandlogo2.png" height="34"/>
                                </Link>*/}
                            </div> 
                            <AuthMenu auth={this.props.auth} logout={this.props.logout}/>
                        </div>
                    </nav>
                    {/*CLOSE NAV*/}
                    <hr />
                    <Switch>
                        <Route exact path="/" component={Start}/>
                        <Route path="/about" component={About}/>
                        {/*
                        <Route exact path="/">
                            <Start />
                        </Route>
                        <Route exact path="/about">
                            <About />
                        </Route>
                        <Route path="/about" component={About}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/game" component={Game}/>
                        */}

                    </Switch>
                    </div>
            </Router>

        );
    };
}
export default Routes;
