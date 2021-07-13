import React from 'react';
import { Link } from "react-router-dom";

function End() {
    return (
        <div>
            <Link className="menu" to={{pathname: '/game'}}>
                <button>PLAY AGAIN</button>
            </Link>
            <h2>the game ended</h2>
        </div>
    );
}

export default End;
