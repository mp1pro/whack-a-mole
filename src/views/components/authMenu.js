 import React from 'react';
import { withRouter, Link } from "react-router-dom";
 
const AuthMenu = withRouter(
  ({ history, auth, logout }) => auth ? (
        <div className="">
            <button
                onClick={() => {
                    logout();
                    history.push("/");
                }}  
            >
                Sign out
            </button>
            <a className="menu">    
            <img src="./assets/images/Profile Picture Denver2.png" height={50} />
            &nbsp;&nbsp;Ben<img src="/assets/icons/menu.png" height={30} />
            &nbsp;
            </a>
            <a>
            <img src="/assets/icons/chat.png" />
            <img src="/assets/icons/alarm.png" />
            </a>
        </div>
    ) : (
        <div className="sign_bar">
        
            <Link className="menu" to={{pathname: '/signup'}}>
                Sign Up
            </Link>
           
            &nbsp;&nbsp;
          
            <Link className="menu" to={{pathname: '/login', state: { from: location.pathname }}}>
                Sign In
            </Link>
        </div>
    )
                    
);

export default AuthMenu;
