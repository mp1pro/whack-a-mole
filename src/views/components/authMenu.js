import React from 'react';
import { withRouter, Link } from "react-router-dom";
 
const AuthMenu = withRouter(
  ({ history, auth, logout }) => auth ? (
        <span className="">
            <button
                onClick={() => {
                    logout();
                    history.push("/");
                }}  
            >
                Sign out
            </button>
           
        </span>
    ) : (
        <span className="sign_bar">
        
            <Link className="menu" to={{pathname: '/signup'}}>
                Sign Up
            </Link>
           
            &nbsp;&nbsp;
          
            <Link className="menu" to={{pathname: '/login', state: { from: location.pathname }}}>
                Sign In
            </Link>
        </span>
    )
);

export default AuthMenu;
