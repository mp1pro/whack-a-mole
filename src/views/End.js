import React from 'react';
import { Link } from "react-router-dom";

class End extends React.Component {
    constructor(props){
        super(props);
    }
    
    componentDidMount(){
        this.props.resetGame();
    }
    
    render() {
        console.log('tick-end',this.props.ticker);
        return (
            <div>
                <Link className="menu" to={{pathname: '/game'}}>
                    <button>PLAY AGAIN</button>
                </Link>
                <h2>the game ended</h2>
            </div>
        );
    }
}

export default End;
