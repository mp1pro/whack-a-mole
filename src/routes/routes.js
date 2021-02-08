 
import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter, Switch } from "react-router-dom";

import AuthMenu from '../views/components/authMenu';

import DisPlay from '../views/components/DisPlay';

import Login from '../views/Login';

import Signup from '../views/Signup';

import Start from '../views/Start';

import About from '../views/About';

import Game from '../views/Game';

//PrivateRoute Login
function PrivateRoute({ children, auth, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
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
        
        console.log('props_route ',this.props);
        console.log('this_route ',this);
        
        const {
            auth,
            handleSignUp,
            login,
            register,
            logout,
            getUsers,
            getUser,
            user_email,
            points,
            users
        } = this.props;
        
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
                            <AuthMenu auth={auth} logout={logout}/>
                        </div>
                    </nav>
                    {/*CLOSE NAV*/}
                    <hr />
                    <DisPlay user_email={user_email} points={points} auth={auth} users={users}/>
                    <hr />
                    <Switch>
                        <Route exact path="/">
                            <Start />
                        </Route>
                        <Route exact path="/about">
                            <About />
                        </Route>
                        <Route exact path="/signup">
                            <Signup handleSignUp={handleSignUp} register={register}/>
                        </Route>
                        <Route exact path="/login">
                            <Login login={login} auth = {auth}/>
                        </Route>
                        <PrivateRoute auth = {auth} exact path="/game">
                            <Game getUsers={getUsers} getUser={getUser}/>
                        </PrivateRoute>
                    </Switch>
                    </div>
            </Router>
        );
    };
}
export default Routes;
