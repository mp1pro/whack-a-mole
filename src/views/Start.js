import React from 'react';
import { Link } from "react-router-dom";

function Start() {
    console.log("Did I mount start");
  return (
    <div>
        <Link className="menu" to={{pathname: 'game'}}>
            <button>Start Game</button>
        </Link>
    </div>
  );
}

export default Start; 
