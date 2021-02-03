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
            <a className="menu" id="signup" href="/signup">Sign Up</a>
                <span className="split_bar"></span>
            &nbsp;
          
            <Link className="menu" to={{pathname: '/about', state: { from: location.pathname }}}>
                signin
            </Link>
        </div>
    )
                    
);

export default AuthMenu;
